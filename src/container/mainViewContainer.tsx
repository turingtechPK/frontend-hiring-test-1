import { IApplicationState } from "../state/store";
import { fetchCalls } from "../state/ducks/calls/callActions";
import { userLogout } from "../state/ducks/auth/authActions";
import { connect } from "react-redux";
import MainView from "../components/mainView";
const mapStateToProps = (state: IApplicationState) => ({
  isAuth:state.auth.isAuthenticated
});

const mapDispatchToProps = {
  fetchCalls, userLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

