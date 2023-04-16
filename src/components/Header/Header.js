import React from 'react'
import { Button } from '@mui/material'
import './Header.css'
const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    return (
        <div className='Header'>
            <div>
                <img src='./TT Logo.png' className='logo' width={"300px"} />
            </div>
            <div>
                {isLoggedIn ? <Button
                    variant='contained'
                    sx={{ width: '100px' }}
                    onClick={() => setIsLoggedIn(false)}>Log Out</Button> : null}

            </div>
        </div>
    )
}

export default Header