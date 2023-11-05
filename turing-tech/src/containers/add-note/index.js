import React, { useState, useEffect } from "react";
import {
  StyledModalHeader,
  StyledModalHeaderContent,
  ModalHeaderHeading,
  ModalHeaderSubheading,
  StyledHeaderLeft,
  StyledHeaderRight,
  StyledModalBodyContent,
  StyledModalBody,
  SingleRow,
  Value,
  Label,
  NotesInputContainer,
} from "./styles";
import TextField from "@mui/material/TextField";
import { useLazyQuery } from "@apollo/client";
import { GET_RECORD_BY_ID } from "../../graphql";
import { formatDuration } from "../home";

export const AddNote = ({ variables }) => {
  const [getRecord, { data, loading, error }] = useLazyQuery(GET_RECORD_BY_ID);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    getRecord({ variables: { id: variables?.id } });
  }, [variables?.id]);

  useEffect(() => {
    if (!loading && !error && data) {
      setFetchedData(data?.["call"]);
    }
  }, [data, loading]);

  return (
    <>
      <StyledModalHeader>
        <StyledModalHeaderContent>
          <StyledHeaderLeft>
            <ModalHeaderHeading>Add Notes</ModalHeaderHeading>
            <ModalHeaderSubheading>
              {`Call ID: ${fetchedData?.id}`}
            </ModalHeaderSubheading>
          </StyledHeaderLeft>
          <StyledHeaderRight></StyledHeaderRight>
        </StyledModalHeaderContent>
      </StyledModalHeader>
      <StyledModalBody>
        <StyledModalBodyContent>
          <SingleRow>
            <Label>Call Type</Label>
            <Value>{fetchedData?.call_type}</Value>
          </SingleRow>

          <SingleRow>
            <Label>Duration</Label>
            <Value>{formatDuration(fetchedData?.duration)}</Value>
          </SingleRow>

          <SingleRow>
            <Label>From</Label>
            <Value>{fetchedData?.from}</Value>
          </SingleRow>

          <SingleRow>
            <Label>To</Label>
            <Value>{fetchedData?.to}</Value>
          </SingleRow>

          <SingleRow>
            <Label>Via</Label>
            <Value>{fetchedData?.via}</Value>
          </SingleRow>

          <NotesInputContainer>
            <Label>Notes</Label>
            <TextField multiline rows={7}></TextField>
          </NotesInputContainer>
        </StyledModalBodyContent>
      </StyledModalBody>
    </>
  );
};
