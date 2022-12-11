import { Typography } from "@mui/material";
import { CallList } from "../components/CallList";
import Layout from "../components/common/Layout";
import { PAGE_TITLES } from "../constants/appUtilsConstants";

const Dashboard = () => {
  return (
    <Layout pageTitle={PAGE_TITLES.dashboard}>
      <Typography variant="h5">Turing Technologies Frontend Test</Typography>
      <CallList />
    </Layout>
  );
};

export default Dashboard;
