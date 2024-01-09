import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { getCalls } from "../../services/apis/api";

import PaginationComponent from "../Pagination/PaginationComponent";
import { ActionsButton } from "../Buttons";
import { PaginatedCalls, Row } from "../../types";
import AddNotesModal from "../AddNotesModal";
import { stylesMui } from "./styles";
import { formatDuration } from "../../utils/formatDuration";

interface DataTableProps {
  selectedFilter: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ selectedFilter }) => {
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [calls, setCalls] = useState<Row[]>([]);

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  const filteredRows = selectedFilter
    ? calls.filter((row) => row.is_archived === selectedFilter)
    : calls;

  const handleAction = (row: Row) => {
    setSelectedRow(row);
  };

  const columns: GridColDef[] = [
    {
      field: "call_type",
      headerName: "CALL TYPE",
      width: 150,
      editable: false,
      renderCell: (params) => {
        let textColor;

        if (params.row.call_type === "answered") {
          textColor = "green";
        } else if (params.row.call_type === "missed") {
          textColor = "red";
        } else {
          textColor = "blue";
        }

        return (
          <div style={{ color: textColor, textTransform: "capitalize" }}>
            {params.row.call_type}
          </div>
        );
      },
    },
    {
      field: "direction",
      headerName: "DIRECTION",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <div style={{ color: "blue", textTransform: "capitalize" }}>
          {params.row.direction}
        </div>
      ),
    },
    {
      field: "duration",
      headerName: "DURATION",
      width: 150,
      editable: false,
      renderCell: (params) => <div>{formatDuration(params.row.duration)}</div>,
    },
    {
      field: "from",
      headerName: "FROM",
      width: 250,
      editable: false,
    },
    {
      field: "to",
      headerName: "TO",
      width: 250,
      editable: false,
    },
    {
      field: "via",
      headerName: "VIA",
      type: "number",
      width: 110,
      editable: false,
    },
    {
      field: "created_at",
      headerName: "CREATED AT",
      width: 110,
      editable: false,
      renderCell: (params) => (
        <div>{dayjs(params.row.created_at).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      field: "is_archived",
      headerName: "STATUS",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Button
          sx={{
            textTransform: "capitalize",
            color: params.row.is_archived ? "#1DC9B7" : "#B5B5B5",
            backgroundColor: params.row.is_archived ? "#EDFBFA" : "#EEEEEE",
          }}
        >
          {params.row.is_archived ? "Archived" : "Unarchive"}
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <ActionsButton
          onClick={() => handleAction(params.row)}
          row={params.row}
        />
      ),
    },
  ];

  // calls from API when component mounts or selectedFilter changes or when call note updated
  useEffect(() => {
    fetchCalls();
  }, [selectedFilter]);

  const fetchCalls = async (page: number = 1) => {
    try {
      const offset = (page - 1) * 10; // keeping 10 items per page
      const limit = 10;

      const response: PaginatedCalls = await getCalls(offset, limit);

      setCalls(response.nodes);
      setTotalPages(Math.ceil(response.totalCount / limit));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching calls:", error);
    }
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          sx={stylesMui.dataGrid}
          rows={filteredRows}
          // rows={calls}
          getRowId={(row: Row) => row.id}
          columns={columns}
          hideFooter
        />
      </Box>
      <div className="mt-20 flex flex-col gap-4 justify-center items-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={fetchCalls}
        />
      </div>
      <AddNotesModal
        open={!!selectedRow}
        onClose={handleCloseModal}
        selectedRow={selectedRow}
      />
    </div>
  );
};

export default DataTable;
