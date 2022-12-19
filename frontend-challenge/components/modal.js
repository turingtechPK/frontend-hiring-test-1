import { Input, Modal } from "antd";
import styles from "../styles/callPage.module.css";
import { getDuration } from "../src/utils";

const CallModal = (props) => {
  const {
    selectedCall,
    isOpenAddNotesModal,
    setIsOpenAddNotesModal,
    handlePostNote,
    note,
    setNote
  } = props;
  return (
    <Modal
      title={
        <>
          <div className={styles.addNotesText}>Add Notes</div>
          <div className={styles.selectedCallID}>Call ID {selectedCall.id}</div>
        </>
      }
      open={isOpenAddNotesModal}
      onCancel={() => {
        setIsOpenAddNotesModal(false);
      }}
      footer={
        <div
          onClick={() => {
            setIsOpenAddNotesModal(false);
            handlePostNote();
          }}
          className={styles.extendedBtn}
        >
          Save
        </div>
      }
    >
      <>
        <div className={styles.dialogRow}>
          <div>Call Type</div>
          <div style={{ textTransform: "capitalize" }}>
            {selectedCall.call_type}
          </div>
        </div>
        <div className={styles.dialogRow}>
          <div>Duration</div>
          <div>{getDuration(selectedCall.duration)}</div>
        </div>
        <div className={styles.dialogRow}>
          {" "}
          <div>From</div>
          <div>{selectedCall.from}</div>
        </div>
        <div className={styles.dialogRow}>
          <div> To </div>
          <div>{selectedCall.to}</div>
        </div>
        <div className={styles.dialogRow}>
          {" "}
          <div> Via </div>
          <div>{selectedCall.via}</div>
        </div>

        <div className={styles.dialogRowNotes}>Notes</div>

        {selectedCall.notes?.map((note) => {
          return (
            <div className={styles.dialogRowNotes} key={note.id}>
              {note.content}
            </div>
          );
        })}

        <div className={styles.dialogRowNotes}>
          <Input.TextArea
            placeholder="Please enter any notes"
            autoSize={{ minRows: 5, maxRows: 6 }}
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </div>
      </>
    </Modal>
  );
};

export default CallModal;
