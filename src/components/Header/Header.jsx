import Button from "../Button"
import { Logo } from "@assets"
import { HeaderWrapper } from "./elements"
import { useAuth } from "@contexts/authContext"
const Header = ()=>{
  const {userData,logout} = useAuth()
  const {loggedIn} = userData

  return(
    <>
    <HeaderWrapper>
    <img src={Logo} className="logo"/>
    {loggedIn?<Button text={"Log Out"} styles={{background:"#4f46f8"}} clickHandler={logout}/>:""}
    </HeaderWrapper>
    </>
  )

}
export default Header
