import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { IoMdClose } from "react-icons/io";
import "./CallDetailsModal.css";

function CallDetailModal({ show, handleClose, data }) {
  console.log(data?.notes);
  const capitalize = (string) => {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutes ${remainingSeconds} seconds`;
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
        <div>
          <p className="m-0 mb-1">Add Notes</p>
          <p className="m-0" style={styles.sub_heading}>
            Call ID {data?.id}
          </p>
        </div>

        <IoMdClose
          className="align-self-center"
          color="#4f46f8"
          size={"26px"}
          cursor={"pointer"}
          onClick={handleClose}
        />
      </div>

      <Modal.Body className="border-bottom mb-0 pb-0">
        <Form>
          <Form.Group
            className="mb-0 ms-1"
            controlId="exampleForm.ControlInput1"
          >
            <div style={styles.grids}>
              <div>
                <p style={styles.grid_title}>Call Type</p>
                <p style={styles.grid_title}>Duration</p>
                <p style={styles.grid_title}>From</p>
                <p style={styles.grid_title}>To</p>
                <p style={styles.grid_title}>Via</p>
              </div>{" "}
              <div>
                <p style={styles.grid_body_txt}>
                  {capitalize(data?.call_type)}
                </p>
                <p style={styles.grid_body_txt}>{formatTime(data?.duration)}</p>
                <p style={styles.grid_body_txt}>{data?.from}</p>
                <p style={styles.grid_body_txt}>{data?.to}</p>
                <p style={styles.grid_body_txt}>{data?.via}</p>
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="small mb-1">Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Add Notes"
              style={{ fontSize: "14px" }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <button onClick={() => handleClose()} style={styles.modal_btn}>
        Save
      </button>
    </Modal>
  );
}

export default CallDetailModal;
const styles = {
  sub_heading: {
    color: "#4f46f8",
    fontSize: "12px",
  },
  modal_btn: {
    border: "none",
    margin: "24px 18px",
    backgroundColor: "#4f46f8",
    color: "#fff",
    fontWeight: "500",
    fontSize: "15px",
    padding: "12px",
    borderRadius: "4px",
  },
  grids: {
    display: "flex",
    gap: 12,
  },
  grid_title: {
    fontSize: "14px",
    fontWeight: "500",
  },
  grid_body_txt: {
    fontSize: "14px",
    // fontWeight: "500",
  },
};
