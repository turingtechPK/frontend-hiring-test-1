"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { REFRESH_TOKEN_MUTATION } from "@/lib/queries";
import Cookies from "js-cookie";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const [refreshToken] = useMutation(REFRESH_TOKEN_MUTATION);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token && !Cookies.get("access_token")) {
      Cookies.set("access_token", data.login.access_token, {
        path: "/",
        sameSite: "Lax",
        secure: false, // set to true for production
      });
    }

    if (!token) {
      router.push("/login");
      return;
    }

    const refreshTokenInterval = setInterval(async () => {
      try {
        const { data } = await refreshToken();
        localStorage.setItem("access_token", data.refreshToken.access_token);
        Cookies.set("access_token", data.refreshToken.access_token, {
          path: "/",
          sameSite: "Lax",
          secure: false, // set to true for production
        });
      } catch (error) {
        console.error("Token refresh failed:", error);
        localStorage.removeItem("access_token");
        Cookies.remove("access_token");
        router.push("/login");
      }
    }, 9 * 60 * 1000); // Refresh every 9 minutes

    return () => clearInterval(refreshTokenInterval);
  }, [router, refreshToken]);

  return children;
}
