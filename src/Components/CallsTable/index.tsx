import moment from 'moment';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { archivedCall, getCallList } from '../../api/api_handler';
import { setAuthenticationStatus } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Loader from '../Loader';

export default function CallsTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getCallList(0, 8)
      .then(({ data }) => {
        setLoading(false);
        setData(data.nodes);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        dispatch(setAuthenticationStatus('not_authenticated'));
      });
    // eslint-disable-next-line
  }, []);
  const getMinutesSeconds = (duration: number) => {
    let minutes = moment.duration(duration, 'seconds').asMinutes();
    let minutesInt = Math.floor(minutes);
    let seconds = Math.floor((minutes - minutesInt) * 60);

    return `${minutesInt} minutes ${seconds} seconds`;
  };
  const archiveCallHandler = (id: string) => {
    setLoading(true);
    archivedCall(id)
      .then(() => {
        getCallList(0, 8)
          .then(({ data }) => {
            setData(data.nodes);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.error(err);
            dispatch(setAuthenticationStatus('not_authenticated'));
          });
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };
  return (
    <div>
      <h4 className="pt-4 pb-4">Turing Technologies Frontend Test</h4>
      {loading ? (
        <Loader text=" Loading data " />
      ) : (
        <Table bordered>
          <thead>
            <tr>
              <th>CALL TYPE</th>
              <th>DIRECTION</th>
              <th>DURATION</th>
              <th>FORM</th>
              <th>TO</th>
              <th>VIA</th>
              <th>CREATED AT</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(
              ({
                id,
                call_type,
                direction,
                duration,
                from,
                to,
                via,
                created_at,
                is_archived,
              }) => (
                <tr key={id}>
                  <td
                    className={`${
                      call_type === 'voicemail'
                        ? 'text-tt-primary'
                        : call_type === 'answered'
                        ? 'text-tt-secondary'
                        : call_type === 'missed'
                        ? 'text-tt-danger'
                        : ''
                    } text-capitalize`}
                  >
                    {call_type}
                  </td>
                  <td className="text-tt-primary text-capitalize">
                    {direction}
                  </td>
                  <td className="d-flex flex-column">
                    <span>{getMinutesSeconds(duration)}</span>
                    <span className="text-tt-primary">{`(${duration}) seconds`}</span>
                  </td>
                  <td>{from}</td>
                  <td>{to}</td>
                  <td>{via}</td>
                  <td>{moment(created_at).format('DD-MM-YYYY')}</td>
                  <td>
                    {is_archived ? (
                      <button
                        className="btn-tt btn-tt-secondary"
                        onClick={() => archiveCallHandler(id)}
                      >
                        Archived
                      </button>
                    ) : (
                      <button
                        className="btn-tt btn-tt-info"
                        onClick={() => archiveCallHandler(id)}
                      >
                        Unarchived
                      </button>
                    )}
                  </td>
                  <td>
                    <button className="btn-tt btn-tt-primary">Add Note</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}
