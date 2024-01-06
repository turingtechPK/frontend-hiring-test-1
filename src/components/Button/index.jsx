import { ButtonWrapper } from "./elements"

const Button  =({text,styles,clickHandler})=>{
  return(
    <>
    <ButtonWrapper style={styles} onClick={clickHandler}>
      {text}
    </ButtonWrapper>
    </>
  )
}
export default Button
