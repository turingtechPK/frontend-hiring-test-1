'use client'
import React, {useEffect} from 'react'
import { useUser } from '@/context/loginState'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import logo from './logo.png';
const Nav = () => {
    const { user, login, logout, loading } = useUser();
    const router = useRouter();




    useEffect(() => {
        const checkTokenExpiration = async () => {
            const accessToken = Cookies.get('access_token');
            const refreshToken = Cookies.get('refresh_token');

            // Check if the access token is expired or not present
            if (!accessToken || isTokenExpired(accessToken)) {
                // Check if a refresh token is available
                if (refreshToken) {
                    try {
                        const response = await axios.post(
                            'https://frontend-test-api.aircall.io/auth/refresh-token',
                            {},
                            {
                              headers: {
                                Authorization: `Bearer ${accessToken}`,
                              },
                            }
                          );
                      

                        const { access_token } = response;

                        // Update the access token in the cookies
                        Cookies.set('access_token', access_token);
                        Cookies.set('refresh_token', refreshToken);
                    } catch (error) {
                        console.error('Token refresh failed:', error);
                        // Handle token refresh error here
                    }
                } else {
                    // Redirect the user to the login page or show an appropriate message
                    console.log('Refresh token not found');
                }
            }
            else
            {
                console.log("Token is not expired")
                // get the token
                const token = Cookies.get('access_token');
                // decode the token
                // get the username from token
                const decodedToken = decodeToken(token);
                // get the current time
                const currentTime = Math.floor(Date.now() / 1000);
                // get the user from cookies
                const user = Cookies.get('user');

                login(user);
            }
        };

        checkTokenExpiration();

        // Clean up the timer when the component unmounts
        return () => clearTimeout(window.tokenRefreshTimer);
    }, []);

    const isTokenExpired = (token) => {
        const decodedToken = decodeToken(token);
        const currentTime = Math.floor(Date.now() / 1000);

        return decodedToken.exp < currentTime;
    };

    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Token decoding failed:', error);
            // Handle token decoding error here
            return null;
        }
    };

    const handleLogout = () => {
        logout();
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('user');
        router.push('/auth')
    };
    return (
        <div className='flex bg-white  h-20 items-center p-4 shadow-md justify-between'>
            <div className='text-2xl font-semibold'> Turing Technologies </div>
            <div className='bg-blue-700 p-5 h-6 border cursor-pointer flex items-center justify-center text-white text-md px-6 font-medium' onClick={handleLogout} >{user?"Log Out":" "}</div>
        </div>
    )
}

export default Nav
