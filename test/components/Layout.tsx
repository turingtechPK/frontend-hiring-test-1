import React from 'react'
import Header from './Header';

const Layout = (props: any) => {
    const { children } = props;

    return (
        <div className='flex flex-col'>
            <Header />
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout