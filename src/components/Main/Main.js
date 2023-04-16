import React, { useEffect, useState } from 'react'
import { Select, MenuItem, InputLabel } from '@mui/material'
import './Main.css'

import CallTable from '../CallTable/CallTable'
const Main = () => {
    const [status, setStatus] = useState("")
    const handleDropdownChange = (e) => {
        setStatus(e.target.value)
    }

    return (

        <div className='Main'>
            {console.log("Main")}
            <div>
                <h2>Turing Technologies Frontend Test</h2>
                <div className='dropdown-container'>
                    <span>Filter by: </span>
                    <div className='dropdown'>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            id='status'
                            labelId='status-label'
                            label="Status"
                            autoWidth
                            value={status}
                            placeholder='Status'
                            onChange={(e) => handleDropdownChange(e)}>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="archived">Archived</MenuItem>
                            <MenuItem value="unarchived">Unarchived</MenuItem>
                        </Select>
                    </div>
                </div>
                <CallTable status={status} />
            </div >
        </div >
    )
}

export default Main