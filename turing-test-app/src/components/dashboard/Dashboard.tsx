import React, { useEffect, useState } from "react";
import './Dashboard.css'
import Header from "../header/Header";
import { Space, Table, Tag, Dropdown, message, PaginationProps, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Pagination } from 'antd';
import api from "../../Api/api";
import { useCookies } from 'react-cookie';
import { Call } from "../../interfaces/Call";
import CallDetailsModal from "../callDetails/CallDetailsModal";
import Pusher from "pusher-js";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const getTime = (time: number) => {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    return `${minutes} minutes ${seconds} seconds`
}


const items: MenuProps['items'] = [
    {
        label: 'All',
        key: 'All',
    },
    {
        label: 'Archived',
        key: 'Archived',
    },
    {
        label: 'Unarchived',
        key: 'Unarchived',
    },
];


export default function Dashboard() {

    const [cookies, setCookie] = useCookies(['authToken', 'refreshToken']);
    const [offset, setOffset] = useState(0);
    const [pageNumber, setpageNumber] = useState(1);
    const [totalcount, setTotalCount] = useState(0);
    const [retryFlag, setRetryFlag] = useState(false)
    const [callData, setCallData] = useState<Call[]>([])
    const [filteredData, setFilteredData] = useState<Call[]>([])
    const [filteredType, setFilteredType] = useState('All')
    const [viewModalData, setViewModalData] = useState<Call>()
    const [showModal, setShowModal] = useState(false)

    const [pusher, setPusher] = useState(new Pusher('d44e3d910d38a928e0be', {
        cluster: 'eu',
        channelAuthorization: {
            transport: 'ajax',
            endpoint: "https://frontend-test-api.aircall.io/pusher/auth"
        },
    }))


    useEffect(() => {

        api.get(`calls?offset=${offset}&limit=10`, { headers: { 'Authorization': `Bearer ${cookies.authToken}` } })
            .then((res) => {
                setCallData(res.data.nodes);
                filterData(filteredType, res.data.nodes)
                setTotalCount(res.data.totalCount);
            })
            .catch((err) => {
                if (err?.response?.data?.statusCode == 401) {
                    api.post('auth/refresh-token', {}, {
                        headers: {
                            'Authorization': `bearer ${cookies.refreshToken}`
                        }
                    })
                        .then((res) => {
                            setCookie('authToken', res.data.access_token, { path: '/' })
                            setRetryFlag(!retryFlag);
                        })
                        .catch((err) => { })
                }
            })


    }, [offset, retryFlag])

    useEffect(() => {
        const channel = pusher.subscribe('private-aircall');
        channel.bind('update-call', function () {
            setRetryFlag(!retryFlag);
        });
    }, [])

    const columns: ColumnsType<Call> = [
        {
            title: 'CALL TYPE',
            dataIndex: 'call_type',
            key: 'call_type',
            render: (call_type) => <span style={{ color: call_type === 'voicemail' ? 'blue' : call_type === 'missed' ? 'red' : call_type === 'answered' ? 'green' : 'black' }}>{call_type}</span>,
        },
        {
            title: 'DIRECTION',
            dataIndex: 'direction',
            key: 'direction',
            render: (direction) => <span style={{ color: 'blue' }}>{direction}</span>

        },
        {
            title: 'DURATION',
            dataIndex: 'duration',
            key: 'duration',
            render: (duration) => <><span >{getTime(duration)}</span><br /><span style={{ color: 'blue' }}>({duration} seconds)</span></>
        },
        {
            title: 'FROM',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'TO',
            dataIndex: 'to',
            key: 'to',
        },
        {
            title: 'VIA',
            dataIndex: 'via',
            key: 'via',
        },
        {
            title: 'CREATED AT',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <><span >{new Date(created_at).toISOString().split('T')[0]}</span></>
        },
        {
            title: 'STATUS',
            key: 'is_archived',
            dataIndex: 'is_archived',
            render: (_, { is_archived }) => (
                <>
                    {
                        is_archived ?
                            <Tag color={"green"} >
                                Archived
                            </Tag>
                            :
                            <Tag color={"gray"} >
                                Unarchive
                            </Tag>
                    }
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <Button type="primary" style={{ backgroundColor: '#4f46f8' }} onClick={() => { viewDetails(record.id) }} >
                            Add Note
                        </Button>
                    </Space>
                )
            },
        },
    ];

    const viewDetails = (id: string) => {
        var item = callData.filter((item) => { return item.id !== id })[0];
        setViewModalData(item);
        setShowModal(true)
    }

    const filterData = (type: string, data: Call[]) => {
        switch (type) {
            case 'All':
                setFilteredData(data);
                break;
            case 'Archived':
                setFilteredData(data.filter((item) => { return item.is_archived }));
                break;
            case 'Unarchived':
                setFilteredData(data.filter((item) => { return item.is_archived }));
                break;
        }
    }

    const onClick: MenuProps['onClick'] = ({ key }) => {
        setFilteredType(key);
        filterData(key, callData)
    };

    const paginationHandler: PaginationProps['onChange'] = (newPageNumber) => {

        setOffset((10 * newPageNumber) - 10)
        setpageNumber(newPageNumber)
    };

    return (
        <div className="Dashboard-container" >
            <Header isLoggedin={true} />
            <div className="Dashboard-container-main">
                <div className="Dashboard-container-internal">
                    <h3>Turing Technologies Frontend Test </h3>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Dropdown menu={{ items, onClick }}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    Filter By: <span style={{ color: '#4f46f8' }} >Status</span>
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                    <div className="table-content">
                        <Table columns={columns} dataSource={filteredData} pagination={false} />
                    </div>
                    <div className="pagination-content">
                        <Pagination defaultCurrent={1} current={pageNumber} total={totalcount} onChange={paginationHandler} />
                        <p style={{ fontSize: '14px' }}> {offset + 1} ~ {offset + 10} of {totalcount} results </p>
                    </div>
                </div>
            </div>
            {showModal && <CallDetailsModal setShowModal={setShowModal} data={viewModalData} />}
        </div>
    )
}