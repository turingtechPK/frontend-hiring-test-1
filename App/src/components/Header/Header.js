import React, { useState, useEffect } from 'react';
import cs from './Header.module.css'
import Image from 'next/image';
import { Button} from 'antd';
import logo from "./static/TT_Logo.png"
import { useRouter } from 'next/router';

const HeaderComp = (props) => {

    const router = useRouter();

    const logout = () => {
        router.push('/login')
    }

    return(
        <div className={cs.header}>
        <Image
            src={logo}
            alt="Company Logo"
            width={300}
            height={100}

            objectFit='contain'
      
        />
        {props.showLogout ? 
        <Button type="primary" size={'large'} onClick={logout} className={cs.btn_style}>Log out</Button>
        : null }
    </div>
    )
}

export default HeaderComp;