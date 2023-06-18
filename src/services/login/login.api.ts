import { GET_JWT_TOKEN } from "../apiUrls";
import { LoginApiBodyType } from "../../pages/login/login.types";


export const LoginApi = async(payload: LoginApiBodyType) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    username: payload.username,
    password: payload.password
    });

    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
    };
    return await fetch(GET_JWT_TOKEN,requestOptions).then(response=>response.json()).catch(error=>error)};
