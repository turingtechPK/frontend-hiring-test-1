import axios from "../utils/api";
import Cookies from "js-cookie";
import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext({
    login: (credentials: any) => { },
    logout: () => { },
    setIsLoggedIn: (value: boolean) => { },
    isLoggedIn: false,
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (Cookies.get("accessToken")) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (credentials: any) => {
        return axios.post("/auth/login", credentials);
    };

    function logout() {
        setIsLoggedIn(false);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
    }

    const value = {
        login,
        logout,
        setIsLoggedIn,
        isLoggedIn,
    };

    return (<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>)
}
