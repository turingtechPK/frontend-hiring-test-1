import { Box, Button } from "@mui/material"
import { styles } from "./style"
import Image from "next/image"
import TTlogo from '../../../design-files/TT logo.png'
import { useRouter } from 'next/router'

const Header = (props) => {
    const router = useRouter()
    const {asPath} = router

    const logoutHandler = () => {
        localStorage.removeItem('turingUserToken')
        localStorage.removeItem('turingRefreshToken')
        router.push('/login')
    }

    return (
        <Box sx={styles.header}>
            <Box>
                <Image style={styles.ttLogo} src={TTlogo} />
            </Box>
            {asPath !== '/login' &&
                <Button sx={styles.logoutBtn} onClick={logoutHandler}>Logout</Button>
            }
        </Box>
    )
}

export default Header