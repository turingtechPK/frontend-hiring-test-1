import { useQuery } from '@apollo/client';
import { Accordion, Spinner, Badge, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import { GET_CALL } from '../../../graphql/query/call';

const Details = () => {
  const { state } = useLocation();
  const { callId = null } = state || {};
  const navigate = useNavigate();

  const { loading, data: { call: {
    direction,
    from,
    to,
    duration,
    is_archived,
    call_type,
    via,
    created_at,
    notes
  } = {} } = {} } = useQuery(GET_CALL, {
    variables: {
      id: callId
    }
  });

  const isArchived = is_archived || false;
  const isInboundCall = direction === 'inbound' || false;
  const tagColorForCallType = call_type === 'missed' ? 'secondary' : (call_type === 'answered' ? 'info' : 'dark');

  return (
    <div style={{ padding: '40px 200px 40px 200px', height: '100%' }}>
      <h4 style={{ textAlign: 'center', marginBottom: '40px' }}>Call Details</h4>

      <Button style={{ marginBottom: '40px' }} variant="primary" onClick={() => navigate('/calls')}>Back to listings</Button>

      {
        loading ?
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div> :
          (callId ? 
          <>
            <div style={{ display: 'flex' }}>
              <div>Call Type: <Badge bg={tagColorForCallType}>{call_type?.toUpperCase()}</Badge></div>
              <div style={{ marginLeft: 'auto' }}>Caller's Number: <b>{from}</b></div>
            </div>

            <div style={{ display: 'flex', marginTop: '20px', marginBottom: '20px' }}>
              <div>Callee's Number: <b>{to}</b></div>
              <div style={{ marginLeft: 'auto' }}>Call duration: <b>{Math.round(duration / 60)} minutes</b></div>
            </div>

            <div style={{ display: 'flex', marginTop: '20px', marginBottom: '20px' }}>
              <div>Direction: <Badge bg={isInboundCall ? "primary" : "warning"}>{direction?.toUpperCase()}</Badge></div>
              <div style={{ marginLeft: 'auto' }}>Aircall number: <b>{via}</b></div>
            </div>

            <div style={{ display: 'flex', marginTop: '20px', marginBottom: '20px' }}>
              <div>Call made at: <b>{new Date(created_at).toDateString()}</b></div>
              <div style={{ marginLeft: 'auto' }}>Archive Status: <Badge bg={isArchived ? "success" : "danger"}>{isArchived ? 'ARCHIVED' : 'NON-ARCHIVED'}</Badge></div>
            </div>

            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Call Notes</Accordion.Header>
                <Accordion.Body>
                  {
                    notes && notes.length ? notes.map(({ content }, index) => {
                      return (
                        <div key={index}>{`${index + 1}) `}{content}</div>
                      )
                    })
                      :
                      'No notes available'
                  }
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </> 
          : 
          <h4 style={{ textAlign: 'center' }}>No Call ID present !</h4>)
      }
    </div>
  );
};

export default Details;