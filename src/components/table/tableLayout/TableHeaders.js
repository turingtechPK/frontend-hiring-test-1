import { TableCell, TableHead, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  tableHeader: {
    fontFamily: "Avenir-Bold",
    fontSize: "16px",
    lineHeight: "24px",
    fontStyle: "normal",
    fontWeight: "bold",
    textAlign: "center",
  },
}));

function TableHeaders() {
  const classes = useStyles();
  return (
    <TableHead sx={{ background: "#f4f4f9" }}>
      <TableRow>
        <TableCell className={classes.tableHeader}>Call type</TableCell>
        <TableCell className={classes.tableHeader} align="right">
          Direction
        </TableCell>
        <TableCell className={classes.tableHeader} align="right">
          Duration
        </TableCell>
        <TableCell className={classes.tableHeader} align="right">
          FROM
        </TableCell>
        <TableCell className={classes.tableHeader} align="right">
          TO
        </TableCell>
        <TableCell className={classes.tableHeader} align="right">
          VIA
        </TableCell>
        <TableCell className={classes.tableHeader} align="right">
          CREATED AT
        </TableCell>
        <TableCell className={classes.tableHeader} align="right">
          STATUS
        </TableCell>
        <TableCell className={classes.tableHeader} align="right">
          ACTIONS
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeaders;
