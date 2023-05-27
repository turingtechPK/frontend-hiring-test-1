import { useEffect, useState } from 'react';
import axios from '../utils/api';
import { AiOutlineDown } from 'react-icons/ai'
import AccessibleTable from './Table';
import Cookies from 'js-cookie';
import { Pagination, Stack } from '@mui/material';
import NoteModal from './Modal';
import Spinner from './Spinner';
import useFetch from '@/utils/useFetch';
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Call } from '@/utils/useFetch';
import { useAuth } from '@/context/AuthContext';

interface IProps {
    isLoading: boolean
    error: string
    callData: Call[]
    filteredData: Call[]
    totalCount: number
    hasNextPage: boolean
    setFilteredData: React.Dispatch<React.SetStateAction<Call[]>>
    setCallData: React.Dispatch<React.SetStateAction<Call[]>>
}

const Dashboard = () => {
    const [pusherChannel, setPusherChannel] = useState<any>(null);
    const [filterType, setFilterType] = useState('Status');
    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const [timerFlag, setTimerFlag] = useState(false)
    const [open, setOpen] = useState(false);
    const [callDetails, setCallDetails] = useState<Call>();
    const [openDropdown, setOpenDropDown] = useState(false);


    const { isLoading, error, callData, filteredData, totalCount, hasNextPage, setFilteredData, setCallData }: IProps = useFetch(offset);
    const { logout } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("hello")
            tokenRefresh().then((res) => {
                Cookies.set('accessToken', res.data.access_token);
                Cookies.set('refreshToken', res.data.refresh_token);
                setTimerFlag(!timerFlag)
            }).catch(err => {
                if (err.response.data.statusCode === 401) {
                    logout();
                }
            })
        }, 5 * 60 * 1000);

        return () => clearTimeout(timer);

    }, []);

    useEffect(() => {
        const pusher = new Pusher('d44e3d910d38a928e0be', {
            cluster: 'eu',
            authEndpoint: 'https://frontend-test-api.aircall.io/pusher/auth',
            auth: {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("accessToken")}`
                }
            }
        });
        const channel = pusher.subscribe('private-aircall');
        setPusherChannel(channel);
        channel.bind('update-call', (pusherData: any) => {
        });
    }, []);

    useEffect(() => {
        if (pusherChannel && pusherChannel.bind) {
            pusherChannel.unbind('update-call');
            pusherChannel.bind('update-call', (pusherData: Call) => {
                setCallData(callData.map((item) => {
                    return item.id === pusherData.id ? pusherData : item;
                }));
                setFilteredData(filteredData.map((item) => {
                    return item.id === pusherData.id ? pusherData : item;
                }));
            })
        }
    }, [pusherChannel, callData]);

    const applyFilter = (filter_type: string) => {
        setFilterType(filter_type);
        if (filter_type === 'All') {
            setFilteredData(callData);
        } else if (filter_type === 'Archived') {
            setFilteredData(callData.filter(item => item.is_archived))
        } else if (filter_type === 'Unarchived') {
            setFilteredData(callData.filter(item => !item.is_archived))
        }
    }

    useEffect(() => {
        applyFilter(filterType);
    }, [callData])


    const tokenRefresh = async () => {
        return await axios.post('/auth/refresh-token', {}, { headers: { 'Authorization': `Bearer ${Cookies.get('accessToken')}` } })
    };


    const handleModalClose = () => { setOpen(!open) };

    const pageChange = (event: React.ChangeEvent<any>, value: number) => {
        setOffset((10 * value) - 10)
        setPage(value);
    }


    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        toast.error('📛 An Error Occurred!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <div className='w-full h-screen px-10 flex flex-col flex-1 gap-3 sm:gap-5 pt-20 pb-10'>
            <ToastContainer />
            {callDetails && <NoteModal open={open} handleModalClose={handleModalClose} data={callDetails} />}
            <h1 className='text-black mt-5 text-3xl font-semibold'>Turing Technologies Frontend Test</h1>
            <div>
                <div className='text-sm flex items-center '>
                    <h3>Filter by:</h3>
                    <div onClick={() => setOpenDropDown(!openDropdown)} className='hover:cursor-pointer flex justify-between items-center w-[100px] ml-2 m-2 text-sm text-primary '>{filterType === 'status' ? <p>Status</p> : <p>{filterType}</p>}
                        <AiOutlineDown className='text-sm' size={12} />
                    </div>
                </div>
                <div onClick={() => { setOpenDropDown(false) }} style={{ display: `${openDropdown ? 'block' : 'none'}`, position: 'fixed', background: 'white', padding: 4 }}>
                    <ul className='hover:cursor-pointer'>
                        <li onClick={() => { applyFilter('All') }} className='w-[250px] ml-2 text-sm px-3 py-3 rounded-md text-primary outline-none border-none hover:bg-slate-200'>
                            All
                        </li>
                        <li onClick={() => { applyFilter('Archived') }} className='w-[250px] rounded-md ml-2 text-sm px-3 py-3 text-primary outline-none border-none hover:bg-slate-200'>
                            Archived
                        </li>
                        <li onClick={() => { applyFilter('Unarchived') }} className='w-[250px] ml-2 text-sm px-3 py-2 text-primary outline-none border-none rounded-md hover:bg-slate-200'>
                            Unarchived
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <AccessibleTable data={filteredData} handleModalClose={handleModalClose} setCallDetails={setCallDetails} />
            </div>
            {callData &&
                <div className="self-center flex flex-col items-center justify-center">
                    <Stack spacing={2}>
                        <Pagination count={Math.ceil(totalCount / 10)} color='primary' page={page} shape="rounded" onChange={pageChange} />
                    </Stack>
                    <p className='text-sm mb-6'>{`${offset + 1} - ${hasNextPage ? offset + 10 : totalCount} of ${totalCount} results`}</p>
                </div>}
        </div>
    )
}

export default Dashboard