import React, { useState, useEffect } from 'react';
import cs from './Display_Calls.module.css'
import { Button, Input, Table, Tag, Modal, Typography, Select } from 'antd';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { API_URL } from '../../constant';
import logo from "./static/TT_logo.png"
import { useRouter } from 'next/router';
import { Option } from 'antd/es/mentions';
import { Pagination } from 'antd';
import { ShowLoader } from '../ShowLoader';
import HeaderComp from '../Header/Header';
const { Text, Link } = Typography;
const { TextArea } = Input;
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];





const Display_Calls = (props) => {

    const [table_data, setTable_Data] = useState(null)
    const [all_data, setAll_Data] = useState(null)
    const [data_filter, setData_filter] = useState("All")
    const [new_note, setNew_Note] = useState(null)
    const [current_data, setCurrent_Data] = useState(null)
    const [visible, setVisible] = useState(false)

    const router = useRouter();
    const { token } = router.query

    useEffect(() => {
   
        getCalls()
    }, [])

    const columns = [
        {
            title: 'Call type',
            dataIndex: 'call_type',
            key: 'call_type',
            render: (_, _record) => {
                const { call_type } = _record
                return (
                    <>
                        <p style={{ color: call_type === 'missed' ? 'red' : '#4F46FC', textTransform: "capitalize", fontWeight: "400" }}>{call_type}</p>

                    </>
                )
            },
        },
        {
            title: 'Direction',
            dataIndex: 'direction',
            key: 'direction',
            render: (_, _record) => {
                const { direction } = _record
                return (
                    <>
                        <p style={{ color: direction === 'outbound' ? '#4F46FC' : 'black', textTransform: "capitalize", fontWeight: "400" }}>{direction}</p>

                    </>
                )
            },
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (_, _record) => {
                const { duration } = _record
                let minutes = Math.floor(duration / 60);
                let Seconds = duration % 60;
                return (
                    <>
                        <p style={{ fontWeight: "400", marginBottom: "-15px" }}>{minutes} minutes {Seconds} seconds</p>
                        <p style={{ color: '#4F46FC', textTransform: "capitalize", fontWeight: "400", fontStyle: "italic" }}>( {duration} seconds )</p>

                    </>
                )
            },
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
        },
        {
            title: 'Via',
            dataIndex: 'via',
            key: 'via',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        },

        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, tags) => (
                <>
                    {tags.is_archived ?
                        <Tag onClick={() => updateArchive(tags.id)} color={"teal"} style={{cursor:"pointer"}} >
                            Archived
                        </Tag>
                        :
                        <Tag onClick={() => updateArchive(tags.id)} color={"grey"} style={{cursor:"pointer"}} >
                            Unarchived
                        </Tag>
                    }


                </>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            render: (_, tags) => (

                <Button type="primary" size={'small'} onClick={() => openModal(tags)} className={cs.action_btn}>Add Note</Button>


            ),
        },
    ];

    function openModal(record) {
        setVisible(true)
        setCurrent_Data(record)
    }
    const uToken = token
    function getCalls() {

        fetch(`${API_URL}/calls`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + uToken,
            },
        })
            .then(response => {
                return response.json()
            })
            .then(function (data) {
                if (data["nodes"]) {
                    setTable_Data(data["nodes"])
                    setAll_Data(data["nodes"])
                }

            })
    }

    const logout = () => {
        router.push('/login')
    }

    function saveNote(nid) {
        ShowLoader("Updating")
        fetch(`${API_URL}/calls/${nid}/note`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + uToken,
            },
            body: JSON.stringify({ content: new_note }),
        })
            .then(response => {
                return response.json()
            })
            .then(async data => {
                if (data["notes"]) {
                    Swal.fire({
                        icon: "success",
                        title: "Note Added Successfully",
                        showConfirmButton: true,
                      
                    })


                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Unable to update note!",
                        text: "Try Again",
                        showConfirmButton: true,
                    
                    })
                }
                setVisible(false)
            })
    }

    function updateArchive(nid) {
        ShowLoader("Updating")
        fetch(`${API_URL}/calls/${nid}/archive`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + uToken,
            },
        
        })
            .then(response => {
                return response.json()
            })
            .then(async data => {
                if (data) {
                    Swal.fire({
                        icon: "success",
                        title: "Archived updated!",
                        showConfirmButton: true,

                    })


                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Archived Not updated!",
                        text: "Try Again",
                        showConfirmButton: true,

                    })
                }
                getCalls()
            })
    }

    function applyFilter(val) {


        let temp = [...all_data]
        if (val === "Archived") {
            let temp1 = [...temp]
            let filtered = temp.filter(x => x.is_archived === true)
            setTable_Data(filtered)
        }
        else if (val === "Unarchived") {
            let temp2 = [...temp]
            let filtered = temp.filter(x => x.is_archived !== true)
            setTable_Data(filtered)
        }
        else {
            setTable_Data(temp)
        }
    }

    function applyPagination(n) {

        ShowLoader("Loading")
        fetch(`${API_URL}/calls?offset=${n}&limit=10`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + uToken,
            },
        })
            .then(response => {
                return response.json()
            })
            .then(function (data) {
                if (data["nodes"]) {
                    setTable_Data(data["nodes"])
                    setAll_Data(data["nodes"])

                }
                Swal.fire({
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000

                })
            })
    }

    return (

        <div>
              <HeaderComp showLogout={true} />
     
            <div className={cs.body} >
                <h2 className={cs.h2}>Turing Technologies Front End Test</h2>
                <br /><br />
                <div >
                    <Text strong > Filter By </Text>
                    <Select
                        style={{ cursor: "pointer", width: "110px", marginLeft: "10px" }}
                        placeholder="Status"
                        optionFilterProp="children"


                        onChange={value => applyFilter(value)}
                    >

                        <Option style={{ textAlign: "left", }} value={"All"}>All</Option>
                        <Option style={{ textAlign: "left", }} value={"Archived"}>Archived</Option>
                        <Option style={{ textAlign: "left", }} value={"Unarchived"}>Unarchived</Option>
                    </Select>
                </div>


                <br /><br />
                {table_data ?
                    <div className={cs.table_wrap} >
                        <Table size="small" dataSource={table_data} columns={columns}
                            show

                            scroll={{ x: 900 }} />
                    </div>
                    : null}
                    <br/>  <br/>
                <Pagination defaultCurrent={1} total={150} position={"bottomCenter"} onChange={(n) => applyPagination(n)} />

            </div>

            <Modal
                title="Add Notes"
                centered
                visible={visible}
                onOk={() => saveNote(current_data.id)}
                onCancel={() => setVisible(false)}
                width={400}
                className={cs.modal}
            >
                {current_data &&
                    <div className={cs.modal_data}>

                        <div className={cs.modal_row}>
                            <p className={cs.modal_text}>Call Type</p> <Text >{current_data.call_type} </Text>
                        </div>
                        <div className={cs.modal_row}>
                            <p className={cs.modal_text}>Duration</p> <Text >{current_data.duration} </Text>
                        </div>
                        <div className={cs.modal_row}>
                            <p className={cs.modal_text}>From</p> <Text >{current_data.from} </Text>
                        </div>
                        <div className={cs.modal_row}>
                            <p className={cs.modal_text}>To</p> <Text >{current_data.to} </Text>
                        </div>
                        <div className={cs.modal_row}>
                            <p className={cs.modal_text}>Via</p> <Text >{current_data.via} </Text>
                        </div>
                    </div>
                }

        

                <br />
                <TextArea rows={4} placeholder="Add Notes" onChange={e => setNew_Note(e.target.value)} maxLength={50} />


            </Modal>

        </div>
    )
};


export default Display_Calls;
