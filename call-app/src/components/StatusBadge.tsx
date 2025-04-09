"use client";
import { Chip, Tooltip, CircularProgress, Box } from "@mui/material";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ARCHIVE_CALL } from "@/features/calls/graphql/calls";

interface StatusBadgeProps {
  isArchived: boolean;
  callId: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  isArchived,
  callId,
}) => {
  const [archiveCall, { loading }] = useMutation(ARCHIVE_CALL);
  const [localArchived, setLocalArchived] = useState(isArchived);

  const handleToggleArchive = async () => {
    try {
      const { data } = await archiveCall({ variables: { id: callId } });
      if (data?.archiveCall) {
        setLocalArchived(data.archiveCall.is_archived);
      }
    } catch (error) {
      console.error("Failed to toggle archive state", error);
    }
  };

  return (
    <Tooltip title={localArchived ? "Unarchive" : "Archive"} arrow>
      <Box>
        <Chip
          label={
            loading ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <CircularProgress size={16} color="inherit" />
              </Box>
            ) : localArchived ? (
              "Archived"
            ) : (
              "Unarchive"
            )
          }
          size="small"
          onClick={handleToggleArchive}
          clickable={!loading}
          disabled={loading}
          sx={{
            width: 100,
            height: 28,
            backgroundColor: localArchived ? "#E6F4EA" : "#F0F0F0",
            color: localArchived ? "#2E7D32" : "#6B7280",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: localArchived ? "#D4EEDF" : "#E0E0E0",
            },
          }}
        />
      </Box>
    </Tooltip>
  );
};
