import axios from "axios";
import AuthenticationService from '../services/Authentication.service'
import ENDPOINT from "./endpoints";

const SERVER_URL = 'https://frontend-test-api.aircall.io';
const TIMEOUT = 30000; // 30 seconds

const getRequest = async (endpoint) => {
    try {
        const data = await axios.get(`${SERVER_URL}${endpoint}`, {
            headers: {
                Authorization: AuthenticationService.getToken(),
            },
            timeout: TIMEOUT,
        });
        return data.data;
    } catch (error) {
        return throwERROR(error);
    }
};

const postRequest = async (endpoint, body) => {
    try {
        const data = await axios.post(`${SERVER_URL}${endpoint}`, body, {
            headers: {
                ...(endpoint !== ENDPOINT.login && {
                    Authorization: AuthenticationService.getToken(),
                }),
            },
            timeout: TIMEOUT,
        });
        return data.data;
    } catch (error) {
        return throwERROR(error);
    }
};

const putRequest = async (endpoint, body) => {
    try {
        const data = await axios.put(`${SERVER_URL}${endpoint}`, body, {
            headers: {
                Authorization: AuthenticationService.getToken(),
            },
            timeout: TIMEOUT,
        });
        return data.data;
    } catch (error) {
        return throwERROR(error);
    }
};

const throwERROR = (error) => {
    if (error.response?.status === 400 && error.response.data.success === 0) {
        // notify(error.response.data.message, "error");
        return error.response.data;
    } else if (error.response?.status === 401) {
        AuthenticationService.logout();
        window.location.href = "/login";
    } else if (typeof error.response === "undefined") {
        // notify("Network error", "error");
    } else {
        // notify("Something went wrong", "error");
    }
    console.error(error);
};

export { postRequest, getRequest, putRequest };
