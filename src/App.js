import React, {useEffect} from 'react';
import ENDPOINTS from './api/endpoints';
import AuthenticationService from './services/Authentication.service';
import Router from "./router";
import {postRequest} from './api';
import {usePromiseTracker, trackPromise} from "react-promise-tracker";
import {useDispatch} from 'react-redux'
import {setToken, reset} from './redux/slicer';
import {LoadingPage} from "./global/pages";
import './App.scss'

function App() {

    const {promiseInProgress} = usePromiseTracker({area: 'app'})
    const dispatch = useDispatch()

    useEffect(() => {
        if (AuthenticationService.getToken()) getCurrentUser();
        // eslint-disable-next-line
    }, []);

    useEffect(()=> {
        const interval = setInterval(() => {
            getCurrentUser();
        }, 540000); // Runs every 9 minutes to refresh the token

        return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getCurrentUser() {
        async function apiCall() {
            try {
                const {access_token} = await postRequest(ENDPOINTS.refreshToken);
                if (access_token) {
                    AuthenticationService.updateToken(access_token);
                    dispatch(setToken(access_token))
                } else {
                    dispatch(reset())
                    AuthenticationService.logout();
                }
            } catch (error) {
                console.error(error);
            }
        }
        trackPromise(apiCall(), 'app')
    }

    if (promiseInProgress) return <LoadingPage/>;
    return <Router/>
}

export default App;
