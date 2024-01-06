import { createContext,useContext,useState } from "react";
const AuthContext = createContext()

export const AuthProvider = ({children})=>{
  const user = JSON.parse(localStorage.getItem("user"))
  const loggedIn = user?true:false
  const [userData,setUserData] = useState({
    loggedIn:loggedIn,
    user:user,
  })

  const login =(data)=>{
    localStorage.setItem("accessToken",data.access_token)
    localStorage.setItem("refreshToken",data.refresh_token)
    localStorage.setItem("user",JSON.stringify(data.user))
    setUserData({
      loggedIn:true,
      user:data.user,
    })
  }
  const logout = ()=>{
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    setUserData({
      loggedIn:false,
      user:null,
    })
  }
  const refreshToken = (data)=>{
    localStorage.setItem("accessToken",data.access_token)
  }

  return(
    <AuthContext.Provider value={{userData,login,logout,refreshToken}}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
  return useContext(AuthContext);
};
