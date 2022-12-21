import '../styles/Calls.css';

import { useEffect, useState } from 'react';
import { useTable } from "react-table";
import { useNavigate } from 'react-router-dom';
import logo from'../TT Logo.png';


function Calls() {
    const baseUrl = "https://frontend-test-api.aircall.io";
    const token = localStorage.getItem('token');
    const [calls, setCalls] = useState({});
    const [hasMore, setHasMore] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const headers = { 'Content-Type': 'application/json',
                            "Authorization": "Bearer " + token};
        fetch(baseUrl + '/calls?offset=5&limit=5', { headers })
        .then(response => response.json())
        .then(data => {
            const callings = Object.entries(data);
            setCalls(callings[0][1]);
            setHasMore(callings[2][1]);
        })
        .catch(error => {console.error('There was an error!', error)});
    }, []);

    // const columns = useMemo(
    //     () => [
    //         {
    //             Header: 'CALL TYPE',
    //             accessor: 'call_type'
    //         },
    //         {
    //             Header: 'DIRECTION',
    //             accessor: 'direction'
    //         },
    //         {
    //             Header: 'DURATION',
    //             accessor: 'duration'
    //         },
    //         {
    //             Header: 'FROM',
    //             accessor: 'from'
    //         },
    //         {
    //             Header: 'TO',
    //             accessor: 'to'
    //         },
    //         {
    //             Header: 'VIA',
    //             accessor: 'via'
    //         },
    //         {
    //             Header: 'CREATED AT',
    //             accessor: 'created_at'
    //         },
    //         {
    //             Header: 'STATUS',
    //             accessor: 'is_archived'
    //         },
    //         {
    //             Header: 'ACTIONS',
    //             accessor: ''
    //         },
    //     ]
    // );
    // const data = useMemo(() => JSON.parse(dataObj), []);

    // const {
    //     getTableProps, // table props from react-table
    //     getTableBodyProps, // table body props from react-table
    //     headerGroups, // headerGroups, if your table has groupings
    //     rows, // rows for the table based on the data passed
    //     prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    // } = useTable({
    //     columns: columns,
    //     data: data
    // });

    console.log(calls);

    return(
        <>
            <nav className="navbar"><img src={logo} className="navbar-brand"></img>
            <button onClick={() => navigate("/")}>Log Out</button>
            </nav>
            <div className="calls-body border-top px-3">
                <h1>Turing Technologies Frontend Test</h1>
                
                <div className="selector-div">
                    <p>Filter by: </p> 
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" id="status" data-bs-toggle="dropdown">
                            Status
                        </button>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item">All</li>
                            <li className="dropdown-item">Archived</li>
                            <li className="dropdown-item">Unarchived</li>
                        </ul>
                    </div>
                </div>

                <table>
                    <thead><tr>
                        <th>CALL TYPE</th>
                        <th>DIRECTION</th>
                        <th>DURATION</th>
                        <th>FROM</th>
                        <th>TO</th>
                        <th>VIA</th>
                        <th>CREATED AT</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                    </tr></thead>
                </table>
                
                <table className='border w-100 rounded'>
                <tbody>
                    {calls.map((call) => 
                        <tr>
                            <td>{call.call_type}</td>
                            <td>{call.direction}</td>
                            <td>{Math.floor(call.duration/60)} minutes and {call.duration%60} seconds</td>
                            <td>{call.from}</td>
                            <td>{call.to}</td>
                            <td>{call.via}</td>
                            <td>{new Date(call.created_at).toISOString().split('T')[0]}</td>
                            <td>{call.is_archived ? "Archived" : "Unarchived"}</td>
                            <td><button>Add notes</button></td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
        </>
        
    );
}

export default Calls;

                               
{/* <table {...getTableProps()} className='border w-100 rounded'>
    <thead>
        {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {
                    headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))
                } 
            </tr>
        ))}
    </thead>
    <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()}>
                    {
                        rows.cells.map((cell) => {
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })
                    }
                </tr>
            )
        })}
    </tbody>
</table> */}