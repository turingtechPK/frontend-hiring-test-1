import { useMutation } from '@apollo/client';
import { Table, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SpinnerComponent } from 'react-element-spinner';

import { ARCHIVE_CALL } from '../../../graphql/mutation/call';

const ListingTable = ({ data, values, setValues, fetchingCalls }) => {
  const navigate = useNavigate();
  const [archiveCall, { loading: archiveLoading }] = useMutation(ARCHIVE_CALL, {
    refetchQueries: ['paginatedCalls']
  });

  return (
    <div style={{ height: 'calc(100% - 68px - 38px - 72px)', maxHeight: 'calc(100% - 68px - 38px - 72px)', overflowY: 'scroll' }}>
      <SpinnerComponent loading={fetchingCalls || archiveLoading} position="centered" backgroundColor='#E3E3E3' />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Direction</th>
            <th>Caller's number</th>
            <th>Callee's number</th>
            <th>Call Duration in minutes</th>
            <th>Archived Status</th>
            <th>Aircall number</th>
            <th>Call type</th>
            <th>Call made at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.length ? data.map(({ id, created_at, via, call_type, is_archived, duration, to, from, direction }, index) => {
              const isArchived = is_archived || false;
              const isInboundCall = direction === 'inbound' || false;
              const tagColorForCallType = call_type === 'missed' ? 'secondary' : (call_type === 'answered' ? 'info' : 'dark');

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Badge bg={isInboundCall ? "primary" : "warning"}>{direction}</Badge>
                  </td>
                  <td>{from}</td>
                  <td>{to}</td>
                  <td>{Math.round(duration / 60)}</td>
                  <td>
                    <Badge bg={isArchived ? "success" : "danger"}>{isArchived ? 'Archived' : 'Non-archived'}</Badge>
                  </td>
                  <td>{via}</td>
                  <td>
                    <Badge bg={tagColorForCallType}>{call_type}</Badge>
                  </td>
                  <td>{new Date(created_at).toDateString()}</td>
                  <td>
                    <div style={{ display: 'flex', columnGap: 5 }}>
                      <Button
                        size='sm'
                        onClick={() => navigate('/call/details', { state: { callId: id } })}
                        variant="outline-primary">
                        View Details
                      </Button>

                      <Button
                        size='sm'
                        onClick={() => setValues({ ...values, isModalVisible: true, selectedCallId: id })}
                        variant="outline-primary">
                        Add Note
                      </Button>

                      <Button
                        size='sm'
                        onClick={async () => {
                          await archiveCall({
                            variables: {
                              id
                            }
                          });
                        }}
                        variant="outline-primary">
                        {isArchived ? 'Unarchive' : 'Archive'} Call
                      </Button>

                    </div>
                  </td>
                </tr>
              );
            }) : []
          }
        </tbody>
      </Table>
    </div>
  );
};

export default ListingTable;