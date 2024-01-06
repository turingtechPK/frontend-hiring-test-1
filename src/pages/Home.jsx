import { useCallback, useEffect, useState } from "react";
import Pusher from 'pusher-js';
import moment from "moment";
import Typography from "@mui/material/Typography";
import Header from "../components/Layout/Header"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FlexColumn, FlexRow } from "../components/Flex/Flex";
import { DataGrid } from "@mui/x-data-grid";
import { capitalizeFirstLetter, convertSecondsToMinutesAndSeconds } from "../utils/converter";
import { useDispatch, useSelector } from "react-redux";
import { getCalls } from "../redux/actions/call";
import Pagination from "../components/UI/Pagination/Pagination";
import { toast } from "react-toastify";
import NotesModal from "../components/Modal/NotesModal";
import StatusModal from "../components/Modal/StatusModal";
import { Tooltip } from "@mui/material";
import { config } from "../config";

const dataGridStyle = {
  "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
    outline: "none"
  },
  "&:hover:not(.Mui-disabled)": {
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.04)"
  },
  ".css-1psng7p-MuiTablePagination-spacer": {
    flex: "none"
  }
};

const Home = () => {
  const dispatch = useDispatch();
  const { callLoading, calls, callError } = useSelector((state) => state.calls);
  const [openModal, setOpenModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [callId, setCallId] = useState("")
  const [statusId, setStatusId] = useState("")
  const [pageNo, setPageNo] = useState(0);
  const [selectedValue, SetSelectedValue] = useState("All");
  const pageSize = 10;
  const totalPages = Math.ceil(calls?.totalCount / pageSize);

  useEffect(() => {
    dispatch(getCalls(pageNo, pageSize));
    if (callError) {
      toast.error(`${callError}`)
    }
  }, [dispatch, pageNo]);

  useEffect(() => {
    const pusher = new Pusher('d44e3d910d38a928e0be', {
      cluster: 'eu',
      authEndpoint: `${config.BACKEND_BASE_URL}/pusher/auth`
    });

    const channel = pusher.subscribe('private-aircall');

    channel.bind('update-call', (data) => {
      console.log('Real-time update received:', data);
    });

    return () => {
      channel.unbind('update-call');
      pusher.unsubscribe('private-aircall');
    };
  }, []);


  const filteredRows = calls?.nodes?.filter((row) => {
    if (selectedValue === "All") {
      return true;
    } else {
      return selectedValue === "Archived" ? row.is_archived : !row.is_archived;
    }
  });

 const handleAddNote = useCallback((id) => {
  setCallId(id);
  setOpenModal(true);
}, []);

const handleStatus = useCallback((id) => {
  setStatusId(id);
  setOpenStatusModal(true);
}, []);

  const columns = [
    {
      headerName: 'CALL TYPE', field: 'call_type', flex: 1,
      renderCell: (params) => {
        const callType = params.row.call_type;
        let customCallText = ""
        let customCallColor = ""
        if (callType === "voicemail") {
          customCallText = "Voice Mail";
          customCallColor = "blue"
        }
        else if (callType === "answered") {
          customCallText = "Answered";
          customCallColor = "#1DC9B7"
        }
        else if (callType === "missed") {
          customCallText = "Missed";
          customCallColor = "#C91D3E"
        }
        return (
          <Box color={customCallColor}>
            {customCallText}
          </Box>
        )
      }
    },
    {
      headerName: 'DIRECTION', field: 'direction', flex: 1, renderCell: (params) => {
        const firstChar = params.row.direction ? capitalizeFirstLetter(params.row.direction) : '';
        return (
          <Box color="blue">{firstChar}</Box>

        )
      }
    },
    {
      headerName: 'DURATION', field: 'duration', flex: 1.5,
      renderCell: (params) => {
        let duration = params.row.duration;
        let secondsToMinutes = convertSecondsToMinutesAndSeconds(duration)
        return (
          <FlexColumn>
            <Box>{secondsToMinutes}</Box>
            <Box color={"blue"}>{`(${duration} seconds)`}</Box>
          </FlexColumn>
        )
      }
    },
    { headerName: 'FROM', field: 'from', flex: 1 },
    { headerName: 'TO', field: 'to', flex: 1 },
    { headerName: 'VIA', field: 'via', flex: 1 },
    {
      headerName: 'CREATED AT', field: 'created_at', flex: 1,
      renderCell: (params) => {
        const formattedDate = params.value ? moment(params.value).format('YYYY-MM-DD') : '';
        return (
          <Box>{formattedDate}</Box>
        );
      }
    },
    {
      headerName: "STATUS",
      field: "status",
      renderCell: (params) => {
        const status = params.row.is_archived;
        let bgColor = "";
        let fontColor = "";
        let text = ""

        if (status) {
          text = "Archived"
          bgColor = "#EDFBF9"
          fontColor = "#1DC9B7"
        } else {
          text = "Unarchive"
          bgColor = "#eee"
          fontColor = "#727272"
        }

        return (
          <Tooltip title="change status">
            <Box
              backgroundColor={bgColor}
              paddingX={1}
              paddingY={0.5}
              borderRadius={0.5}
              color={fontColor}
              onClick={() => handleStatus(params?.row?.id)}
            >
              {text}
            </Box>
          </Tooltip>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "ACTIONS",
      flex: 1,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <Button key={row?.id} variant="contained" size="small" onClick={() => handleAddNote(row?.id)}>Add Note</Button>
        ];
      },
    }
  ]



  return (
    <>
      <Header />
      <FlexColumn padding={4} height={"auto"} gap={2}>
        {/* Heading */}
        <Typography variant="h5">Turing Technologies Frontend Test</Typography>
        {/* Filter */}
        <FlexRow gap={1} width={200} >
          <Typography>Filter by:</Typography>
          <FormControl variant="standard" size="small" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedValue}
              onChange={e => SetSelectedValue(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Archived">Archived</MenuItem>
              <MenuItem value="Unarchived">Unarchived</MenuItem>
            </Select>
          </FormControl>

        </FlexRow>
        {/* Table */}

        <Grid container direction={"row"} width='100%'>
          <Grid item md={12} lg={12} width='100%'>


            <div style={{ display: 'flex', marginTop: "1.5%" }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  loading={callLoading}
                  columns={columns}
                  rows={filteredRows || []}
                  autoHeight={true}
                  onPageChange={(newPage) => setPageNo(newPage)}
                  pageSize={pageSize}
                  page={pageNo}
                  sx={dataGridStyle}
                />
              </div>
            </div>

          </Grid>
        </Grid>

        {/* Pagination */}
        <Pagination pageNo={pageNo} setPageNo={setPageNo} totalPages={totalPages} />
        {/* Results */}
        {openModal && <NotesModal open={openModal} setOpen={setOpenModal} callId={callId} />}
        {openStatusModal && <StatusModal open={openStatusModal} setOpen={setOpenStatusModal} id={statusId} pageNo={pageNo} pageSize={pageSize} />}

      </FlexColumn>
    </>
  )
}

export default Home