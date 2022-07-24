import React from 'react'
import {ILLUSTRATION_404} from "../../assets";

export default function NotFoundPage() {
    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img alt='' src={ILLUSTRATION_404} style={{ width: 304, height: 240 }} />
        </div>
    )
}
