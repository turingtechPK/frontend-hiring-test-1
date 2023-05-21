'use client'
import React, {useEffect,useState} from 'react'
import { useUser } from '@/context/loginState'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
const Form = () => {
    const router = useRouter();
    const { user, login, logout, loading } = useUser();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const manageSign = async () => {
        try {
            if(username == '' || password == '')
            {
                setError('Please fill all the fields')
                return
            }   
            setError('');
            const response = await axios.post('https://frontend-test-api.aircall.io/auth/login', {
                username: username,
                password: password,
            });

            const { access_token, refresh_token, user } = response.data;

            // Save the tokens and user information in cookies
            Cookies.set('access_token', access_token);
            Cookies.set('refresh_token', refresh_token);
            Cookies.set('user', JSON.stringify(user));
            console.log("USER USR: ",user)

            login(user);

            // Redirect the user to the home page   
            router.push('/call')

        } catch (error) {
            // Handle login error here
            console.error('Login failed:', error);
        }
    }



    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }



    return (
        <div className='flex bg-white  h-20 items-center p-4 justify-center h-screen'>
            <div className='border w-[50%] h-[35%] rounded-lg p-10' >
              
            <div>
                    <div className='my-5'><span className='text-red-600'>*</span>Username</div>
                    <div>
                        <input className='border w-full h-14' type="text" required onChange={handleUsername}/>
                    </div>
                    
                </div>

                <div className='mt-10'>
                    <div className='my-5'><span className='text-red-600'>*</span>Password</div>
                    <div>
                        <input className='border w-full h-14' type="password" required onChange={handlePassword} />
                    </div>
                    
                </div>

            <div className='my-5 bg-blue-600 w-24 rounded text-white flex items-center justify-center py-3 px-6' onClick={manageSign}>Login</div>


                
            

            {error.length > 0? <div className='text-red-600'>{error}</div>: null}
            </div>

        </div>
    )
}

export default Form