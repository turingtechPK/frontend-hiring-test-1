import {useEffect, useState} from "react";
import {URLs} from "@/config/endPoints";
import axios from "axios";
import {useRouter} from "next/router";
import AddNoteModal from "../components/AddNoteModal";
import Pagination from '@mui/material/Pagination';

export default function HomePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedCallID, setSelectedCallID] = useState();
    const [addNoteModal, setAddNoteModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState();
    const [totalCount, setTotalCount] = useState();
    const [callsData, setCallsData] = useState([]);
    const [offset, setOffSet] = useState(1);
    const [limit, setLimit] = useState(10);


    const fetchDataFromApi =  () => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            router.push('/login');
            return;
        }
        axios.get(`${URLs.calls}?offset=${offset}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                let filtered = [];
                setIsLoading(false);
                    const {hasNextPage: hasNext, totalCount: total, nodes} = res.data;
                    setHasNextPage(hasNext);
                    setTotalCount(total);
                if (filter === 'all') {
                    setCallsData(nodes);
                } else if (filter === 'archived') {
                    filtered = nodes.filter(i => i.is_archived === true);
                    setCallsData(filtered);
                } else if (filter === 'unarchived') {
                    filtered = nodes.filter(i => i.is_archived === false);
                    setCallsData(filtered);
                }

            })
            .catch(err => {
                if (err.response.status === 401) {
                    router.push('/login');
                }
                console.log(err);
            })
    };
    const changePagination = (event, value) => {
        setOffSet(value);
        setCurrentPage(value);
    };
    const addNote = (id) => {
        setSelectedCallID(id);
        setAddNoteModal(true);
    }
    useEffect(  () => {
            fetchDataFromApi();
    }, [offset, filter]);
    return (
        <>
            <AddNoteModal show={addNoteModal} onHide={()=>setAddNoteModal(false)} selectedCallId={selectedCallID}/>
            {!isLoading && <div className="home-page-wrapper">
                <p className="top-heading">
                    Turing Technologies Frontend Test
                </p>
                <div className="filtering-div">
                    <label htmlFor="status">Filter By:</label>
                    <select name="status" id="status" onChange={(e)=>setFilter(e.target.value)}>
                        <option value="all" selected>All</option>
                        <option value="archived">Archived</option>
                        <option value="unarchived">Unarchived</option>
                    </select>
                </div>
                <table className="calls-table">
                    <thead>
                    <tr>
                        <th>Call Type</th>
                        <th>Direction</th>
                        <th>Duration</th>
                        <th>From</th>
                        <th>TO</th>
                        <th>VIA</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {callsData?.map(({id, call_type, direction, duration, from, to, via, created_at, is_archived, notes }) => {
                        return <tr>
                            <td><span className={call_type}>{call_type}</span></td>
                            <td><span className="direction">{direction}</span></td>
                            <td><div className="duration">
                                <span>{`${parseInt(duration/60)} minutes ${duration%60} seconds`}</span>
                                <span className="bl">{`(${duration} seconds)`}</span>
                            </div></td>
                            <td>{from}</td>
                            <td>{to}</td>
                            <td>{via}</td>
                            <td>{created_at}</td>
                            <td><span className={is_archived ? 'archived' : 'unarchived'}>{is_archived ? 'Archived' : 'Unarchive'}</span></td>
                            <td><button className="add-note-btn blueBtn" onClick={()=>addNote(id)}>Add Notes</button> </td>
                        </tr>
                    })}
                    </tbody>
                </table>

                <div className="calls-pagination">
                    <Pagination count={10} shape="rounded" page={offset} onChange={changePagination} />
                    <p>{`${currentPage*10-9}-${currentPage*10} of ${totalCount} results`}</p>
                </div>

            </div>}
        </>
    )
}