import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

const Archived = ({ data, accessToken }) => {
  const handleClick = () => {
    console.log(data.id);
    // .get(`${baseApi}/calls`, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    axios.put(
      `https://frontend-test-api.aircall.io/calls/:${data.id}/archive`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };
  return (
    <Box sx={{ "&:hover": { cursor: "pointer" } }} onClick={handleClick}>
      {data.is_archived === true ? (
        <Box style={styles.archivedContainer}>
          <Typography variant="subtitle2" style={styles.archived}>
            Archived
          </Typography>
        </Box>
      ) : (
        <Box style={styles.unArchivedContainer}>
          <Typography variant="subtitle2" style={styles.unArchived}>
            Unarchive
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Archived;

const styles = {
  archivedContainer: {
    backgroundColor: "#edfbfa",
    padding: "5px",
  },
  archived: {
    color: "#1dc9b7",
    display: "flex",
    justifyContent: "center",
  },
  unArchivedContainer: {
    backgroundColor: "#eeeeee",
    padding: "5px",
  },
  unArchived: {
    display: "flex",
    justifyContent: "center",
  },
};
