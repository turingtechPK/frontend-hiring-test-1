import { withStyles } from "@mui/styles";
import styles from "../styles/Table.module";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { formatDate, formatDuration } from "../services/date-formatter";

import { call } from "../Interfaces/calls";
import { tableComponent } from "../Interfaces/tableComponent";

function TableComponent({
  classes,
  calls,
  totalCalls,
  hasNextPage,
  handlePaginationChange,
  handleAddNote,
}: tableComponent) {
  const [skip, setSkip] = useState(1);

  useEffect(() => {
    handlePaginationChange(skip);
  }, [skip]);

  return (
    <>
      <div className={classes.container}>
        <Table className={classes.table}>
          <TableHead className={classes.darkRow}>
            <TableRow>
              <TableCell>CALL TYPE</TableCell>
              <TableCell>DIRECTION</TableCell>
              <TableCell>DURATION</TableCell>
              <TableCell>FROM</TableCell>
              <TableCell>TO</TableCell>
              <TableCell>VIA</TableCell>
              <TableCell>CREATED AT</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calls.map((call: call) => {
              return (
                <TableRow key={call.id}>
                  {" "}
                  <TableCell className={classes.capitalize}>
                    <span
                      className={
                        call.call_type === "voicemail"
                          ? classes.blueText
                          : call.call_type === "answered"
                          ? classes.greenText
                          : classes.redText
                      }
                    >
                      {call.call_type}
                    </span>
                  </TableCell>
                  <TableCell className={classes.capitalize}>
                    <span className={classes.blueText}> {call.direction}</span>
                  </TableCell>
                  <TableCell>
                    <div className={classes.durationContainer}>
                      <div>{formatDuration(call.duration)}</div>
                      <div className={classes.blueText}>
                        {"( " + call.duration + " seconds)"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{call.from}</TableCell>
                  <TableCell>{call.to}</TableCell>
                  <TableCell>{call.via}</TableCell>
                  <TableCell>{formatDate(call.created_at)}</TableCell>
                  <TableCell>
                    <div
                      className={
                        call.is_archived ? classes.archived : classes.unArchive
                      }
                    >
                      {call.is_archived ? "Archived" : "Not Archived"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={classes.btn}
                      onClick={() => {
                        handleAddNote(call.id);
                      }}
                    >
                      Add Note
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className={classes.paginationContainer}>
        {" "}
        <Pagination
          color="primary"
          shape="rounded"
          count={Math.ceil(+totalCalls / 10)}
          onChange={(e, newPage) => {
            setSkip((newPage - 1) * 10);
          }}
        />
      </div>
      <div className={classes.paginationToast}>
        {1 +
          skip +
          " - " +
          (skip + 10 < totalCalls ? skip + 10 : totalCalls) +
          " of " +
          totalCalls}{" "}
        results{" "}
      </div>
    </>
  );
}
export default withStyles(styles)(TableComponent);
