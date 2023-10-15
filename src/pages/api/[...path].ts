import httpProxy from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'
import jwt_decode from 'jwt-decode'
import moment from 'moment'
import { access } from 'fs'

const isValidToken = (token: string) => {
  const decoded: any = jwt_decode(token)
  console.log(moment().isBefore(decoded.exp * 1000))
  if (moment().isBefore(decoded.exp * 1000)) {
    return true
  }
  return false
}

// Get the actual API_URL as an environment variable. For real
// applications, you might want to get it from 'next/config' instead.
const API_URL = process.env.API_URL

const proxy = httpProxy.createProxyServer()

// You can export a config variable from any API route in Next.js.
// We'll use this to disable the bodyParser, otherwise Next.js
// would read and parse the entire request body before we
// can forward the request to the API. By skipping the bodyParser,
// we can just stream all requests through to the actual API.
export const config = {
  api: {
    bodyParser: false,
  },
}

const ApiHandler = (req: any, res: any) => {
  // Return a Promise to let Next.js know when we're done
  // processing the request:
  return new Promise<void>((resolve, reject) => {
    // In case the current API request is for logging in,
    // we'll need to intercept the API response.
    // More on that in a bit.
    console.log(req.url)
    const pathname = url.parse(req.url).pathname
    const isLogin = pathname === '/api/auth/login'
    const isRefresh = pathname === '/api/auth/refresh-token'

    // Get the `auth-token` cookie:
    const cookies = new Cookies(req, res)
    let access_token = cookies.get('access_token')

    // Rewrite the URL: strip out the leading '/api'.
    // For example, '/api/login' would become '/login'.
    // ️You might want to adjust this depending
    // on the base path of your API.
    req.url = req.url.replace(/^\/api/, '')

    // Don't forward cookies to the API:
    req.headers.cookie = ''

    // Set auth-token header from cookie:
    if (access_token) {
      req.headers['Authorization'] = `Bearer ${access_token}`
    }

    // In case the request is for login, we need to
    // intercept the API's response. It contains the
    // auth token that we want to strip out and set
    // as an HTTP-only cookie.
    if (isLogin || isRefresh) {
      proxy.once('proxyRes', interceptLoginResponse)
    }

    // Don't forget to handle errors:
    proxy.once('error', (error) => {
      console.log(error)
      reject(error)
    })

    // Forward the request to the API
    proxy.web(req, res, {
      target: API_URL,

      // Don't autoRewrite because we manually rewrite
      // the URL in the route handler.
      autoRewrite: false,
      changeOrigin: true,

      // In case we're dealing with a login request,
      // we need to tell http-proxy that we'll handle
      // the client-response ourselves (since we don't
      // want to pass along the auth token).
      selfHandleResponse: isLogin,
    })

    function interceptLoginResponse(proxyRes: any, req: any, res: any) {
      // Read the API's response body from
      // the stream:
      let apiResponseBody = ''
      proxyRes.on('data', (chunk: any) => {
        apiResponseBody += chunk
      })

      // Once we've read the entire API
      // response body, we're ready to
      // handle it:
      proxyRes.on('end', () => {
        try {
          // Extract the authToken from API's response:
          const { access_token } = JSON.parse(apiResponseBody)

          // Set the authToken as an HTTP-only cookie.
          // We'll also set the SameSite attribute to
          // 'lax' for some additional CSRF protection.
          const cookies = new Cookies(req, res)
          cookies.set('access_token', access_token, {
            httpOnly: true,
            sameSite: 'lax',
          })

          // Our response to the client won't contain
          // the actual authToken. This way the auth token
          // never gets exposed to the client.
          res.status(200).json({ loggedIn: true })
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    }
  })
}

export default ApiHandler
