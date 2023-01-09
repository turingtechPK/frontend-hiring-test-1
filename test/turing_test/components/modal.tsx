import { useState } from "react";
import { addNote } from "../utilities/api";

interface props {
  row: {
    id: string;
    call_type: string;
    duration: number;
    from: string;
    to: string;
    via: string;
    notes: any;
  };
  closeModal: Function;
  setReloadRes: Function;
}

function DetailModal({ row, closeModal, setReloadRes }: props) {
  const [note, setNote] = useState("");
  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Add Notes <br /> <span className="id">{row.id}</span>
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
                <td>{row.call_type}</td>
              </tr>
              <tr>
                <td>
                  <b>Duration</b>
                </td>
                <td>{row.duration}</td>
              </tr>
              <tr>
                <td>
                  <b>From</b>
                </td>
                <td>{row.from}</td>
              </tr>
              <tr>
                <td>
                  <b>To</b>
                </td>
                <td>{row.to}</td>
              </tr>
              <tr>
                <td>
                  <b>Via</b>
                </td>
                <td>{row.via}</td>
              </tr>
              <tr>
                <td>
                  <b>Notes</b>
                </td>
                <td>
                  <ul>
                    {row.notes.map((item: any) => {
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
            <button
              className="btn btn-note btn-save"
              onClick={async (e) => {
                e.preventDefault();
                const res = await addNote(row.id, note);
                setReloadRes(res.data);
                closeModal();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
