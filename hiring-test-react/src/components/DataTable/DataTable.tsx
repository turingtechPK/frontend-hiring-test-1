import React, { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import PaginationComponent from "../Pagination/PaginationComponent";
import { ActionsButton } from "../Buttons";
import { Row } from "../../types";
import AddNotesModal from "../AddNotesModal";

interface DataTableProps {
  selectedFilter: string;
}

const rows = [
  {
    id: 1,
    callType: "Voice Mail",
    direction: "Inbound",
    duration: "5:30",
    from: "+345871293",
    to: "+12378619534",
    via: "+397864798",
    createdAt: "2022-01-01",
    status: "Archived",
  },
  {
    id: 2,
    callType: "Answered",
    direction: "Outbound",
    duration: "3:45",
    from: "+345876123",
    to: "+8912783132",
    via: "+3278461238",
    createdAt: "2022-01-02",
    status: "Unarchived",
  },
  {
    id: 3,
    callType: "Missed",
    direction: "Outbound",
    duration: "3:45",
    from: "+123123123",
    to: "+3453412312",
    via: "+5672432564",
    createdAt: "2022-01-02",
    status: "Unarchived",
  },
];

const DataTable: React.FC<DataTableProps> = ({ selectedFilter }) => {
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);

  console.log("selectedFilter is...", selectedFilter);

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  const filteredRows = selectedFilter
    ? rows.filter((row) => row.status === selectedFilter)
    : rows;

  const handleAction = (row: Row) => {
    setSelectedRow(row);
  };

  const columns: GridColDef[] = [
    {
      field: "callType",
      headerName: "CALL TYPE",
      width: 150,
      editable: false,
      renderCell: (params) => {
        let textColor;

        if (params.row.callType === "Answered") {
          textColor = "green";
        } else if (params.row.callType === "Missed") {
          textColor = "red";
        } else {
          textColor = "blue";
        }

        return <div style={{ color: textColor }}>{params.row.callType}</div>;
      },
    },
    {
      field: "direction",
      headerName: "DIRECTION",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <div style={{ color: "blue" }}>{params.row.direction}</div>
      ),
    },
    {
      field: "duration",
      headerName: "DURATION",
      width: 150,
      editable: false,
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
      field: "createdAt",
      headerName: "CREATED AT",
      width: 110,
      editable: false,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <div
          style={{ color: params.row.status === "Archived" ? "green" : "grey" }}
        >
          {params.row.status}
        </div>
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

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          sx={{
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: "#F4F4F9",
              fontSize: "14px",
              fontFamily: "Avenir-Roman",
              fontWeight: 500,
            },
          }}
          rows={filteredRows}
          getRowId={(row: Row) => row.id}
          columns={columns}
          hideFooter
        />
      </Box>
      <div className="mt-20 flex flex-col gap-4 justify-center items-center">
        <PaginationComponent currentPage={3} totalPages={3} />
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
