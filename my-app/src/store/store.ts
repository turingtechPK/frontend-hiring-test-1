import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import callSlice from './slices/callSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    call:callSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;
