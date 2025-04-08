import Pusher from 'pusher-js';
import { updateCall } from '../store/slices/callSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const dispatch = useDispatch();

const pusher = new Pusher('d44e3d910d38a928e0be', {
  cluster: 'eu',
  authEndpoint: 'https://frontend-test-api.aircall.dev/pusher/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  },
});
console.log("Auth token being used:", localStorage.getItem('authToken'));

const channel = pusher.subscribe('private-aircall');

const handleCallUpdate = (data:any) => {
  console.log('Call updated:', data);
  dispatch(updateCall(data));
};

useEffect(() => {
  channel.bind('update-call', handleCallUpdate);
console.log("call updating is running");
  return () => {
    channel.unbind('update-call', handleCallUpdate);
    pusher.unsubscribe('private-aircall');
  };
}, []);

pusher.connection.bind('error', function (err: any) {
  console.error('Pusher connection error:', err);
});

pusher.connection.bind('unauthorized', function (err: any) {
  console.error('Unauthorized error:', err);
});

pusher.connection.bind('disconnected', function () {
  console.log('Pusher disconnected');
});

pusher.connection.bind('reconnected', function () {
  console.log('Reconnected to Pusher');
});

export default pusher;
