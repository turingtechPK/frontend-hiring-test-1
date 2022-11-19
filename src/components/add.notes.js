import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import AjaxCall from "../services/ajax";
import Modal from "react-bootstrap/Modal";
import { getTotalTime } from "../services/helpers";
import { setFirstLetterCapital } from "../services/helpers";

function AddNotes({ setShow, show, data }) {
  const [note, setNote] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function AddNotes() {
    AjaxCall("POST", `calls/${data.id}/note`, { content: note }, false, true)
      .then(function (response) {
        setShow(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Add Notes
            <p
              style={{ width: "100%", fontSize: "16px" }}
              className="voicemail-call"
            >
              Call ID{data.id}
            </p>
          </Modal.Title>
          <br />
        </Modal.Header>

        <Modal.Body>
          <div>
            <p>
              Call Type:{" "}
              <span className="voicemail-call">
                {setFirstLetterCapital(data.call_type)}
              </span>
            </p>
            <p>Call Duration: {getTotalTime(data.duration)}</p>
            <p> from: {data.from}</p>
            <p> to: {data.to}</p>
            <p> via: {data.via}</p>
            <p>Notes</p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="notes-textarea"
            >
              Add Notes
            </textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            style={{ width: "100%" }}
            onClick={() => AddNotes()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNotes;
