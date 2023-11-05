import React, { useEffect, useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Grid, Typography } from "@mui/material";

export const DataTable = ({
  setQueryOptions,
  maxWidth,
  minWidth,
  columns,
  rowCount,
  queryOptions,
  data,
  headerLabel,
  headerColor,
  id,
  headerHeight = 48,
  handleSortModelChange,
  maxHeight,
  ...props
}) => {
  const [rows, setRows] = useState([]);
  const getGridColumns = () => columns;

  useEffect(() => {
    data && setRows(data);
  }, [data]);

  return (
    <Grid
      id={id}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      headerColor={headerColor}
    >
      {headerLabel && (
        <Typography variant="h4" gutterBottom>
          {headerLabel}
        </Typography>
      )}
      <DataGridPro
        {...props}
        rows={rows || []}
        columns={getGridColumns()}
        initialState={{
          pagination: {
            page: 0,
            pageSize: 10,
          },
          pinnedColumns: { right: ["actions"] },
        }}
        paginationMode="server"
        paginationModel={{
          page: 0,
          pageSize: 10,
        }}
        pagination={true}
        pageSizeOptions={[10, 25, 50, 100]}
        rowCount={rowCount}
      />
    </Grid>
  );
};
