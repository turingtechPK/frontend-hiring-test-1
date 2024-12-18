import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlueButton from "./BlueButton";

function createData(
  id,
  call_type,
  direction,
  duration,
  from,
  to,
  via,
  created_at,
  is_archived
) {
  return {
    id,
    call_type,
    direction,
    duration,
    from,
    to,
    via,
    created_at,
    is_archived,
  };
}

const CallTable = ({ nodes }) => {
  const navigate = useNavigate();

  const capitalizedData = Array.isArray(nodes)
    ? {
        nodes: nodes.map((node) => ({
          ...node,
          direction:
            node.direction.charAt(0).toUpperCase() + node.direction.slice(1),
          call_type:
            node.call_type.charAt(0).toUpperCase() + node.call_type.slice(1),
          is_archived: node.is_archived ? "Archived" : "Unarchived",
        })),
      }
    : { nodes: [] };

  const rows = capitalizedData.nodes.map((node) =>
    createData(
      node.id,
      node.call_type,
      node.direction,
      node.duration,
      node.from,
      node.to,
      node.via,
      node.created_at,
      node.is_archived
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="call details table">
        <TableHead>
          <TableRow>
            {[
              "CALL TYPE",
              "DIRECTION",
              "DURATION",
              "FROM",
              "TO",
              "VIA",
              "CREATED AT",
              "STATUS",
              "ACTIONS",
            ].map((header) => (
              <TableCell
                key={header}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  color: "#333",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f1f1f1",
                    cursor: "pointer",
                  },
                }}
                onClick={() => navigate(`/calls/${row.id}`)}
              >
                <TableCell>{row.call_type}</TableCell>
                <TableCell>{row.direction}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.from}</TableCell>
                <TableCell>{row.to}</TableCell>
                <TableCell>{row.via}</TableCell>
                <TableCell>
                  {new Date(row.created_at).toLocaleString()}
                </TableCell>
                <TableCell>{row.is_archived}</TableCell>
                <TableCell>
                  <BlueButton text="Add Note" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9}
                align="center"
                sx={{ padding: "20px", color: "#777" }}
              >
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CallTable;
