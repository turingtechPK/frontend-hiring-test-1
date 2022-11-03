import type { NextApiRequest, NextApiResponse } from "next";
import URLs from "../../config.json"
import axios,{Axios, AxiosResponse} from 'axios'

type Data = {
  access_token:string,
  refresh_token:string
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const requestData = req.body
    axios
    .post(URLs.baseURL + URLs.loginURL, { username:requestData.username, password:requestData.password })
    .then((resData:AxiosResponse) => {
        const data:Data = resData.data
        res.setHeader('Set-Cookie', [`access_token=${data.access_token}`])
        res.status(200).json({access_token:data.access_token,refresh_token:data.refresh_token})
       
    })
}