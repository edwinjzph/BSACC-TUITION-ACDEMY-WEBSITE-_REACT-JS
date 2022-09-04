import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import subReducer from '../features/subSlice'
import subsReducer from '../features/subsSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    sub: subReducer,
    subs:subsReducer,
  },
});
