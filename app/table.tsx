"use client";

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import toast from "react-hot-toast";
import { FaAngleDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Pagination from "./pagination";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import moment from "moment";
import PageNumber from "./pageNumber";

type apiDataType = {
  id: string;
  direction: string;
  from: string;
  to: string;
  duration: number;
  is_archived: boolean;
  call_type: string;
  via: string;
  created_at: string;
  notes: [];
};

const ApiData = () => {
  const { data: session } = useSession();
  const [info, setInfo] = useState([]);
  const axiosAuth = useAxiosAuth();
  const [selectedRow, setSelectedRow] = useState<apiDataType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosAuth.get("/calls?offset=10&limit=90", {
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        });
        const sortedData = response.data.nodes.sort(
          (a: any, b: any) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        console.log("Sorted : ", sortedData);
        setInfo(sortedData);
        console.log("Information: ", info);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPost();
  });

  const handleRowClick = (params: any) => {
    setSelectedRow(params.row);
    setIsModalOpen(true);
  };

  const handleFilterChange = (event: any) => {
    const value = event.target.value;
    const newFilterValue = value === "All" ? null : value;
    setFilterValue(newFilterValue);
  };

  const filteredInfo = filterValue
    ? info.filter(
        (item: any) => item.is_archived === (filterValue === "Archived")
      )
    : info;

  const lastItemIndex = Math.min(
    currentPage * itemsPerPage,
    filteredInfo.length
  );
  const firstItemIndex = Math.max(lastItemIndex - itemsPerPage, 0);

  console.log("First Index ", firstItemIndex);
  console.log("Last Index ", lastItemIndex);

  const displayedInfo = filteredInfo.slice(firstItemIndex, lastItemIndex);

  const handleNoteChange = (event: any) => {
    setNoteContent(event.target.value);
  };

  const postNote = async () => {
    if (!selectedRow || !noteContent) {
      return;
    }

    try {
      const response = await axiosAuth.post(`/calls/${selectedRow.id}/note`, {
        content: noteContent,
      });

      setNoteContent("");
      toast.success("Note Added Successfully!");
      handleCloseModal();
    } catch (error) {
      toast.error("Note Adding Failed!");
      console.error("Error posting note:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getCallTypeColor = (callType: string) => {
    switch (callType) {
      case "voicemail":
        return "blue";
      case "answered":
        return "#2196f3";
      case "missed":
        return "red";
      default:
        return "black";
    }
  };

  const updateStatus = async (id: string, status: boolean) => {
    try {
      const response = await axiosAuth.put(`/calls/${id}/archive`, {
        is_archived: status,
      });
      toast.success("Call Status Updated Successfully!");
      console.log("Status Updated:", response.data);
    } catch (error) {
      toast.error("Call Status Updation Failed!");
      console.error("Error in Status Updation", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "call_type",
      width: 146,
      headerClassName: "super-app-theme--header",
      renderHeader: (params: any) => {
        return (
          <div
            style={{
              color: "black",
              fontSize: "12.5px",
              textTransform: "uppercase",
              fontWeight: "bold",
              paddingLeft: "8px",
            }}
          >
            Call Type
          </div>
        );
      },
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ) => {
        const { value } = params;
        return (
          <div
            style={{
              color: getCallTypeColor(value),
              textTransform: "capitalize",
              fontSize: "12px",
              paddingLeft: "15px",
            }}
          >
            {value}
          </div>
        );
      },
    },
    {
      field: "direction",
      width: 138,
      headerClassName: "super-app-theme--header",
      renderHeader: (params: any) => {
        return (
          <div
            style={{
              color: "black",
              fontSize: "12.5px",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Direction
          </div>
        );
      },
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ) => {
        const { value } = params;
        return (
          <div
            style={{
              color: "blue",
              fontSize: "12px",
              textTransform: "capitalize",
            }}
          >
            {value}
          </div>
        );
      },
    },
    {
      field: "duration",
      headerClassName: "super-app-theme--header",
      renderHeader: (params: any) => {
        return (
          <div
            style={{
              color: "black",
              fontSize: "12.5px",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Duration
          </div>
        );
      },
      width: 190,
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ) => {
        const { value } = params;
        const durationInSeconds = value;
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;

        return (
          <div style={{ fontSize: "13px" }}>
            <div
              style={{ color: "black" }}
            >{`${minutes} minutes ${seconds} seconds`}</div>
            <div
              style={{ color: "blue", marginTop: "8px" }}
            >{`(4823 seconds)`}</div>
          </div>
        );
      },
    },
    {
      field: "from",
      headerClassName: "super-app-theme--header",
      renderHeader: (params: any) => {
        return (
          <div
            style={{
              color: "black",
              fontSize: "12.5px",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            From
          </div>
        );
      },
      width: 131,
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ) => {
        const { value } = params;
        return (
          <div
            style={{
              color: "black",
            }}
          >
            {value}
          </div>
        );
      },
    },
    {
      field: "to",
      headerClassName: "super-app-theme--header",
      renderHeader: (params: any) => {
        return (
          <div
            style={{
              color: "black",
              fontSize: "12.5px",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            TO
          </div>
        );
      },
      width: 131,
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ) => {
        const { value } = params;
        return (
          <div
            style={{
              color: "black",
            }}
          >
            {value}
          </div>
        );
      },
    },
    {
      field: "via",
      headerClassName: "super-app-theme--header",
      renderHeader: (params: any) => {
        return (
          <div
            style={{
              color: "black",
              fontSize: "12.5px",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            VIA
          </div>
        );
      },
      width: 131,
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ) => {
        const { value } = params;
        return (
          <div
            style={{
              color: "black",
            }}
          >
            {value}
          </div>
        );
      },
    },
    {
      field: "created_at",
      headerClassName: "super-app-theme--header",
      renderHeader: (params: any) => {
        return (
          <div
            style={{
              color: "black",
              fontSize: "12.5px",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Created At
          </div>
        );
      },
      width: 140,
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ) => {
        const { value } = params;
        const formattedDate = moment(value).format("DD-MM-YYYY");
        return (
          <div
            style={{
              fontSize: "12.5px",
              color: "black",
            }}
          >
            {formattedDate}
          </div>
        );
      },
    },
    {
      field: "is_archived",
      renderHeader: (params: any) => {
        return (
          <div
            style={{
              color: "black",
              fontSize: "12.5px",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Status
          </div>
        );
      },
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ) => {
        const { value } = params;
        const isArchived = value;

        return (
          <Button
            style={{
              backgroundColor: isArchived ? "#e1f5fe" : "#e0e0e0",
              color: isArchived ? "#64b5f6" : "gray",
              fontSize: "11.5px",
              textTransform: "capitalize",
              width: "80px",
              fontWeight: "bold",
            }}
            onClick={() => updateStatus(params.row.id, !isArchived)}
          >
            {isArchived ? "Archived" : "Unarchive"}
          </Button>
        );
      },
    },
    {
      field: "notes",
      renderHeader: (params: any) => {
        return (
          <div
            style={{
              color: "black",
              fontSize: "12.5px",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Actions
          </div>
        );
      },
      width: 130,
      headerClassName: "super-app-theme--header",
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ) => {
        const { value } = params;
        const notes = value;
        return (
          <Button
            style={{
              backgroundColor: "blue",
              color: "white",
              fontSize: "12px",
              textTransform: "capitalize",
              width: "80px",
            }}
          >
            Add Note
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Box
        width="95%"
        marginX="auto"
        sx={{
          "& .super-app-theme--header": {
            backgroundColor: "#F4F4F9",
          },
        }}
      >
        <Box display="flex" alignItems="center" marginBottom={4} marginTop={4}>
          <span style={{ color: "gray.800", fontSize: "13.5px" }}>
            Filter by:
          </span>
          <Select
            value={filterValue || "Status"}
            onChange={handleFilterChange}
            style={{
              marginLeft: "8px",
              backgroundColor: "white",
              fontSize: "14px",
              color: "blue",
              padding: "0",
            }}
            IconComponent={FaAngleDown}
            renderValue={(value) => value}
            inputProps={{ style: { border: "none" } }}
            SelectDisplayProps={{
              style: { border: "none", outline: "none", boxShadow: "none" },
            }}
          >
            <MenuItem
              value="All"
              style={{
                fontSize: "13px",
                width: "170px",
              }}
            >
              All
            </MenuItem>
            <MenuItem
              value="Archived"
              style={{
                fontSize: "13px",
                width: "170px",
              }}
            >
              Archived
            </MenuItem>
            <MenuItem
              value=" Unarchived"
              style={{
                fontSize: "13px",
                width: "170px",
              }}
            >
              Unarchived
            </MenuItem>
          </Select>
        </Box>

        <DataGrid
          rows={displayedInfo}
          columns={columns}
          onRowClick={handleRowClick}
        />

        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogTitle
            sx={{
              borderBottom: "1px solid #e0e0e0",
              marginBottom: "20px",
            }}
          >
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent="space-between"
              width="340px"
            >
              <Box>
                <div
                  style={{
                    color: "black",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Add Notes
                </div>
              </Box>
              <Button onClick={handleCloseModal}>
                <IoClose style={{ color: "blue", fontSize: "1.5rem" }} />
              </Button>
            </Box>
            <div
              style={{
                color: "blue",
                fontSize: "12px",
              }}
            >
              Call ID {selectedRow?.id}
            </div>
          </DialogTitle>

          <DialogContent
            sx={{
              borderBottom: "1px solid #e0e0e0",
              marginBottom: "25px",
              paddingBottom: "0",
            }}
          >
            <Box display="flex" alignItems="center">
              <Box width="80px">
                <div
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                  }}
                >
                  Call Type
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                  }}
                >
                  Duration
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                  }}
                >
                  From
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                  }}
                >
                  To
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                  }}
                >
                  Via
                </div>
              </Box>

              <Box>
                <div
                  style={{
                    color: "blue",
                    fontSize: "14px",
                    marginBottom: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {selectedRow?.call_type}
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "14px",
                    marginBottom: "12px",
                  }}
                >
                  {selectedRow
                    ? `${Math.floor(selectedRow.duration / 60)} minutes ${
                        selectedRow.duration % 60
                      } seconds`
                    : ""}
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "14px",
                    marginBottom: "12px",
                  }}
                >
                  {selectedRow?.from}
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "14px",
                    marginBottom: "12px",
                  }}
                >
                  {selectedRow?.to}
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "14px",
                    marginBottom: "12px",
                  }}
                >
                  {selectedRow?.via}
                </div>
              </Box>
            </Box>

            <Stack style={{ marginBottom: "15px" }}>
              <div
                style={{
                  color: "black",
                  fontSize: "14px",
                  marginTop: "12px",
                  marginBottom: "6px",
                }}
              >
                Notes
              </div>

              <TextField
                id="filled-multiline-static"
                multiline
                rows={4}
                placeholder="Add Notes"
                inputProps={{
                  style: {
                    fontSize: "13px",
                    color: "black",
                  },
                }}
                value={noteContent}
                onChange={handleNoteChange}
              />
            </Stack>
          </DialogContent>
          <Button
            style={{
              backgroundColor: "blue",
              color: "white",
              fontSize: "14px",
              textTransform: "capitalize",
              width: "340px",
              marginBottom: "20px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onClick={postNote}
          >
            Save
          </Button>
        </Dialog>
      </Box>

      <Box width="100%">
        <Pagination
          totalPageCount={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>

      <PageNumber
        firstIndex={firstItemIndex + 1}
        lastIndex={lastItemIndex + 1}
        totalIndex={91}
      />
    </>
  );
};

export default ApiData;
