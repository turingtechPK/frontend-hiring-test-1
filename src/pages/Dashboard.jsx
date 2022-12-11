import { Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CallList } from "../components/CallList";
import Layout from "../components/common/Layout";
import { PAGE_TITLES, REQ_STATUSES } from "../constants/appUtilsConstants";
import { getCallList } from "../thunks/dashboardThunks";
import {
  callsListSelector,
  filterSelector,
} from "../store/slices/callListSlice";
import { getPageParams } from "../utils/apiUtils";

const Dashboard = () => {
  const dispatch = useDispatch();
  const firstUpdate = useRef(true);
  const { pageSettings, filterSettings } = useSelector(filterSelector);
  const { status } = useSelector(callsListSelector);

  useEffect(() => {
    if (status === REQ_STATUSES.succeeded) {
      const queryParams = getPageParams(pageSettings);
      dispatch(getCallList(queryParams));
    }
  }, [pageSettings]);

  useEffect(() => {
    if (firstUpdate.current) {
      const queryParams = getPageParams(pageSettings);
      dispatch(getCallList(queryParams));
    }
    firstUpdate.current = false;
  }, []);

  return (
    <Layout pageTitle={PAGE_TITLES.dashboard}>
      <Typography variant="h5">Turing Technologies Frontend Test</Typography>
      <CallList />
    </Layout>
  );
};

export default Dashboard;
