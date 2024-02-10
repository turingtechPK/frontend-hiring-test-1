import React, { useState } from 'react';
import { Call, CallsResponse } from '@/models';
import { CallsContext } from '../hooks';

type CallsContextProviderProps = {
  children: React.ReactNode;
};

export function CallsContextProvider({ children }: CallsContextProviderProps) {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

  const [data, setData] = useState<CallsResponse | null>(null);

  return (
    <CallsContext.Provider
      value={{
        selectedCall,
        setSelectedCall,
        data,
        setData,
      }}
    >
      {children}
    </CallsContext.Provider>
  );
}
