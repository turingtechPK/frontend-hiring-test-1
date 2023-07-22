import { TextField, styled } from "@mui/material"

export const StyledTextField = styled(TextField)(
    () => ({
      '.MuiInputBase-root, .MuiInputLabel-root': {
        height: '40px',
        marginBottom: '30px',
        width: '35vw !important',
      },
    }),
  )

export const styles = {
    loginMain: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4eeee',
        width: '100%',
        height: '90vh',
    },
    loginForm: {
        backgroundColor: 'white',
        padding: '3vw 30px',
        width: '40vw',
    },
    required: {
        color: 'red',
    },
    inputIcon: {
        width:'30px',
        height: '30px',
    },
    loginBtn: {
      color: 'white',
      backgroundColor: '#1b90fe',
    }
}