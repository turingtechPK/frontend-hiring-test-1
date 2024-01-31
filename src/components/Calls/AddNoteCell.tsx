import { Call } from '@/api/types';
import { useContext } from 'react';
import { CallsContext } from '@/contexts';
import Button from '../ui/Button';

export default function AddNoteCell({ rowData }: { rowData: Call }) {
  const { setAddNoteItem } = useContext(CallsContext);

  return (
    <Button
      className=""
      size="regular"
      onClick={(event) => {
        event.stopPropagation();
        setAddNoteItem(rowData);
      }}
    >
      Add Note
    </Button>
  );
}
