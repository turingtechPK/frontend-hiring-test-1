import React, { createContext, useContext } from 'react';
import { Call, CallsResponse } from '@/models';

export const CallsContext = createContext<{
  selectedCall: Call | null;
  setSelectedCall: React.Dispatch<React.SetStateAction<Call | null>>;
  data: CallsResponse | null;
  setData: React.Dispatch<React.SetStateAction<CallsResponse | null>>;
}>({
  selectedCall: null,
  setSelectedCall: () => void 0,
  data: null,
  setData: () => void 0,
});

export function useCallsContext() {
  const context = useContext(CallsContext);

  if (context === undefined) throw new Error('useCallsContext must be used within a CallsContextProvider.');

  return context;
}
