import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call } from '../../Interfaces/call';



interface CallState {
  callHistory: call[];
  currentCall: call | null;  
}

const initialState: CallState = {
  callHistory: [],  
  currentCall: null, 
};

const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    addCall(state, action: PayloadAction<call>) {
      state.callHistory.push(action.payload);  
    },
    updateCall(state, action: PayloadAction<call>) {
        const updatedCall = action.payload;
        const index = state.callHistory.findIndex(call => call.id === updatedCall.id);
        if (index !== -1) {
          state.callHistory[index] = updatedCall;  
        }
      },
  },

});

export const { addCall,updateCall } = callSlice.actions;
export default callSlice.reducer;
