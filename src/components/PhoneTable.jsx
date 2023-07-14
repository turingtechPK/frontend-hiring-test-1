import React from "react";
import moment from "moment";
//mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function createData(
  type,
  direction,
  duration,
  from,
  to,
  via,
  created,
  status,
  actions
) {
  return { type, direction, duration, from, to, via, created, status, actions };
}

const PhoneTable = ({ callData, handleArchive, handleModal }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "rgba(128, 128, 128, 0.2) " }}>
              <TableCell className="tableheading" align="center">
                CALL TYPE
              </TableCell>
              <TableCell className="tableheading" align="center">
                DIRECTION
              </TableCell>
              <TableCell className="tableheading" align="center">
                DURATION
              </TableCell>
              <TableCell className="tableheading" align="center">
                FROM
              </TableCell>
              <TableCell className="tableheading" align="center">
                TO
              </TableCell>
              <TableCell className="tableheading" align="center">
                VIA
              </TableCell>
              <TableCell className="tableheading" align="center">
                CREATED AT
              </TableCell>
              <TableCell className="tableheading" align="center">
                STATUS
              </TableCell>
              <TableCell className="tableheading" align="center">
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {callData.map((call, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{
                    color: `${
                      call.call_type == "answered"
                        ? "#4bd4c6"
                        : call.call_type == "missed"
                        ? "#d13e5a"
                        : "#325ae7"
                    }`,
                  }}
                  className="individualCell"
                  align="center"
                >
                  {call.call_type}
                </TableCell>
                <TableCell
                  style={{
                    color: "#325ae7",
                  }}
                  className="individualCell"
                  align="center"
                >
                  {call.direction}
                </TableCell>
                <TableCell className="durationp" align="center">
                  {call.duration.minutes} minutes {call.duration.seconds}{" "}
                  seconds
                  <br />
                  <p
                    style={{
                      color: "#325ae7",
                    }}
                  >
                    {`(${call.duration.originalDuration}) seconds`}
                  </p>
                </TableCell>
                <TableCell className="durationp" align="center">
                  {call.from}
                </TableCell>
                <TableCell className="durationp" align="center">
                  {call.to}
                </TableCell>
                <TableCell className="durationp" align="center">
                  {call.via}
                </TableCell>
                <TableCell className="durationp" align="center">
                  {moment(call.created_at).format("MM-DD-YYYY")}
                </TableCell>
                <TableCell align="center">
                  <div
                    onClick={() => handleArchive(call.id)}
                    className="durationp "
                    style={{
                      backgroundColor: `${
                        call.is_archived == true ? "#eeeeee" : "#edfbfa"
                      }`,
                      color: `${
                        call.is_archived == true ? "#727272" : "#1dc9b7"
                      }`,
                      padding: "4px",
                    }}
                  >
                    <p className="durationp ">
                      {call.is_archived ? "Archived" : "Unarchive"}
                    </p>
                  </div>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <Button onClick={() => handleModal(call)} variant="contained">
                    Add Note
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PhoneTable;
