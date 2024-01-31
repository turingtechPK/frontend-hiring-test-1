import { CallsResponse } from '@/api/types';
import { archiveCall } from '@/api';
import { useContext, useEffect } from 'react';
import { CallsContext } from '@/contexts';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

export default function CallDetailsModal() {
  const { detailsItem, setDetailsItem, setData } = useContext(CallsContext);

  const close = () => {
    setDetailsItem(undefined);
  };

  const archiveHandler = async () => {
    if (detailsItem?.id) {
      const response = await archiveCall(detailsItem.id);
      if (response) {
        setData((data: CallsResponse) => {
          if (data?.nodes) {
            const index = data?.nodes.findIndex((call) => call.id === response.id);
            return {
              totalCount: data.totalCount,
              hasNextPage: data.hasNextPage,
              nodes: data.nodes.toSpliced(index, 1, response),
            };
          }
          return { ...data };
        });
        setDetailsItem(undefined);
      }
    }
  };

  // useEffect(() => {
  //   const pusher = getPusherInstance();
  //   const channel = pusher.subscribe('private-aircall');
  //   channel.bind('update-call', (data) => {
  //     console.log(data);
  //   });
  // }, []);

  return (
    <Modal isOpen={!!detailsItem} onClose={close}>
      <form className="flex flex-col w-full lg:w-[50vw] max-w-[720px]">
        <div className="flex flex-col gap-2 p-8 border-b border-slate-300">
          <h2 className="text-xl font-semibold">Call Details</h2>
        </div>
        <div className="p-8 border-b border-slate-300 flex flex-col gap-8">
          <div className="grid grid-cols-[max-content,1fr] gap-y-2 gap-x-8">
            <p className="font-medium">Call ID</p>
            <p className="text-primary">{detailsItem?.id}</p>
            <p className="font-medium">Call Type</p>
            <p className="capitalize text-primary">{detailsItem?.call_type}</p>
            <p className="font-medium">Direction</p>
            <p className="capitalize text-primary">{detailsItem?.direction}</p>

            <p className="font-medium">Duration</p>
            <p className="">
              {detailsItem?.duration &&
                `${Math.floor(detailsItem.duration / 60)} minutes ${
                  detailsItem.duration % 60
                } seconds`}
            </p>

            <p className="font-medium">From</p>
            <p className="">{detailsItem?.from}</p>

            <p className="font-medium">To</p>
            <p className="">{detailsItem?.to}</p>

            <p className="font-medium">Via</p>
            <p className="">{detailsItem?.via}</p>

            <p className="font-medium">Created at</p>
            <p className="">
              {detailsItem?.created_at && new Date(detailsItem.created_at).toString()}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium">Notes</p>
            <ul className="list-disc ml-8">
              {detailsItem?.notes && detailsItem.notes.length
                ? detailsItem.notes.map(({ id, content }) => <li key={id}>{content}</li>)
                : 'No notes found'}
            </ul>
          </div>
        </div>
        <div className="flex flex-col p-8">
          <Button className="w-full" size="large" onClick={archiveHandler}>
            {detailsItem?.is_archived ? 'Unarchive' : 'Archive'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
