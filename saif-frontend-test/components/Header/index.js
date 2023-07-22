import { Box, Button } from "@mui/material"
import { styles } from "./style"
import Image from "next/image"
import TTlogo from '../../../design-files/TT logo.png'

const Header = (props) => {
    const {isLoginPage} = props
    return (
        <Box sx={styles.header}>
            <Box>
                <Image style={styles.ttLogo} src={TTlogo} />
            </Box>
            {!isLoginPage &&
                <Button>Logout</Button>
            }
        </Box>
    )
}

export default Header