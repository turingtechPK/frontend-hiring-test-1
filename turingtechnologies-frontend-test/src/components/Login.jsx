import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import CallsContext from '../context/CallsContext'
import { useContext,useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
    const [username,setusername] = useState ('')
    const [password,setpassword] = useState ('')
    const [redirect,setredirect] = useState (false)
    const {addUserAuthentication} = useContext(CallsContext)

    const handleUsernameChange = (e) => {
        setusername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setpassword(e.target.value)
    }

    const authenticateUser = () => {
        if (username==='' || password===''){
            alert('Please enter username and password!')
            setredirect(false)
        }
        else{
            const newUser = {
                username,
                password,
              }
              addUserAuthentication(newUser)
              setredirect(true)
             // alert('Authenticated user')
        }
         setusername('')
         setpassword('')
    }
  return (
    <div className='bg-login py-5'>
    <div className='container py-5'>
        <div className='row align-items-center justify-content-center py-5'>
            <div className='col-6 p-5 bg-white'>
            <form>
                <div className="mb-3">
                    <label className="form-label fw-semibold">User Name</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder='User Name' onChange={handleUsernameChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' onChange={handlePasswordChange} />
                </div>
                    <Link to="/callspage">
                     <button type="submit" className="btn btn-primary" onClick={authenticateUser}>Submit</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login