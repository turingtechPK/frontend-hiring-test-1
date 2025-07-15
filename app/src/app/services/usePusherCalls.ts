import { useEffect } from "react";
import Pusher from "pusher-js";

const APP_KEY = "d44e3d910d38a928e0be";
const APP_CLUSTER = "eu";
const APP_AUTH_ENDPOINT = "https://frontend-test-api.aircall.dev/pusher/auth";

export function usePusherCalls(accessToken: string | null, setCalls: (updater: (prev: any[]) => any[]) => void) {
  useEffect(() => {
    if (!accessToken) return;
    const pusher = new Pusher(APP_KEY, {
      cluster: APP_CLUSTER,
      authEndpoint: APP_AUTH_ENDPOINT,
      auth: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    const channel = pusher.subscribe("private-aircall");
    channel.bind("update-call", (call: any) => {
      setCalls((prev) =>
        prev.map((c) => (c.id === call.id ? { ...c, ...call } : c))
      );
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [accessToken, setCalls]);
} 