import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

import { rtkApi } from "../../services/rtk"
import { authSlice, globalSlice } from "../slice"

const rootReducer = combineReducers({
  [rtkApi.reducerPath]: rtkApi.reducer,
  [globalSlice.name]: globalSlice.reducer,
  [authSlice.name]: authSlice.reducer,
})

const persistConfig = {
  key: "root",
  version: 0,
  storage,
  whitelist: [authSlice.name],
  blacklist: [globalSlice.name],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([rtkApi.middleware]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
