import React, { ChangeEvent, useState } from 'react';
import { Button, Modal, message } from 'antd';
import { Input } from 'antd';
import api from '../../Api/api';
import { useCookies } from 'react-cookie';

const { TextArea } = Input;

const getTime = (time: number) => {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    return `${minutes} minutes ${seconds} seconds`
}

const CallDetailsModal = (props: any) => {
    const [cookies, setCookie] = useCookies(['authToken', 'refreshToken']);

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [note, setNote] = useState('');

    const updateNote = (e: ChangeEvent<any>) => {
        setNote(e.target.value);
    }

    const AddNote = () => {
        api.post(`/calls/${props.data.id}/note`, { content: note }, { headers: { 'Authorization':`Bearer ${cookies.authToken}` } })
            .then((res) => {
                message.success('Successfully Updated')
                handleOk()
            })
            .catch((err) => {
                console.log(err)
                message.error('An error occurred !')
                
            })
    }

    const showModal = () => {
        setIsModalOpen(true);

    };

    const handleOk = () => {
        setIsModalOpen(false);
        props.setShowModal(false)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        props.setShowModal(false)
    };

    return (
        <>
            <Modal title="Add notes" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                okButtonProps={{ hidden: true }}
                cancelButtonProps={{ hidden: true }}
            >
                <p style={{ color: 'blue', fontWeight: 600 }}>Call ID{props.data.id}</p>
                <hr />
                <p style={{ fontWeight: 600 }}>Duration <span> {getTime(props.data.duration)}</span></p>
                <p style={{ fontWeight: 600 }}>From:    {props.data.from}</p>
                <p style={{ fontWeight: 600 }}>To:      {props.data.to}</p>
                <p style={{ fontWeight: 600 }}>Via:     {props.data.via}</p>
                <p style={{ fontWeight: 600 }}>Notes</p>
                <TextArea rows={4} onChange={updateNote} />
                <br />
                <br />
                <Button type="primary" disabled={note.length === 0} style={{ backgroundColor: '#4f46f8' }} onClick={() => { AddNote() }} >
                    Save
                </Button>
            </Modal>
        </>
    );
};

export default CallDetailsModal;