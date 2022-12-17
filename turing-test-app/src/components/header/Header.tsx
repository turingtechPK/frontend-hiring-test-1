import React, { useState } from 'react';
import Logo from '../../assets/TT Logo.png'
import './Header.css'
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { useCookies } from 'react-cookie';
interface HeaderProps{
    isLoggedin:boolean
}

export default function Header(props: HeaderProps) {
    const [cookies, setCookie, removeCookie] = useCookies(['authToken', 'refreshToken']);
    const size: SizeType = 'large';

    const handleLogout=()=>{
        removeCookie('authToken');
        removeCookie('refreshToken')
        window.location.reload();
    }
    return (
        <div className={'Container'}>
            <div>
                <img src={Logo} alt="Turing Logo" width='250px' />
            </div>
            {
                props.isLoggedin && 
                <div>
                    <Button type="primary" size={size} style={{ backgroundColor: '#4f46f8' }} onClick={handleLogout}>
                        Log out
                    </Button>
                </div>
            }
        </div>
    )
}