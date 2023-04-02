import { IApplicationState } from "../state/store";
import { archiveCall, fetchCalls, updateData } from "../state/ducks/calls/callActions";
import { connect } from "react-redux";
import TableViewPage from "../pages/tableViewPage";


const mapStateToProps = (state: IApplicationState) => ({
  tableData: state.calls.data,
});

const mapDispatchToProps = {
  archiveCall, fetchCalls, updateData
};

export default connect(mapStateToProps, mapDispatchToProps)(TableViewPage);

