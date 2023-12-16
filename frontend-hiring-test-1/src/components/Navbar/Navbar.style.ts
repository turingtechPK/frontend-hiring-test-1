import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: white; /* Set your desired background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a box shadow */
  padding: 20px;
`;

export const Logo = styled.img`
  height: 35px;
`;
export const LogoutButton = styled.button`
  width: 60px;
  height: 40px;
  color: white;
  background: #4f46f8;
`;
