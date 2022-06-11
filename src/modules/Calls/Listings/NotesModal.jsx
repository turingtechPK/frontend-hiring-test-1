import { Modal, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { ADD_NOTE_TO_CALL } from '../../../graphql/mutation/call';

const NotesModal = ({ values, setValues }) => {
  const { isModalVisible, content, selectedCallId } = values;

  const handleClose = () => setValues({ ...values, isModalVisible: false });
  const [addNoteToCall, { loading }] = useMutation(ADD_NOTE_TO_CALL, {
    refetchQueries: ['paginatedCalls']
  });

  return (
    <Modal show={isModalVisible} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Add note to selected call</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          disabled={loading}
          onChange={({ target }) => setValues({ ...values, content: target.value })}
          style={{ width: '100%', resize: 'none' }}
          rows={7}>
        </textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={loading}
          variant="primary"
          onClick={async () => {
            await addNoteToCall({
              variables: {
                activityId: selectedCallId,
                content
              }
            });
            setValues({ ...values, isModalVisible: false, content: '', selectedCallId: '' })
          }}>
          ADD
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotesModal;