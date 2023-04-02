import { createNote } from "../state/ducks/calls/callActions";
import { connect } from "react-redux";
import AddNoteModal from "../components/addNoteModal";

const mapDispatchToProps = {
  createNote,
};

export default connect(null, mapDispatchToProps)(AddNoteModal);
