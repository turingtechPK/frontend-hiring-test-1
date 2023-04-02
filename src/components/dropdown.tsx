import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Box, Typography, MenuItem, Menu, Button } from "@mui/material";

interface IProps {
  status: String | boolean;
  setStatus: React.Dispatch<React.SetStateAction<String | boolean>>;
}

const Dropdown: React.FC<IProps> = ({ status, setStatus }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginLeft: "1rem",
        marginBottom: "1rem",
        marginTop: "1rem",
      }}
    >
      <Typography variant="body1">Filter by:</Typography>
      <Button
        sx={{
          color: "#5950F8",
          textTransform: "none",
          textDecoration: "none",
          minWidth: "auto",
          paddingLeft: "15px",
          fontWeight: "bold",
        }}
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>
            {status === "All" ? "Status" : status ? "Archived" : "Unarchived"}
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: "black" }} />
        </Box>
      </Button>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "customized-menu",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          sx={{
            minWidth: "200px",
            "&:hover": {
              backgroundColor: "#D8CFFC",
              color: "#5950F8",
            },
          }}
          onClick={() => {
            setStatus("All");
            handleClose();
          }}
        >
          All
        </MenuItem>
        <MenuItem
          sx={{
            minWidth: "200px",
            "&:hover": {
              backgroundColor: "#D8CFFC",
              color: "#5950F8",
            },
          }}
          onClick={() => {
            setStatus(true);
            handleClose();
          }}
        >
          Archived
        </MenuItem>
        <MenuItem
          sx={{
            minWidth: "200px",
            "&:hover": {
              backgroundColor: "#D8CFFC",
              color: "#5950F8",
            },
          }}
          onClick={() => {
            setStatus(false);
            handleClose();
          }}
        >
          Unarchived
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Dropdown;
