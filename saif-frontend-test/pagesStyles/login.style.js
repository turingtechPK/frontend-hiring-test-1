import { TextField, styled } from "@mui/material"

export const StyledTextField = styled(TextField)(
    () => ({
       '.MuiTextField-root': {
            width: '100% !important',
        },
      '.MuiInputBase-root, .MuiInputLabel-root': {
        height: '40px',
        // width: '100%',
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
        width: '40vw',
        height: '40vh',
    },
    required: {
        color: 'red',
    },
    inputIcon: {
        width:'30px',
        height: '30px',
    }
}