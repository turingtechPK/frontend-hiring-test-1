import styled from "styled-components";

export const NavbarStyled = styled.div`
box-sizing: border-box;
width: 100%;
height: 80px;
border: 1px solid #000000;
background-color: #FFFFFF;
    .container{
        padding: 1em;
    }
    .navbar-contents{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .button{
            background-color: blue;
            color: #FFFFFF;
        }
    }
`;