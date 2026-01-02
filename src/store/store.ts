import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/slice/authSlice';
import apiMiddleware from '../services/apiMiddleware';
import referralReducer from  "../features/referrals/slice/referralSlice"
import taskReducer from "../features/tasks/slice/taskSlice"
import profileReducer from '../features/Profile/slice/profileSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
     auth: authReducer,
   referral:referralReducer,
   task:taskReducer,
   profile:profileReducer 

    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiMiddleware),
  });
};

let storeInstance: ReturnType<typeof makeStore> | undefined;

export const setStore = (store: ReturnType<typeof makeStore>) => {
  storeInstance = store;
};

export const getStore = () => {
  if (!storeInstance) {
    throw new Error("Store is not initialized");
  }
  return storeInstance;
};

// Type Definitions
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];