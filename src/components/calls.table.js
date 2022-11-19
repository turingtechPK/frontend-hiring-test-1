import { useEffect, useState } from "react";
import AddNotes from "./add.notes";
import Table from "react-bootstrap/Table";
import { getTotalTime } from "../services/helpers";
import AjaxCall from "../services/ajax";
import { convertUTCDateToLocalDate } from "../services/helpers";
import { setFirstLetterCapital } from "../services/helpers";

const CallTable = (props) => {
  const [call_single_data, setSingleCallData] = useState("");
  const [modal_open, setModalOpen] = useState(false);
  const [data, setData] = useState(props.data);

  useEffect(() => {
    if (props.filter == "0") {
      setData(props.data);
    } else if (props.filter == "true") {
      setData(props.data.filter((a) => a.is_archived == true));
    } else if (props.filter == "false") {
      setData(props.data.filter((a) => a.is_archived == false));
    } else if (props.filter == "missed") {
      setData(props.data.filter((a) => a.call_type == "missed"));
    } else if (props.filter == "voicemail") {
      setData(props.data.filter((a) => a.call_type == "voicemail"));
    } else if (props.filter == "answered") {
      setData(props.data.filter((a) => a.call_type == "answered"));
    }
  }, [props.filter, props.data]);

  function getCompleteCallData(id) {
    AjaxCall("GET", `calls/${id}`, {}, false, true)
      .then(function (response) {
        setSingleCallData(response);
        setModalOpen(true);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function changeStatus(id) {
    if (confirm("Do you want to Archive or Unarchive this call?")) {
      AjaxCall("PUT", `calls/${id}/archive`, {}, false, true)
        .then(function (response) {
          props.getCallsData(0);
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      //does nothing
    }
  }

  return (
    <>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Call types</th>
            <th>Direction</th>
            <th>Duration</th>
            <th>From</th>
            <th>To</th>
            <th>Via</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => {
            return (
              <tr key={data.id}>
                <td
                  className={
                    data.call_type === "answered"
                      ? "answered-call"
                      : data.call_type === "missed"
                      ? "missed-call"
                      : "voicemail-call"
                  }
                >
                  {setFirstLetterCapital(data.call_type)}
                </td>
                <td className="voicemail-call">
                  {setFirstLetterCapital(data.direction)}
                </td>
                <td>
                  {getTotalTime(data.duration)}
                  <br />
                  <span className="voicemail-call">
                    ({data.duration} seconds)
                  </span>
                </td>
                <td>{data.from}</td>
                <td>{data.to}</td>
                <td>{data.via}</td>
                <td>{convertUTCDateToLocalDate(data.created_at)}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={(e) => changeStatus(data.id)}
                >
                  <p
                    className={
                      data.is_archived ? "archive-class" : "unarchive-class"
                    }
                  >
                    {data.is_archived ? "Archived" : "Unarchive"}
                  </p>
                </td>
                <td>
                  <button
                    className="secondary-button"
                    onClick={() => getCompleteCallData(data.id)}
                  >
                    Action
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {modal_open && (
        <AddNotes
          show={modal_open}
          setShow={setModalOpen}
          data={call_single_data}
        />
      )}
    </>
  );
};

export default CallTable;
