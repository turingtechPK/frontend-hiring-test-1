import { Modal, Input, Text } from "../../libs/shared-components";
import React, { useState, useCallback, useEffect } from "react";
const { TextArea } = Input;
const NewModal = (props: any) => {
  return (
    <>
      <Modal
        title="Details"
        visible={props.visible}
        onOk={(e) => props.onOk(props.modaldata.id)}
        onCancel={props.onCancel}
        confirmLoading={props.loading}
      >
        <Text>Id: {props.modaldata.id}</Text>
        <Text>Created at: {props.modaldata.created_at}</Text>
        <Text>call_types: {props.modaldata.call_type}</Text>
        <Text>Notes:</Text>
        {props.modaldata.notes && props.modaldata.notes.length !== 0 ? (
          props.modaldata.notes.map((e) => <Text> {e.content}</Text>)
        ) : (
          <Text>no data</Text>
        )}
        <TextArea
          rows={4}
          placeholder="Add Notes"
          value={props.newNote}
          onChange={(e) => props.setnewNote(e.target.value)}
        />
      </Modal>
    </>
  );
};
export default NewModal;
