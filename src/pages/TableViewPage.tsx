import React, { useEffect, useState } from "react";
import Dropdown from "../components/dropdown";
import { Box, Typography } from "@mui/material";
import CallTable from "../components/table";
import { CallResponse, CallStateRaw } from "../state/types";
import TablePagination from "../components/table/tablePagination";
import AddNoteModal from "../components/addNoteModal";
import ModalContainer from "../container/modalContainer";

interface IProps {
  tableData: CallResponse;
}

const TableViewPage: React.FC<IProps> = ({ tableData }) => {

  const [status, setStatus] = useState<boolean | String>("All");
  const [data, setData] = useState<CallStateRaw[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [item, setItem] = useState<CallStateRaw | undefined>();
  console.log("table view page: ", visible);

  useEffect(() => {
    if (status === "All") {
      setData(tableData.nodes);
    } else {
      const filteredData = tableData.nodes.filter(
        (item) => item.is_archived === status
      );
      setData(filteredData);
    }
  }, [status]);

  return (
    <Box sx={{ mx: "24px" }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "left", marginTop: "3rem", marginBottom: "1rem" }}
      >
        Turing Technologies Frontend Test Fahad Khawaja
      </Typography>
      <Dropdown status={status} setStatus={setStatus} />
      {/* filter data here */}
      <CallTable
        tableData={data as CallStateRaw[]}
        setVisible={setVisible}
        setItem={setItem}
      />

      <ModalContainer
        visible={visible}
        setVisible={setVisible}
        data={item as CallStateRaw}
        onClose={() => setVisible(false)}
      />
      <TablePagination />
    </Box>
  );
};

export default TableViewPage;
