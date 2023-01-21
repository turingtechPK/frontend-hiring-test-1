import { createContext, useState, useEffect } from "react"

const CallsContext = createContext()

export const CallsProvider = ({children}) => {
    let api_token = ""
    const [accessToken,setAccessToken] = useState('')
    const [refreshToken,setRefreshToken] = useState('')
    const [calls,setcalls] = useState({})
   const addUserAuthentication = async (userlogin) => {
    const response = await fetch('https://frontend-test-api.aircall.io/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
       body: JSON.stringify(userlogin)
    })
    const data = await response.json()
    console.log(data.access_token)
    api_token = data.access_token
    setAccessToken(data.access_token)
    setRefreshToken(data.refresh_token)
    setTimeout(() => {
        setAccessToken(refreshToken)
      }, 500000);
   }

   const fetchCalls = async () => {
    const response = await fetch('https://frontend-test-api.aircall.io/calls',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken,
        },
    })
    const data = await response.json()
    console.log(data)
    setcalls(data)
   }
   return <CallsContext.Provider value={{
    calls,
    accessToken,
    addUserAuthentication,
    fetchCalls,
}}>
   {children}
</CallsContext.Provider>
}

export default CallsContext