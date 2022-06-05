import React, { useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

let entries = []

let keysArr = []
let colsKey = []
const List = ({ obj }) => {
    const [objList, setObjList] = useState(obj);
    let firstentry = obj[0]
    // These are steps for creating the heading row on the table
    keysArr = Object.keys(firstentry)
    colsKey = keysArr.map(key => {
        return {
            dataField: key,
            text: key
        }
    })

    // When Next button is clicked, it will call the API endpoint to get the next page of data with 10 more entries
    const fetchMore = (e) => {

        if (entries.length === 0) {
            entries = obj
        }
        let temparr = []
        axios.put("http://localhost:8585/getMoreData", {
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_SECRET_KEY}`
            },
            data: {
                name: e.target.name,
                lastId: entries.length
            }
        })
            .then(res => {
                // if the response is empty, it will show an alert mainly at the ends of our data
                if (res.data === 'no data') {
                    alert("no more data")
                } else {
                    temparr = res.data.nodes
                    entries = entries.concat(temparr)
                    for (let i = 0; i < objList.length; i++) {
                        if (temparr[i].notes) {
                            delete entries[i].notes
                            delete temparr[i].notes
                        }
                        objList[i] = temparr[i]
                    }
                setObjList(temparr)
                }
            })
    }

    // On clicking the previous button this funciton will modify the data in the table and display previous 10 entries in the table
    const previousbtn = () => {
        let finalentry = entries.length
        let last10 = finalentry - 10
        if(entries.length > 10) {
            entries = entries.filter((entry, index) => index < last10)
            let tempentries = objList
            
            let counter = entries.length - 1
            for(let i = objList.length-1; i >= 0; i--) {
                objList[i] = entries[counter]
                tempentries[i] = entries[counter]
                counter--
            }
            setObjList([...tempentries])
        } else {
            alert("No more data")
        }
    }


    return (
        <div>
            <div className="w-100">
                <BootstrapTable
                    striped
                    bordered
                    hover
                    keyField='id'
                    data={objList} columns={colsKey} />
            </div>

            <div className="w-100">
                <div className="w-100 d-flex justify-content-center">
                    <button name="previous" className="btn btn-secondary mx-1" onClick={previousbtn}>Previous</button>
                    <button name="next" className="btn btn-secondary mx-1" onClick={fetchMore}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default List;