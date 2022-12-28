import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Form, Col } from "react-bootstrap";
import CallService from "../services/call.service";
import { channel } from '../services/pusher.service';
import TokenService from "../services/token.service";
import { useNavigate } from "react-router-dom";


const Call = ({ callData, setArchive, archive }) => {
  const [show, setShow] = useState(false);
  const [textarea, setTextarea] = useState('')
  const navigate = useNavigate();
  const [note, setNote] = useState(callData.notes)
  const { createNote, toggleArchive } = CallService

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    const token = TokenService.getLocalAccessToken();
      const decodedJwt = TokenService.parseJwt(token);
      if(decodedJwt.exp * 1000 < Date.now()){
        navigate('/')
        TokenService.removeUser();
        return
      }
    await createNote(callData.id, textarea)
    channel.bind("update-call", (data) => {
      // Method to be dispatched on trigger.
      if(data.id === callData.id){
        setNote([note, ...data.notes])
      }
    });
  }

  const handleArchive = async () => {
    const token = TokenService.getLocalAccessToken();
    const decodedJwt = TokenService.parseJwt(token);
    if(decodedJwt.exp * 1000 > Date.now){
      navigate('/')
    }
    await toggleArchive(callData.id)
    channel.bind("update-call", (data) => {
      // Method to be dispatched on trigger.
      if(data.id === callData.id){
        setArchive(!archive)
      }
    });
  }

  return (
    <>
      <tr>
        <td>1</td>
        <td>{callData.call_type}</td>
        <td>{callData.direction}</td>
        <td>{callData.duration}</td>
        <td>{callData.from}</td>
        <td>{callData.to}</td>
        <td>{callData.via}</td>
        <td>{callData.created_at}</td>
        <td><Button onClick={handleArchive}>{callData.is_archived === true ? "Archived" : "Unarchive"}</Button></td>
        <td>
          <Button variant="primary" onClick={handleShow}>
            Add Note
          </Button>
        </td>
      </tr>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              <strong>Call type: </strong>
              {callData.call_type}
            </li>
            <li>
              <strong>Duration: </strong>
              {callData.duration}
            </li>
            <li>
              <strong>From: </strong>
              {callData.from}
            </li>
            <li>
              <strong>To: </strong>
              {callData.to}
            </li>
            <li>
              <strong>Via: </strong>
              {callData.via}
            </li>
            <li>
              <strong>Notes</strong>
              <ul>{note.map((not) => { if(not.content){return(<li>{not.content}</li>)}})}</ul>
            </li>
          </ul>
          <Form>
            <Form.Group as={Col} controlId="formArea">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows="3" onChange={(e) => setTextarea(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Call;
