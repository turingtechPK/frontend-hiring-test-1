import React, {useEffect, useState} from "react";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import ENDPOINTS from "../../../api/endpoints";
import {postRequest} from "../../../api";

export default function AddNoteModal({itemId, visible, toggleModal, setData}) {

    const [content, setContent] = useState('');

    useEffect(() => {
        setContent('');
    }, [])

    function addNote() {
        async function apiCall() {
            try {
                const URL = ENDPOINTS.calls.createCallNote.replace(':id', itemId);
                const body = {content}
                const data = await postRequest(URL, body)
                if (data) {
                    setData(data)
                    toggleModal()
                }
            } catch (e) {
                console.log(e)
            }
        }
        apiCall()
    }

    return (
        <Modal isOpen={visible} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>
                Add note
            </ModalHeader>
            <ModalBody>
                <Input type="textarea" value={content} onChange={(e) => setContent(e.target.value)}/>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    size="sm"
                    onClick={addNote}
                >
                    Add
                </Button>
                {' '}
                <Button onClick={toggleModal} size="sm">
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}
