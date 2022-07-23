import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import CallsListing from "./CallsListing";

const mainURL = process.env.REACT_APP_API_URL;
// let accessToken = "";

const MainPage = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tokenId, setTokenId] = useState("");
  const intervalRef = useRef();

  useEffect(() => {
    fetchCalls();
    // console.log("Token Generated!");
    // const interval = setInterval(() => getToken(), 1000 * 60 * 9);
    // intervalRef.current = interval;
    // return () => clearInterval(interval);
  }, []);

  //   const intervalFunc = () => {
  //     const interval = setInterval(() => getToken(), 1000 * 60 * 9);
  //     intervalRef.current = interval;
  //     return () => clearInterval(interval);
  //   };

  const getToken = useCallback(() => {
    if (localStorage.getItem("token") != null) {
      refreshToken();
    }
  }, []);

  const refreshToken = async () => {
    try {
      const token = localStorage.getItem("token");
      const config_req = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        mainURL + `auth/refresh-token`,
        config_req
      );
      console.log("New Token", response.data.access_token);
      if (response.status === 200) {
        // Set new token in local storage.
        localStorage.setItem("token", response.data.access_token);
      } else {
        // Remove the previous token
        localStorage.removeItem("token");
      }
      return response;
    } catch (e) {
      const err = e;
      if (err.response) {
        console.log(err.response.status);
      }
      console.log(e);
    }
  };

  const fetchCalls = () => {
    generateToken().then((res) => {
      setCalls(res.data);
      //   accessToken = res.data.access_token;
      console.log("Token Generated!");
      setLoading(true);
    });
  };

  const generateToken = async () => {
    try {
      const user = {
        username: "hirakhan",
        password: "hira.123",
      };
      const response = await axios.post(mainURL + `auth/login`, user);
      //   accessToken = response.data.access_token;
      localStorage.setItem("token", response.data.access_token);
      //   console.log("AAAAA---", accessToken);
      //   console.log("Token from call", response.data);
      return response;
    } catch (e) {
      const err = e;
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
      console.log(e);
    }
  };

  return (
    <div>
      <CallsListing />
    </div>
  );
};

export default MainPage;
