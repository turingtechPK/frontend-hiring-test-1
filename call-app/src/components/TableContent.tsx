import {
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { StatusBadge } from "./StatusBadge";
import { Call } from "@/types";
import { useRouter } from "next/navigation";
import { AddComment, Visibility } from "@mui/icons-material";
import { formatDuration, getCallTypeColor, groupCallsByDate } from "@/helper";

interface TableContentProps {
  filteredCalls: Call[];
  onAddNote: (callId: string) => void;
}

const TableContent = ({ filteredCalls, onAddNote }: TableContentProps) => {
  const router = useRouter();

  const groupedCalls = groupCallsByDate(filteredCalls);

  return (
    <>
      {groupedCalls.map(([date, calls]) => (
        <React.Fragment key={date}>
          {/* <TableRow>
            <TableCell
              colSpan={9}
              sx={{
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
                py: 1,
              }}
            >
              <Typography variant="subtitle2">{date}</Typography>
            </TableCell>
          </TableRow> */}

          {calls.map((call: Call) => (
            <TableRow key={call.id} hover sx={{ cursor: "pointer" }}>
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    textTransform: "capitalize",
                    color: getCallTypeColor(call.call_type),
                  }}
                >
                  {call.call_type}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    textTransform: "capitalize",
                    color: "#5071EA",
                  }}
                >
                  {call.direction}
                </Typography>
              </TableCell>
              <TableCell>{formatDuration(call.duration)}</TableCell>
              <TableCell>{call.from}</TableCell>
              <TableCell>{call.to}</TableCell>
              <TableCell>{call.via}</TableCell>
              <TableCell>
                {new Date(call.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <StatusBadge isArchived={call.is_archived} callId={call.id} />
              </TableCell>
              <TableCell>
                <Tooltip title="Add Note" arrow>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddNote(call.id);
                    }}
                    sx={{ color: "#5071EA" }}
                  >
                    <AddComment />
                  </IconButton>
                </Tooltip>

                <Tooltip title="View Details" arrow>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/calls/${call.id}`);
                    }}
                    sx={{ color: "gray" }}
                  >
                    <Visibility />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </React.Fragment>
      ))}

      {/* no calls available */}
      {filteredCalls.length === 0 && (
        <TableRow>
          <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
            <Typography variant="body1" color="textSecondary">
              No calls available for the selected filter.
            </Typography>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TableContent;
