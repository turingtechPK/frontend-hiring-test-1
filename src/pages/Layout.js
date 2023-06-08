import React, { useContext } from "react";
import Login from "./Login";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";
import Dashboard from "./Dashboard";
import { Grid, GridItem, Box } from "@chakra-ui/react";

const Layout = () => {
  const { user } = useContext(UserContext);

  return (
    <Box minH="100vh" bg="gray.100">
      <Header />
      <Grid templateRows="repeat(6,1fr)">
        {user === null && (
          <>
            <GridItem as="main" rowSpan={{ base: 6, lg: 6, xl: 6 }}>
              <Login />
            </GridItem>
          </>
        )}

        {user !== null && (
          <>
            <GridItem as="main" rowSpan={{ base: 6, lg: 6, xl: 6 }} bg="white">
              <Dashboard />
            </GridItem>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Layout;
