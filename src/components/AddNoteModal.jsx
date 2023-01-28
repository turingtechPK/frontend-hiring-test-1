import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useEffect, useState} from "react";
import axios from "axios";
import {URLs} from "@/config/endPoints";
import {useRouter} from "next/router";

function AddNoteModal(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [callData, setCallData] = useState();
    const [note, setNote] = useState('');

    const saveNote = async () => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            router.push('/login');
        }
        await axios.post(`${URLs.calls}/${props.selectedCallId}/note`,{
            content: note
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                if(res.status === 200) {
                    setCallData(res.data);
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    router.push('/login');
                }
                console.log(err);
            })
    };
    useEffect(()=>{
        console.log("in usgje")
        console.log("in use", props.selectedCallId)
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            router.push('/login');
        }
        axios.get(`${URLs.calls}/${props.selectedCallId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                setIsLoading(false);
                if(res.status === 200) {
                    setCallData(res.data);
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    router.push('/login');
                }
                console.log(err);
            })
    }, [props.selectedCallId]);
    return (
        <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="add-note-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div className="add-note-title">Add Note</div>
                        {!isLoading && <div className="title-id">
                            {`Call ID ${callData?.id}`}
                        </div>}
                    </Modal.Title>
                </Modal.Header>
            {!isLoading && <Modal.Body>
                <div style={{display: "flex", alignItems: "center", marginTop: "12px"}}>
                    <div className="data-label">Call Type: </div>
                    <div className="data-value bl-value">{callData?.call_type}</div>
                </div>
                <div style={{display: "flex", alignItems: "center", marginTop: "12px"}}>
                    <div className="data-label">Duration: </div>
                    <div className="data-value"><span>{`${parseInt(callData?.duration/60)} minutes ${callData?.duration%60} seconds`}</span></div>
                </div>
                <div style={{display: "flex", alignItems: "center", marginTop: "12px"}}>
                    <div className="data-label">From: </div>
                    <div className="data-value">{callData?.from}</div>
                </div>
                <div style={{display: "flex", alignItems: "center", marginTop: "12px"}}>
                    <div className="data-label">To: </div>
                    <div className="data-value">{callData?.to}</div>
                </div>
                <div style={{display: "flex", alignItems: "center", marginTop: "12px"}}>
                    <div className="data-label">VIA: </div>
                    <div className="data-value">{callData?.via}</div>
                </div>
                <div className="note-area-title">
                    Notes
                </div>
                <textarea className="note-area" rows="4" cols="70" placeholder="Add Note" value={note} onChange={(e)=>setNote(e.target.value)}>
                </textarea>
            </Modal.Body>}
                <Modal.Footer>
                    {!isLoading && <Button className="blueBtn" style={{width: "100%"}} onClick={saveNote}>Save</Button>}
                </Modal.Footer>
            </Modal>
    );
}

export default AddNoteModal;