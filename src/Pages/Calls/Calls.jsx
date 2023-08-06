import React, { useState } from "react";
import { useQuery } from "react-query";
import { Container, Box, Typography } from "@mui/material";
import DataTable from "../../Components/DataTable/DataTable";
import { fetchCalls } from "./api";
import { callStyles } from "./callStyles";
let notAvailable = "N/A";
const Calls = () => {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: tableDataCallsList,
    isLoading,
    isError,
  } = useQuery(["tableDataCallsList", currentPage, rowsPerPage], fetchCalls, {
    keepPreviousData: true,
  });

  const tableData = tableDataCallsList?.nodes?.map((call) => ({
    id: call.id || notAvailable,
    CallType: call.call_type || notAvailable,
    Direction: call.direction || notAvailable,
    Duration: call.duration || notAvailable,
    From: call.from || notAvailable,
    To: call.to || notAvailable,
    Via: call.via || notAvailable,
    CreatedAt: call.created_at || notAvailable,
    Status: call.is_archived ? "Archived" : "Active",
  }));
  console.log(JSON.stringify(tableDataCallsList?.nodes?.totalCount, null, 2));
  if (isLoading) {
    return <Box style={callStyles.noData}>Loading...</Box>;
  }

  if (isError) {
    return (
      <Box style={callStyles.noData}>
        Error occurred while fetching Calls Data.
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={callStyles.container}>
      <Box>
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={callStyles.test}>
            Turing Technologies Frontend Test
          </Typography>
        </Box>
        <Box>
          <Typography fontSize="0.7em" sx={callStyles.filter}>
            Filter by:
          </Typography>
        </Box>

        <Box className="calls-table">
          {!tableData.length ? (
            <Container maxWidth="xl" sx={callStyles.noData}>
              No data available
            </Container>
          ) : (
            <DataTable
              rows={tableData}
              linkString={`/addNotes/`}
              rowsPerPage={rowsPerPage}
              totalCount={tableDataCallsList?.totalCount}
              currentPage={currentPage}
              onPageChange={(event, newPage) => setCurrentPage(newPage)}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Calls;
