import React from 'react';
import {Spinner} from "reactstrap";

export default function LoadingPage() {
    return (
        <div style={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            zIndex: '9999',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Spinner/>
        </div>
    );
};
