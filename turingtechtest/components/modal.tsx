import { useState } from "react";
import { addNote } from "../utilities/api";

interface props {
  rowData: any;
  closeModal: Function;
  setReloadRes: Function;
}

function DetailModal({ rowData, closeModal, setReloadRes }: props) {
  const [note, setNote] = useState("");
  async function handleSave(e: any) {
    e.preventDefault();
    const res = await addNote(rowData.id, note);
    setReloadRes(res.data);
    closeModal();
  }
  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Add Notes <br /> <span className="id">{rowData.id}</span>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => {
                closeModal();
              }}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <table>
              <tr>
                <td>
                  <b>Call Type</b>
                </td>
                <td>{rowData.call_type}</td>
              </tr>
              <tr>
                <td>
                  <b>Duration</b>
                </td>
                <td>{rowData.duration}</td>
              </tr>
              <tr>
                <td>
                  <b>From</b>
                </td>
                <td>{rowData.from}</td>
              </tr>
              <tr>
                <td>
                  <b>To</b>
                </td>
                <td>{rowData.to}</td>
              </tr>
              <tr>
                <td>
                  <b>Via</b>
                </td>
                <td>{rowData.via}</td>
              </tr>
              <tr>
                <td>
                  <b>Notes</b>
                </td>
                <td>
                  <ul>
                    {rowData.notes.map((item: any) => {
                      return <li key={item.id}>{item.content}</li>;
                    })}
                  </ul>
                </td>
              </tr>
            </table>
            <div>
              <textarea
                cols={55}
                rows={4}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-note btn-save" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
