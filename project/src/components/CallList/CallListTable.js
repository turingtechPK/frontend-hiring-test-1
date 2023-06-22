import React, { useState } from "react";
import { Table } from "react-bootstrap";
import AddModal from "./AddModal";

const CallListTable = (props) => {
  var calls = props.data.nodes;
  const [openModal, setOpenModal] = useState(false);

  if (!props.data) {
    return <h3>Loading data</h3>;
  }

  const fixDataForDisplay = () => {
    calls = calls.map((call) => {
      let minutes = Math.floor(Number(call.duration) / 60);
      let seconds = call.duration - minutes * 60;
      return {
        ...call,
        created_at: call.created_at.split("T")[0],
        duration: `${minutes} minutes ${seconds} seconds (${call.duration})`,
        direction:
          call.direction.charAt(0).toUpperCase() +
          call.direction.slice(1).toLowerCase(),
        call_type:
          call.call_type.charAt(0).toUpperCase() +
          call.call_type.slice(1).toLowerCase(),
      };
    });
  };

  fixDataForDisplay();

  return (
    <Table hover>
      <thead>
        <tr>
          <th>CALL TYPE</th>
          <th>DIRECTION</th>
          <th>DURATION</th>
          <th>FROM</th>
          <th>TO</th>
          <th>VIA</th>
          <th>CREATED AT</th>
          <th>STATUS</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {calls.map((call, i) => (
          <tr key={call.id}>
            <td>{call.call_type}</td>
            <td>{call.direction}</td>
            <td>{call.duration}</td>
            <td>{call.from}</td>
            <td>{call.to}</td>
            <td>{call.via}</td>
            <td>{call.created_at}</td>
            <td>{call.is_archived ? "Archived" : "Unarchived"}</td>
            <td>
              <button
                onClick={() => setOpenModal(true)}
                className="btn btn-primary"
              >
                Add Note
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CallListTable;
