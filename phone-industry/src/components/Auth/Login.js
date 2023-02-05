import { React, useState } from "react";
import axios from "axios"




function Login(props) {

    const [userName, setUserName] = useState(''); 
    const [password, setPassword] = useState('');

  
 

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = { username: userName, password: password };
    
        try {
          const response = await axios.post("https://frontend-test-api.aircall.io/auth/login", data);
          props.setaccesskey(response.data.access_token)
        
    
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center " style={{height: "100vh"}}>
                <div className="card px-4 py-4">
                    <form>
                        <div class="form-group">
                            <label for="username">User Name</label>
                            <input type="userName" class="form-control" id="username" value={userName} aria-describedby="emailHelp" placeholder="Enter email"
                            onChange={(e)=>{setUserName(e.target.value)}}
                             />
                        
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" value={password} placeholder="Password"
                             onChange={(e)=>{setPassword(e.target.value)}}
                           />
                        </div>
                    
                        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;