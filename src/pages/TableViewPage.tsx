import React, { useEffect, useState } from "react";
import Dropdown from "../components/dropdown";
import { Box, Typography } from "@mui/material";
import CallTable from "../components/table";
import { CallResponse, CallStateRaw } from "../state/types";
import TablePagination from "../components/table/tablePagination";
import ModalContainer from "../container/modalContainer";
import { API_KEY, APP_AUTH_ENDPOINT, CLUSTER } from "../utils/constants";
import Pusher from "pusher-js";
interface IProps {
  tableData: CallResponse;
  archiveCall: (id: string) => Promise<void>;
  fetchCalls: (currentPage: number) => Promise<void>;
  updateData: (data: CallStateRaw[]) => Promise<void>;
}

const TableViewPage: React.FC<IProps> = ({
  tableData,
  archiveCall,
  fetchCalls,
  updateData,
}) => {
  const [status, setStatus] = useState<boolean | string>("All");
  const [data, setData] = useState<CallStateRaw[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [item, setItem] = useState<CallStateRaw | undefined>();

  useEffect(() => {
    let sortedData = [...tableData.nodes];
    if (status !== "All") {
      sortedData = sortedData.filter((item) => item.is_archived === status);
    }
    sortedData.sort(
      (a, b) =>
        new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf()
    );

    setData(sortedData);
  }, [status, tableData]);

  useEffect(() => {
    Pusher.logToConsole = true;
    //pusher for real-time data update
    const pusher = new Pusher(API_KEY, {
      cluster: CLUSTER, //should be moved to env
      channelAuthorization: {
        endpoint: APP_AUTH_ENDPOINT,
        transport: "ajax",
      },
    });
    const privateChannel = pusher.subscribe("private-aircall");

    privateChannel.bind("update-call", function (data: any) {
      updateData(data);
    });

    return () => {
      pusher.unsubscribe("private-aircall");
    };
  }, []);

  const fetchMoreData = (page: number) => {
    fetchCalls(page);
  };

  return (
    <Box sx={{ mx: "24px" }}>
      <Typography
        variant="h5"
        sx={{ textAlign: "left", marginTop: "3rem", marginBottom: "1rem" }}
      >
        Turing Technologies  | Frontend Test | Fahad Khawaja
      </Typography>
      <Dropdown status={status} setStatus={setStatus} />
      <CallTable
        tableData={data as CallStateRaw[]}
        setVisible={setVisible}
        setItem={setItem}
        archiveCall={(id) => archiveCall(id)}
      />

      <ModalContainer
        visible={visible}
        setVisible={setVisible}
        data={item as CallStateRaw}
        onClose={() => setVisible(false)}
      />
      <TablePagination
        totalCount={tableData.totalCount}
        hasNextPage={tableData.hasNextPage}
        fetchMoreData={(page: number) => fetchMoreData(page)}
      />
    </Box>
  );
};

export default TableViewPage;
