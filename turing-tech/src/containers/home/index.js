import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PAGINATED_DATA, GET_RECORD_BY_ID } from "../../graphql";
import { useEffect } from "react";
import { StyledContentContainer, StyledWrapper } from "./styles";
import { DataTable, Heading } from "../../components";
import Box from "@mui/material/Box";
import { startCase } from "lodash";
import { Grid, Button } from "@mui/material";
import colors from "../../colors";
import { formatDate } from "../../utils";
import { useDialogFunctions } from "../../hooks";
import { AddNote } from "../add-note";

export const formatDuration = (seconds) => {
  if (typeof seconds !== "number" || isNaN(seconds) || seconds < 0) {
    return "Invalid input";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesText =
    minutes > 0 ? `${minutes} minute${minutes !== 1 ? "s" : ""}` : "";
  const secondsText =
    remainingSeconds > 0
      ? `${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`
      : "";

  const separator = minutesText && secondsText ? " and " : "";

  return `${minutesText}${separator}${secondsText}`;
};

export const HomeContainer = () => {
  const accessToken = localStorage.getItem("access-token");
  const [tableData, setTableData] = useState([]);
  const [fetchData, { data, loading, error }] =
    useLazyQuery(GET_PAGINATED_DATA);

  const [rowCount, setRowCount] = useState(0);

  const { onShowDialog } = useDialogFunctions({
    initialValues: {
      call_type: null,
      duration: null,
      from: null,
      id: null,
      to: null,
      via: null,
    },
    query: GET_RECORD_BY_ID,
    queryName: "call",
    queryMapper: (res) => ({
      call_type: res?.call_type,
      duration: res?.duration,
      from: res?.from,
      id: res?.id,
      to: res?.to,
      via: res?.via,
    }),
    dialogConfig: {
      header: "Add Notes",
      component: AddNote,
      primaryButtonText: "Save",
    },
  });

  const addNote = (params) => {
    onShowDialog({ id: params?.id }, true);
  };

  useEffect(() => {
    accessToken && fetchData();
  }, [accessToken]);

  const columns = [
    {
      field: "call_type",
      headerName: "CALL TYPE",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const textColor =
          params?.value === "missed"
            ? colors.red
            : params?.value === "answered"
            ? colors.green
            : colors.blue;

        return (
          <div style={{ color: textColor }}>{startCase(params?.value)}</div>
        );
      },
    },
    {
      field: "direction",
      headerName: "DIRECTION",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => startCase(params?.value),
    },
    {
      field: "duration",
      headerName: "DURATION",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <Grid container alignItems={"center"} justifyContent={"center"}>
          <Grid item>{formatDuration(params?.value)}</Grid>
          <Grid
            item
            sx={{ color: colors.blue }}
          >{`${params?.value} Seconds`}</Grid>
        </Grid>
      ),
    },
    { field: "from", headerName: "FROM", minWidth: 100, flex: 1 },
    { field: "to", headerName: "TO", minWidth: 100, flex: 1 },
    { field: "via", headerName: "VIA", minWidth: 100, flex: 1 },
    {
      field: "created_at",
      headerName: "CREATED AT",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => formatDate(params?.value),
    },
    {
      field: "is_archived",
      headerName: "STATUS",
      minWidth: 100,
      flex: 1,
      renderCell: (params) =>
        params?.value ? (
          <Grid
            sx={{
              backgroundColor: "#edfbfa",
              color: "#75ded3",
              borderRadius: "5px",
              padding: "5px 8px",
            }}
          >
            {"Archived"}
          </Grid>
        ) : (
          <Grid
            sx={{
              backgroundColor: "#eeeeee",
              color: "#929292",
              borderRadius: "5px",
              padding: "5px 8px",
            }}
          >
            {"Unarchived"}
          </Grid>
        ),
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <Button
          onClick={() => addNote(params)}
          sx={{
            backgroundColor: "#4f46f8",
            color: "white",
            fontSize: "12px",
            paddingLeft: "20px",
            paddingRight: "20px",
            textTransform: "initial",
          }}
          variant="contained"
        >
          Add Note
        </Button>
      ),
    },
  ];

  useEffect(() => {
    if (!loading && !error && data) {
      setTableData(data?.paginatedCalls?.nodes);
      setRowCount(data?.paginatedCalls?.totalCount);
    }
  }, [loading, data]);

  return (
    <StyledWrapper>
      <StyledContentContainer>
        <Heading heading={"Turing Technologies Frontend Test"} />
        <DataTable
          id={"turing-data"}
          columns={columns}
          data={tableData ?? []}
          headerColor={'"#4f46f8"'}
          rowCount={rowCount}
        />
        <Box sx={{ height: 520, width: "100%" }}></Box>
      </StyledContentContainer>
    </StyledWrapper>
  );
};
