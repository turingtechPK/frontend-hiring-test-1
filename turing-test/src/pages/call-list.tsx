import List from "@/components/list";
import PageWrapper from "@/components/page-wrapper";
import useCalls from "@/hooks/useCalls";
import { app } from "@/shared/config";
import { PUSHER_CHANNEL_NAME } from "@/shared/constants";
import { getAccessToken } from "@/shared/helper";
import { CallList as CallListProps, CallNode } from "@/shared/types";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";

export default function CallList() {
  const [pageIndex, setPageIndex] = useState(1);
  const offset = (pageIndex - 1) * 10;
  const { data, isLoading, mutate } = useCalls(offset);

  const onPageChange = (page: number, _: number) => {
    setPageIndex(page);
  };

  useEffect(() => {
    const pusher = new Pusher(app.PUSHER_APP_KEY as string, {
      cluster: app.PUSHER_APP_CLUSTER as string,
      authEndpoint: app.PUSHER_APP_AUTH_ENDPOINT as string,
      channelAuthorization: {
        endpoint: app.PUSHER_APP_AUTH_ENDPOINT as string,
        transport: "ajax",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    });

    const channel = pusher.subscribe(PUSHER_CHANNEL_NAME);

    channel.bind("update-call", (channelData: CallNode) => {
      if (data?.data) {
        const requiredCall = data.data.nodes.filter(
          (callNode) => callNode.id === channelData.id
        );
        requiredCall.length > 0 && mutate();
      }
    });

    return () => pusher.unsubscribe(PUSHER_CHANNEL_NAME);
  }, [data?.data, mutate]);

  return (
    <PageWrapper>
      <List
        {...(data?.data as CallListProps)}
        onPageChange={onPageChange}
        activePage={pageIndex}
        isLoading={isLoading}
      />
    </PageWrapper>
  );
}
