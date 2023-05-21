"use client";

import Form from '@/components/form'
import Nav from '@/components/nav'
import React, { use } from 'react'
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/loginState';
import axios from 'axios';
import Cookies from 'js-cookie';
import FormDialog from '@/components/note';

function createData(
    callType,
    direction,
    duration,
    from,
    to,
    via,
    createdAt,
    Status,
    action
) {
    return { callType, direction, duration, from, to, via, createdAt, Status, action };
}



const Call = () => {

    const { user, login, logout, loading } = useUser();
    const [calls, setCalls] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [popUp, setPopUp] = useState(false);
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        const checkTokenExpiration = async () => {
            const accessToken = Cookies.get('access_token');
            const refreshToken = Cookies.get('refresh_token');

            console.log("Access token", accessToken)
            console.log("Refresh token", refreshToken)

            // Check if the access token is expired or not present
            if (!accessToken || isTokenExpired(accessToken)) {
                // Check if a refresh token is available
                if (refreshToken) {
                    try {
                        const response = await axios.post(
                            'https://frontend-test-api.aircall.io/auth/refresh-token',
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            }
                        );

                        console.log("FGDASSSSSSSSSS")
                        const access_token = response.access_token

                        Cookies.set('access_token', access_token);
                        //set refresh token
                        Cookies.set('refresh_token', refresh_token);

                        // fetch /calls with the new access token as bearer
                        const callsResponse = await axios.get('https://frontend-test-api.aircall.io/calls', {
                            headers: {
                                Authorization: `Bearer ${access_token}`,
                            },
                        });

                        console.log("Calls response", callsResponse.data)


                        // Update the calls state
                        setCalls(callsResponse.data);

                        // Update the access token in the cookies
                        Cookies.set('access_token', access_token);
                    } catch (error) {
                        console.error('Token refresh failed:', error);
                        // Handle token refresh error here
                    }
                } else {
                    // Redirect the user to the login page or show an appropriate message
                    console.log('Refresh token not found');
                }
            }
            else {
                console.log("Token is not expired")
                // get the token
                const token = Cookies.get('access_token');
                // decode the token
                // get the username from token
                const decodedToken = decodeToken(token);
                // get the current time
                const currentTime = Math.floor(Date.now() / 1000);
                // get the user from cookies
                const user = Cookies.get('user');

                const callsResponse = await axios.get('https://frontend-test-api.aircall.io/calls', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Calls response", callsResponse.data.nodes)

                // Update the calls state
                setCalls(callsResponse.data.nodes);



            }
        };

        checkTokenExpiration();

        // Clean up the timer when the component unmounts
        return () => clearTimeout(window.tokenRefreshTimer);
    }, []);

    const isTokenExpired = (token) => {
        const decodedToken = decodeToken(token);
        const currentTime = Math.floor(Date.now() / 1000);

        return decodedToken.exp < currentTime;
    };

    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Token decoding failed:', error);
            // Handle token decoding error here
            return null;
        }
    };


    const addNote = async (note) => {
        const token = Cookies.get('access_token');
        const response = await axios.post('https://frontend-test-api.aircall.io/activities', {
            type: "note",
            call_id: note.call_id,
            content: note.content
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Response", response.data)
    }

    useEffect(() => {
        const fetchCalls = async () => {
            const token = Cookies.get('access_token');
            const response = await axios.get(`https://frontend-test-api.aircall.io/calls?offset=${(currentPage - 1) * 10}&limit=${10}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Response", response.data.nodes)

            // Update the calls state
            setCalls(response.data.nodes);
        };

        fetchCalls();
    }, [currentPage]);



    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };



    function convertDateStringToDate(dateString) {
        const dateObject = new Date(dateString);

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
      
        return formattedDate;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
      
        const formattedTime = `${minutes} minute${minutes !== 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
      
        return formattedTime;
      }

    async function handleArchive(id)
    {
        // make a post request to /calls/:id/archive
        const token = Cookies.get('access_token');
        console.log("check archive")
        const response = await axios.put(`https://frontend-test-api.aircall.io/calls/${id}/archive`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Response", response.data)

        // set thre reponse to the call
        // fetch all the calls again and set them
        const callsResponse = await axios.get('https://frontend-test-api.aircall.io/calls', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Calls response", callsResponse.data.nodes)

        // Update the calls state
        setCalls(callsResponse.data.nodes);

    }
      

    return (
        <div className=''>
            <div className='p-10 border h-[90vh] flex flex-col justify-evenly'>
                <div className='text-3xl font-medium'>Turing Technologies Frontend Test</div>
                <div id='table' className='w-full h-auto border'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Call Type</TableCell>
                                    <TableCell align="left">DIRECTION</TableCell>
                                    <TableCell align="left">DURATION</TableCell>
                                    <TableCell align="left">FROM</TableCell>
                                    <TableCell align="left">TO</TableCell>
                                    <TableCell align="left">VIA</TableCell>
                                    <TableCell align="left">CREATED AT</TableCell>
                                    <TableCell align="left">STATUS</TableCell>
                                    <TableCell align="left">ACTION</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {calls && calls.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell align="left">{row.call_type === "missed" ? <span className='text-red-500'>{row.call_type}</span> : row.call_type === "answered" ? <span className='text-teal-500'>{row.call_type}</span> : <span className='text-blue-500'>{row.call_type}</span>}</TableCell>
                                        <TableCell align="left" ><div className='text-blue-400'>{row.direction}</div></TableCell>
                                        <TableCell align="left">{formatTime(row.duration).toString()}</TableCell>
                                        <TableCell align="left">{row.from} </TableCell>
                                        <TableCell align="left">{row.to}</TableCell>

                                        <TableCell align="left">{row.via}</TableCell>

                                        <TableCell align="left">{convertDateStringToDate(row.created_at).toString()}</TableCell>
                                        <TableCell align="left" onClick={() => 
                                        {
                                            console.log("Clicked")
                                            handleArchive(row.id)
                                        }}>{row.is_archived ? <span className='flex cursor-pointer items-center justify-center bg-teal-50 rounded-md p-2 text-teal-500 '>Archived</span> : <span className='flex cursor-pointer items-center justify-center bg-gray-100 rounded-md p-2 text-gray-500 '>Unarchive</span>}</TableCell>
                                        <TableCell align="left">{<FormDialog open={open} setOpen={setOpen} id={row.id}></FormDialog>}</TableCell>


                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div id='pagination' className='w-full flex items-center justify-center my-10'>
                    <Pagination count={10} page={currentPage} onChange={handlePageChange} color="primary" />
                </div>
            </div>
            

        </div>
    )
}

export default Call