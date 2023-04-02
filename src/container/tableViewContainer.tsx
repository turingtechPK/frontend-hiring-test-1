import { IApplicationState } from "../state/store";
import { archiveCall } from "../state/ducks/calls/callActions";
import { connect } from "react-redux";
import TableViewPage from "../pages/TableViewPage";


const mapStateToProps = (state: IApplicationState) => ({
  tableData: state.calls.data,
});

const mapDispatchToProps = {
  archiveCall
};

export default connect(mapStateToProps, mapDispatchToProps)(TableViewPage);

