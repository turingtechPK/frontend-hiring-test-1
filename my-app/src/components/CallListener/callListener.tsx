import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import pusher from '../../utils/pusher';
import { updateCall } from '../../store/slices/callSlice'; 
import { call } from '../../Interfaces/call';




const CallListener = () => {
  const dispatch = useDispatch();


  const isSubscribed = useRef(false);
  const channel = new BroadcastChannel('call-updates');

  useEffect(() => {
    const handleBroadcast = (event: MessageEvent) => {
      if (event.data.type === 'update-call') {
        const updatedCall = event.data.call;
        dispatch(updateCall(updatedCall));
      }
    };

    channel.addEventListener('message', handleBroadcast);

    return () => {
      channel.removeEventListener('message', handleBroadcast);
    };
  }, [dispatch, channel]);

  useEffect(() => {
    if (!isSubscribed.current) {
      const pusherChannel = pusher.subscribe('private-aircall');

      pusherChannel.bind('update-call', (callData: call) => {
        dispatch(updateCall(callData));

        channel.postMessage({ type: 'update-call', call: callData });
      });

      isSubscribed.current = true;

      return () => {
        pusherChannel.unbind_all();
        pusherChannel.unsubscribe();
        channel.close();
      };
    }
  }, [isSubscribed]);

  return null;
};

export default CallListener;
