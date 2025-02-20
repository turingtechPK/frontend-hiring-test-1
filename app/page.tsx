"use client";
import { useState, useEffect } from "react";
import LoginForm from "./Components/loginform";
import CallsList from "./Components/CallsList";
import Pusher from "pusher-js";
import Header from "./Components/Header";
import { api } from "@/app/utils/apiService";

interface CallUpdateData {
  id: string;
  status: string;
}

export default function Home() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = () => {
      const isLoggedIn = api.isLoggedIn();
      setUser(isLoggedIn);
      setLoading(false);
    };

    checkLogin();

    // Listen for token changes (logout from another tab)
    const handleStorageChange = () => {
      setUser(api.isLoggedIn());
    };
    window.addEventListener("storage", handleStorageChange);

    // Initialize Pusher for real-time updates
    const pusher = new Pusher("d44e3d910d38a928e0be", {
      cluster: "eu",
      authEndpoint: "https://frontend-test-api.aircall.dev/pusher/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      },
    });

    const channel = pusher.subscribe("private-aircall");
    channel.bind("update-call", function (data: CallUpdateData) {
      console.log("Call updated:", data);
    });

    return () => {
      pusher.unsubscribe("private-aircall");
      pusher.disconnect();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <>
          <Header />
          <button
            onClick={() => {
              api.logout();
              setUser(false);
            }}
            className="absolute top-2 right-4 bg-[var(--text-secondary)] text-white px-4 py-2 "
          >
            Logout
          </button>
          <CallsList />
        </>
      ) : (
        <>
          <Header />
          <LoginForm onLogin={() => setUser(true)} />
        </>
      )}
    </div>
  );
}