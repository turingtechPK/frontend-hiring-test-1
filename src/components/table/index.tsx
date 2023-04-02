import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { CallStateRaw } from "../../state/types";
import formatDuration, {
  extractDateFromString,
  toSentenceCase,
} from "../../utils/helpers";

interface IProps {
  tableData: CallStateRaw[];
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setItem: React.Dispatch<React.SetStateAction<CallStateRaw | undefined>>;
  archiveCall: (id: string) => Promise<void>;
}

const CallTable: React.FC<IProps> = ({
  tableData,
  setItem,
  setVisible,
  archiveCall,
}) => {

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="table">
          <TableHead
            sx={{ backgroundColor: "#F4F4F9", border: "2px solid #CBD6E2" }}
          >
            <TableRow sx={{ textAlign: "center" }}>
              <TableCell sx={{ fontWeight: "bold" }}>CALL TYPE</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>DIRECTION</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>DURATION</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>FROM</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>TO</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>VIA</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>CREATED AT</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: "2px solid #CBD6E2" }}>
            {tableData?.map((row, key) => (
              <TableRow
                key={key}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  border: "2px solid #CBD6E2",
                }}
              >
                <TableCell>
                  <Typography
                    sx={{
                      color:
                        row.call_type === "voicemail"
                          ? "#355CE7"
                          : row.call_type === "answered"
                          ? "#24CAB9"
                          : "#C91D3E",
                    }}
                  >
                    {toSentenceCase(row.call_type)}
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: "#355CE7" }}>
                  {toSentenceCase(row.direction)}
                </TableCell>
                <TableCell>
                  <Typography>
                    {formatDuration(Number(row.duration))}
                  </Typography>
                  <Typography sx={{ color: "#355CE7" }}>
                    {row.duration.toString()} seconds
                  </Typography>
                </TableCell>
                <TableCell>{row.from}</TableCell>
                <TableCell>{row.to}</TableCell>
                <TableCell>{row.via}</TableCell>
                <TableCell>
                  {extractDateFromString(row.created_at.toString()).toString()}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: row.is_archived ? "#EDFBF9" : "#EEEEEE",
                      color: row.is_archived ? "#24CAB9" : "#797979",
                      borderRadius: "0px",
                      paddingY: "4px",
                      paddingX: "8px",
                      textAlign: "center",
                    }}
                    onClick={() => {
                      archiveCall(row.id);
                    }}
                  >
                    {row.is_archived ? "Archived" : "Unarchived"}
                  </Box>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#4F46F8",
                      textTransform: "none",
                      borderRadius: 0,
                      letterSpacing: "1px",
                      py: "4px",
                      px: "20px",
                      "&:hover": {
                        backgroundColor: "#4F46F8",
                      },
                    }}
                    onClick={() => {
                      setItem(row);
                      setVisible(true);
                    }}
                  >
                    Add Note
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>{" "}
        </Table>
      </TableContainer>
    </>
  );
};

export default CallTable;
