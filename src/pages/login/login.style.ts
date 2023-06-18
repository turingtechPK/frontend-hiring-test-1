import styled from "styled-components";

export const LoginStyled = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  form {
    width: 400px;
    background-color: #FFFFFF;
    padding: 4em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;

    .input-fields{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 2em;
        width: 100%;
    }
  }
`;