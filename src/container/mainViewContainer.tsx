import { IApplicationState } from "../state/store";
import { fetchCalls } from "../state/ducks/calls/callActions";
import { connect } from "react-redux";
import MainView from "../components/mainView";
const mapStateToProps = (state: IApplicationState) => ({
  // tableData: state.calls,
  isAuth:state.auth.isAuthenticated
});

const mapDispatchToProps = {
  fetchCalls,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

