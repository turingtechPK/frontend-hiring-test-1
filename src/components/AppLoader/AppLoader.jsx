import React from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

function AppLoader({ loading, setShowModal }) {
  return (
    <Modal show={loading} onHide={setShowModal} centered size="sm">
      <Modal.Header>
        <Modal.Title>Loading Data...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <br />
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
        <br />
        <br />
      </Modal.Body>
    </Modal>
  );
}

export default AppLoader;
