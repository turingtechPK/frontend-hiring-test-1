import { Box, InputAdornment, Typography, Button } from "@mui/material"
import { StyledTextField, styles } from "../../pagesStyles/login.style"
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/router'
import { login } from "../../utils/API";

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (value) => {
        setEmail(value)
    }

    const handlePasswordChange = (value) => {
        setPassword(value)
    }

    const loginHandler = async () => {
        const payload = {
            username: email,
            password: password,
        }
        const response = await login(payload)
        if (response) {
            localStorage.setItem('turingUserToken', response?.data?.access_token)
            localStorage.setItem('turingRefreshToken', response?.data?.refresh_token)
            router.push('/')
        }
    }

    return (
        <Box sx={styles.loginMain}>
            <Box sx={styles.loginForm}>
                <Typography><span style={styles.required}>* </span>User Name</Typography>
                <StyledTextField
                    placeholder="Email"
                    onChange={(e) => handleEmailChange(e.target.value)}
                    value={email}
                />
                <Typography><span style={styles.required}>* </span>Password</Typography>
                <StyledTextField
                    placeholder="Password"
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    value={password}
                    type="password"
                />
                <Button sx={styles.loginBtn} onClick={loginHandler}>Login</Button>
            </Box>
        </Box>
    )
}

export default Login