import React from 'react';
import { useQuery } from '@apollo/client';
import { CALL_QUERY } from '../graphql/queries';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 20,
  },
});

const CallDetails = ({ callId }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(CALL_QUERY, {
    variables: { id: callId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const call = data.call;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Call Details
        </Typography>
        <Typography color="textSecondary">
          ID: {call.id}
        </Typography>
        <Typography color="textSecondary">
          Direction: {call.direction}
        </Typography>
        <Typography color="textSecondary">
          From: {call.from}
        </Typography>
        <Typography color="textSecondary">
          To: {call.to}
        </Typography>
        <Typography color="textSecondary">
          Duration: {call.duration} seconds
        </Typography>
        <Typography color="textSecondary">
          Call Type: {call.call_type}
        </Typography>
        <Typography color="textSecondary">
          Via: {call.via}
        </Typography>
        <Typography color="textSecondary">
          Created At: {call.created_at}
        </Typography>
        <Typography color="textSecondary">
          Archived: {call.is_archived ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="h6" component="h3">
          Notes
        </Typography>
        <List>
          {call.notes.map((note) => (
            <ListItem key={note.id}>
              <ListItemText primary={note.content} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default CallDetails;