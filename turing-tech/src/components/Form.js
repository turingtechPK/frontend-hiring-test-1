import '../styles/Form.css'; 

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from'../TT Logo.png';


function Form() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [refresh, setRefresh] = useState("");
    const baseUrl = "https://frontend-test-api.aircall.io";

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("button pressed hehe");
        console.log(user, pwd); 
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pwd })
        };
        fetch(baseUrl + "/auth/login", requestOptions)
            .then(response => response.json())
            .then(data => (
                // setToken(data.access_token),
                // setUserId(data.user.id),
                // setRefresh(data.refresh_token),
                localStorage.setItem('token', data.access_token),
                localStorage.setItem('id', data.user.id),
                localStorage.setItem('refresh', data.refresh_token),
                navigate("/calls")
            ))
            .catch(error => {
                console.error('There was an error!', error);
                alert("Oopsies. Something broke.")
            });
        
    }

    return(
        <>
            <nav className="navbar"><img src={logo} className="navbar-brand"></img></nav>
            <form className="login-div-holder d-flex justify-content-center align-items-center"
                onSubmit={handleSubmit}
            >
                <div className="login-div ">
                <label><span className="important">*</span> User Name</label>
                <input type="text" defaultValue={user} onChange={e => {setUser(e.target.value)}} placeholder="Email" className="form-control"></input>
                <label><span className="important">*</span> Password</label>
                <input type="password" defaultValue={pwd} onChange={e => {setPwd(e.target.value)}} placeholder="Password" className="form-control"></input>
                
                <input type="submit" className="submit" value="Log In"></input>
                </div>
            </form>
        </>
        
    );
}

export default Form;