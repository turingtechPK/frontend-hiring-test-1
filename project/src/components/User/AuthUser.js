import axios from 'axios';
import { API_BASE_URL } from "../../config";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser() {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    const saveToken = (accessToken, refreshToken ) => {
        sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
        sessionStorage.setItem('refreshToken', JSON.stringify(refreshToken));

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        navigate('/callList');

    };

    const getAccessToken = () => {
        const tokenString = sessionStorage.getItem('accessToken');
        return JSON.parse(tokenString);
    };

    const getRefreshToken = () => {
        const tokenString = sessionStorage.getItem('refreshToken');
        return JSON.parse(tokenString);
    };

    const http = axios.create({
        baseURL:API_BASE_URL,
        headers:{
            "Content-Type": "application/json"
        }
    });
    return {
        http,
        accessToken,
        refreshToken,
        setToken: saveToken,
        getAccessToken,
        getRefreshToken
    }
}
