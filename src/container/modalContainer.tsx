import { IApplicationState } from "../state/store";
import { createNote } from "../state/ducks/calls/callActions";
import { connect } from "react-redux";
import AddNoteModal from "../components/addNoteModal";

// const mapStateToProps = (state: IApplicationState) => ({
//   tableData: state.calls.data,
// });

const mapDispatchToProps = {
  createNote,
};

export default connect(null, mapDispatchToProps)(AddNoteModal);
