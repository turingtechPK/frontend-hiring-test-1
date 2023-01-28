import {useState} from "react";
import {URLs} from "@/config/endPoints";
import axios from "axios";
import {useRouter} from "next/router";
import Header from "@/components/Header";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        setError('');
        if (email === '' && password === '') {
            setError('Please Enter Email and Password');
            return;
        }
        await axios.post(URLs.login, {
            username: email,
            password
        })
            .then(res => {
                if(res.status === 201) {
                    const { access_token, refresh_token } = res.data;
                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("refresh_token", refresh_token);
                    router.push('/');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            <Header loginPage={true}/>
            <div className="login-main-wrapper">
                <div className="login-container">
                    <form onSubmit={loginUser}>
                        <label><span>* </span><span> Email</span></label>
                        <input type="email" name="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <label><span>* </span><span> Password</span></label>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <div className="form-errors">{error}</div>
                        <button className="blueBtn" type="submit">Log in</button>
                    </form>
                </div>
            </div>

        </>
    )
}
