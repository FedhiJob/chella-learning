import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/slice/authSlice';
import apiMiddleware from '../services/apiMiddleware';
import referralReducer from  "../features/referrals/slice/referralSlice"
import taskReducer from "../features/tasks/slice/taskSlice"
import profileReducer from '../features/Profile/slice/profileSlice';
import transactionReducer from '../features/transactions/slice/transactionSlice'
import dashboardReducer from '../features/dashboard/slice/dashboardSlice';
import notificationReducer from '../features/notifications/slice/notificationSlice';
import dailyCheckinReducer from '../features/daily-checkin/slice/dailyCheckinSlice';
import leaderboardReducer from '../features/leaderboard/slice/leaderboardSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
     auth: authReducer,
   referral:referralReducer,
   task:taskReducer,
   profile:profileReducer ,
transaction: transactionReducer,
dashboard: dashboardReducer,
notification: notificationReducer,
dailyCheckin: dailyCheckinReducer,
leaderboard: leaderboardReducer,
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