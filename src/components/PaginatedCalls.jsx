import React from 'react'
import Button from '@mui/material/Button';
import { Modal, Divider ,Input,Pagination} from 'antd';

import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { CallType, secondsToHms, FormatDate } from './Utilities';
import { Select } from 'antd';
import { PAGINATED_CALLS_QUERY, ARCHIVE_CALL_MUTATION, ADD_NOTE_MUTATION } from "../services/api";

const { TextArea } = Input;
const PAGE_SIZE = 10; // number of items per page 
const PaginatedCalls = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data } = useQuery(PAGINATED_CALLS_QUERY, {
        variables: {
            offset: (currentPage - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
        },
        context: {
            headers: {
                Authorization: `Bearer  ${sessionStorage.getItem("token")}  `,
            },
        },
    });
    const [calls, setCalls] = useState([]);
    const [selectedCall, setSelectedCall] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const [note, setNote] = useState("");

    const [archiveCall] = useMutation(ARCHIVE_CALL_MUTATION);
    const [addNote] = useMutation(ADD_NOTE_MUTATION);

    const handleArchive = (id) => {
        archiveCall({
            variables: {
                id: id,
            },
            context: {
                headers: {
                    Authorization: `Bearer  ${sessionStorage.getItem("token")}  `,
                },
            },
            refetchQueries: [
                {
                    query: PAGINATED_CALLS_QUERY,
                    variables: {
                        offset: (currentPage - 1) * PAGE_SIZE,
                        limit: PAGE_SIZE,
                    },
                    context: {
                        headers: {
                            Authorization: `Bearer  ${sessionStorage.getItem("token")}  `,
                        },
                    },
                },
            ],
        });
    };
    const hanleCancel = () => {
        setIsModalOpen(false);
        setSelectedCall(null);
    };

    const handleAddNote = (id) => {
        addNote({
            variables: {
                activityId: id,
                content: note,
            },
            context: {
                headers: {
                    Authorization: `Bearer  ${sessionStorage.getItem("token")}  `,
                },
            },
            onCompleted: () => {
                setIsModalOpen(false);
                setNote("");
            },
            onError: (error) => {
                console.log(error);
            },
            refetchQueries: [
                {
                    query: PAGINATED_CALLS_QUERY,
                    variables: {
                        offset: (currentPage - 1) * PAGE_SIZE,
                        limit: PAGE_SIZE,
                    },
                    context: {
                        headers: {
                            Authorization: `Bearer  ${sessionStorage.getItem("token")}  `,
                        },
                    },

                },
            ],
        });
    };
    useEffect(() => {
        if (data) {
            setCalls(data.paginatedCalls.nodes);
            setTotalPages(Math.ceil(data.paginatedCalls.totalCount / PAGE_SIZE));
            console.log( data.paginatedCalls.totalCount ,Math.ceil(data.paginatedCalls.totalCount / PAGE_SIZE)   )
        }
    }, [data]);

    const filteredCalls = calls.filter((call) => call.is_archived === (filter === "All" ? call.is_archived : filter === "Archieved" ? true : false));
    

    const sortedCalls = filteredCalls.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
 

    return (
        <>
            <span  >Filter by:  <Select
                placeholder='Filter by Status'
                options={[
                    { value: 'All', label: 'All' },
                    { value: 'Archieved', label: 'Archieved' },
                    { value: 'Unarchieved', label: 'Unarchieved' }]}
                onChange={setFilter}
                value={filter}
            >

            </Select>
            </span>


            <Modal
                title='Add Note' open={isModalOpen} onCancel={hanleCancel}  centered >
                {selectedCall && (
                    <>
                        <p style={{ color: "indigo" }}>Call ID: {selectedCall?.id}</p>
                        <Divider />
                        <p style={{ color: "black", fontSize: "20px" }}>Call Type: {CallType(selectedCall?.call_type)}  </p>
                        <p style={{ color: "black", fontSize: "20px" }}>Duration: {secondsToHms(selectedCall?.duration)}</p>
                        <p style={{ color: "black", fontSize: "20px" }}>From: {selectedCall?.from}</p>
                        <p style={{ color: "black", fontSize: "20px" }}>To: {selectedCall?.to}</p>
                        <p style={{ color: "black", fontSize: "20px" }}>Via: {selectedCall?.via}</p>
                        <Divider />
                        <p>ADD Note</p>
                        <TextArea 
                        value={note}
                        onChange={(event) => setNote(event.currentTarget.value)}
                        placeholder="Add notes here" rows={4} />
                        {selectedCall?.notes?.map((note) => (
                            <p key={note.id}>{note.content}</p>

                        ))}
                        <Button  className='w-full'
                         variant='contained'
                         style={{ backgroundColor: "#4942E4" ,marginTop:'10px'  }}
                            onClick={() => handleAddNote(selectedCall?.id)}
                        >
                            Save Note
                        </Button>


                    </>)}
            </Modal>

            <table style={{ border: '1px solid #ccc', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', }} className='w-full   mt-8' >
                <thead style={{ backgroundColor: "#D3D3D3" }} className='h-10 '>
                    <tr className='border' >
                        <th   >Call Type </th>
                        <th>Direction</th>
                        <th>Duration</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Via</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody >
                    {sortedCalls.map((call) => (
                        <tr key={call.id} className='border ' >
                            <td className='px-10 py-6'>{CallType(call.call_type)}</td>
                            <td>
                                <p style={{ color: "blue" }} >{call.direction.toUpperCase()}</p>
                            </td>
                            <td>{secondsToHms(call.duration)}</td>
                            <td>{call.from}</td>
                            <td>{call.to}</td>
                            <td>{call.via}</td>
                            <td>{FormatDate(call.created_at)}</td>
                            <td>
                                {call.is_archived ? (
                                    <Button
                                        onClick={() => handleArchive(call.id)}

                                        style={{ color: "green" }}
                                    >
                                        Archived
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => handleArchive(call.id)}
                                        

                                    >
                                        Unarchive
                                    </Button>
                                )}
                            </td>
                            <td>
                                <Button
                                    onClick={() => {
                                        setSelectedCall(call);
                                        setIsModalOpen(true);
                                    }}
                                    variant='contained'
                                    style={{ backgroundColor: "#4942E4" }}
                                >
                                    Add Notes
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex flex-col justify-center items-center mt-8'>
                <Pagination
                defaultCurrent={currentPage} total={data?.paginatedCalls?.totalCount}
                onChange={(page) => setCurrentPage(page)}
                ></Pagination>
                <Divider />
                <p>{(currentPage-1)*PAGE_SIZE} - {PAGE_SIZE*currentPage} of {data?.paginatedCalls?.totalCount} results</p>
            </div>
        </>
    )
}

export default PaginatedCalls
