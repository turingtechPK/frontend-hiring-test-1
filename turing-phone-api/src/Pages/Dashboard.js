import React, {useState} from "react";
import { FormControl, InputLabel, MenuItem, Select, Table } from "@mui/material"
import MyTable from "../Components/MyTable/MyTable";
import Header from "../Components/Header/Header";
import { getCalls } from "../api";

const Dashboard  = () => {
    return(
        <div>  
        <Header/>
            <div className="App-body">
                <div className="pa5">
                <h1>Turing Technologies Frontend Test: Phone API</h1>
                <p>By Ibrahim Razzaque Bhatti</p>
                </div>
                <div className="flex display-cells pl4">
                <div>
                    <p>Filter By: </p>
                </div>
                <div className="pl3">
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value="All"
                        defaultValue="All"
                        // onChange={}
                        >
                        <MenuItem lavalue="All">All</MenuItem>
                        <MenuItem value="Archived">Archived</MenuItem>
                        <MenuItem value="Unarchived">Unarchived</MenuItem>
                        </Select>
                    </div>
                </div>

                <MyTable/>
            </div>
        </div>
      )

}

export default Dashboard;