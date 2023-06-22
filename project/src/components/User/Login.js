import React, { useState } from "react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import AuthUser from "./AuthUser";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {http, setToken} = AuthUser();

    const handleOnSubmit = (event) => {
        event.preventDefault();
        
        http.post('/auth/login', {
            username: username,
            password: password
          })
          .then((response) => {
            console.log(response.data);
              // Handle data
              setToken(response.data.access_token, response.data.refresh_token);
          })
          .catch((error) => {
            console.log(error);
          })
    }

  return (
    <div className="d-flex justify-content-center align-items-center bg-light vh-100">
        <div className="bg-white p-3 rounded w-25">
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="username"> Username <AiOutlineUser /></label>
                    <input
                        id="username"
                        type="input" 
                        placeholder="Enter Username" 
                        className="form-control rounded-0"
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password <AiOutlineLock /> </label>
                    <input 
                        id="password"
                        type="password" 
                        placeholder="Enter Password" 
                        className="form-control rounded-0"
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="btn- btn-primary">Log in</button>
            </form>
        </div>
    </div>
  );
};

export default Login;
