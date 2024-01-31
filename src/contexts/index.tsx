import { CallsResponse, Call } from '@/api/types';
import { createContext, useMemo, useState } from 'react';

// TODO: remove any and optional
type CallsContextType = {
  data?: CallsResponse;
  addNoteItem?: Call;
  detailsItem?: Call;
  setData?: any;
  setAddNoteItem?: any;
  setDetailsItem?: any;
};

export const CallsContext = createContext<CallsContextType>({});

export default function CallsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CallsResponse>();
  const [addNoteItem, setAddNoteItem] = useState<Call>();
  const [detailsItem, setDetailsItem] = useState<Call>();

  const value = useMemo(
    () => ({
      data,
      setData,
      addNoteItem,
      setAddNoteItem,
      detailsItem,
      setDetailsItem,
    }),
    [data, addNoteItem, detailsItem]
  );

  return <CallsContext.Provider value={value}>{children}</CallsContext.Provider>;
}
