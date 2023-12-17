"use client";

import { useSession } from "next-auth/react";
import axios from "../axios";

export const useRefreshToken = () => {
    const { data: session } = useSession();
    const refreshTime = 9 * 60 * 1000;

    const refreshAccessToken = async () => {
        try {
            if (!session?.user.refresh_token) {
                console.error("No refresh token available");
                return;
            }

            const response = await axios.post("/auth/refresh-token", {
                refresh: session?.user.refresh_token,
            });

            if (session) {
                session.user.access_token = response.data.access_token;
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
        }
    };

    const intervalId = setInterval(refreshAccessToken, refreshTime);
    return () => clearInterval(intervalId);
};


