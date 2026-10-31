import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './slices/projectsSlice';
import bookingsReducer from './slices/bookingsSlice';
import inquiriesReducer from './slices/inquiriesSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    bookings: bookingsReducer,
    inquiries: inquiriesReducer,
    auth: authReducer
  }
});

export default store;
