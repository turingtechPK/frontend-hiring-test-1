import { FormEvent, useContext, useRef } from 'react';
import { CallsResponse } from '@/api/types';
import { createNote } from '@/api';
import { CallsContext } from '@/contexts';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

export default function AddNotesModal() {
  const { addNoteItem, setAddNoteItem, setData } = useContext(CallsContext);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const close = () => {
    setAddNoteItem(undefined);
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      const content = inputRef.current.value;
      const response = await createNote(addNoteItem!.id, content);

      if (response) {
        setData((data: CallsResponse) => {
          if (data.nodes) {
            const index = data.nodes.findIndex((call) => call.id === response.id);
            return {
              hasNextPage: data.hasNextPage,
              totalCount: data.totalCount,
              nodes: data.nodes.toSpliced(index, 1, response),
            };
          }

          return { data };
        });
        setAddNoteItem(undefined);
      }
    }
  };

  return (
    <Modal isOpen={!!addNoteItem} onClose={close}>
      <form className="flex flex-col w-full lg:w-[50vw] max-w-[720px]" onSubmit={submitHandler}>
        <div className="flex flex-col gap-2 p-8 border-b border-slate-300">
          <h2 className="text-xl font-semibold">Add Notes</h2>
          <p className="text-primary text-sm">Call ID {addNoteItem?.id}</p>
        </div>
        <div className="p-8 border-b border-slate-300 flex flex-col gap-8">
          <div className="grid grid-cols-[max-content,1fr] gap-y-2 gap-x-8">
            <p className="font-medium">Call Type</p>
            <p className="capitalize text-primary">{addNoteItem?.call_type}</p>

            <p className="font-medium">Duration</p>
            <p className="">
              {addNoteItem?.duration &&
                `${Math.floor(addNoteItem.duration / 60)} minutes ${
                  addNoteItem.duration % 60
                } seconds`}
            </p>

            <p className="font-medium">From</p>
            <p className="">{addNoteItem?.from}</p>

            <p className="font-medium">To</p>
            <p className="">{addNoteItem?.to}</p>

            <p className="font-medium">Via</p>
            <p className="">{addNoteItem?.via}</p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-medium">Notes</p>
            <textarea
              className="border border-slate-300 px-4 py-4"
              ref={inputRef}
              placeholder="Add Notes"
              rows={6}
            />
          </div>
        </div>
        <div className="flex flex-col p-8">
          <Button className="w-full" size="large" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
