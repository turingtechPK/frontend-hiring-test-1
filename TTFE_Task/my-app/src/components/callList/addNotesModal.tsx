import {
  CallType,
  Container,
  HorizontalLine,
  Item,
  Name,
  NotesContainer,
  TextTitle,
  Value,
} from "./styled.components";

import { Input } from "antd";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { noteText } from "./atoms";

const { TextArea } = Input;

const AddNotesModal = (props: any) => {
  const [val, setVal] = useRecoilState(noteText);

  return (
    <>
      <CallType>Call ID {props.props.id}</CallType>
      <HorizontalLine />
      <Container>
        <Item>
          <Name>Call Type</Name>
          <Name>Duration</Name>
          <Name>From</Name>
          <Name>To</Name>
          <Name>Via</Name>
        </Item>
        <Item>
          <CallType>
            {props.props.call_type.charAt(0).toUpperCase() +
              props.props.call_type.slice(1)}
          </CallType>
          <Value>{props.props.duration}</Value>
          <Value>{props.props.from}</Value>
          <Value>{props.props.to}</Value>
          <Value>{props.props.via}</Value>
        </Item>
      </Container>
      <NotesContainer>
        <TextTitle>Notes</TextTitle>
        <TextArea
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Add Notes"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </NotesContainer>
      <HorizontalLine />
    </>
  );
};

export default AddNotesModal;
