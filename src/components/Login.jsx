import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TTLogo from ".././assets/TTLogo.png";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  localStorage.setItem("access_token", "your_actual_token_here");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://frontend-test-api.aircall.dev/auth/login",
        {
          username,
          password,
        }
      );

      const { access_token } = response.data;
      console.log("Access Token:", access_token);

      if (access_token) {
        localStorage.setItem("access_token", access_token);
        onLogin(access_token);
        navigate("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <>
      <header>
        <div className=" font-avenir overflow-hidden flex justify-between m-2 p-4 border  h-[10vh]">
          <div>
            <img src={TTLogo} alt="TT Logo" width={300} height={200} />
          </div>
          <div></div>
        </div>
      </header>
      <div className="font-avenir overflow-hidden flex items-center justify-center h-[85vh] bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
