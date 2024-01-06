import { styled } from "styled-components";

export const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3eeee;
  height: 100%;
`;
export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 3rem;
  padding: 3rem 2rem;
  background-color: white;
  .form-element-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
