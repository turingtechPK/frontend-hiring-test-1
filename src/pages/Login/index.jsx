import {  Input } from "antd"
import { LoginBox, LoginPageWrapper } from "./elements"
import Button from "@components/Button"
import { UserOutlined,LockOutlined } from '@ant-design/icons'
import axiosInstance from "@src/services/axiosService"
import { useState } from "react"
import { useAuth } from "@contexts/authContext"
import { useNavigate } from "react-router-dom"
const Login = ()=>{
  const [formData,setFormData] = useState({
    username:"",
    password:"",
  })
  const {login} = useAuth()
  const navigate = useNavigate()
  const loginHandler =async ()=>{
    try{
      const resp = await axiosInstance.post("/auth/login",{...formData})
      const data = resp.data
      login(data)
      navigate("/call-list")
    }
    catch(e){
      console.log(e)
    }
    finally{
      setFormData({
        username:"",
        password:"",
      })
    }
  }
  const handleUsernameChange= (e)=>{
    const newEmailVal = e.target.value
    setFormData({
      ...formData,
      username:newEmailVal,
    })

  }
  const handlePasswordChange = (e)=>{
    const newPasswordVal = e.target.value
    setFormData({
      ...formData,
      password:newPasswordVal,
    })
  }

  return(
    <>
    <LoginPageWrapper>
      <LoginBox>
        <div className="form-element-container">
          <label htmlFor="email"> <span style={{color:'red'}}>* </span> User Name </label>
          <Input id="email" size="large" placeholder="Email" prefix={<UserOutlined/>} onChange={e=>handleUsernameChange(e)}/>
        </div>

        <div className="form-element-container">
          <label htmlFor="password"> <span style={{color:'red'}}>* </span> Password</label>
          <Input type="password" size="large" id="password" placeholder="Password" prefix={<LockOutlined/>} onChange={e=>handlePasswordChange(e)}/>
        </div>
        <Button text={"Login"} styles={{width:"1rem",background:"#1690ff",borderRadius:"0"}} clickHandler={loginHandler}/>
      </LoginBox>
    </LoginPageWrapper>
    </>
  )
}
export default Login
