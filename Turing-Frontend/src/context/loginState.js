"use client";

// use context api to keep record of user login and logout with useState
import React, { useState,useContext } from 'react';


// create context for user login and logout
const Usercontext = React.createContext();


export const UserProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const login = (user) => {
        setUser(user);
        console.log("Hello ",user)
        setLoading(false);
    }

    const logout = () => {
        setUser(null);
        setLoading(false);
    }

    return (
        <Usercontext.Provider value={{user,login,logout,loading}}>
            {children}
        </Usercontext.Provider>
    )
}

export const useUser = () => useContext(Usercontext);