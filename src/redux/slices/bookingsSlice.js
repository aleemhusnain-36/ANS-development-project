import { createSlice } from '@reduxjs/toolkit';
import { userBookingsData, adminMetricsData } from '../../data/mockData';

const initialState = {
  userBookings: userBookingsData,
  adminBookings: adminMetricsData.recentBookings
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addUserBooking: (state, action) => {
      state.userBookings.unshift(action.payload);
      state.adminBookings.unshift({
        customer: "Aleem Khan",
        project: action.payload.project,
        date: action.payload.date,
        status: action.payload.status,
        amount: action.payload.amount
      });
    },
    updateAdminBookingStatus: (state, action) => {
      const { index, status } = action.payload;
      if (state.adminBookings[index]) {
        state.adminBookings[index].status = status;
      }
    },
    updateUserBookingStatus: (state, action) => {
      const { id, status } = action.payload;
      const b = state.userBookings.find(item => item.id === id);
      if (b) {
        b.status = status;
      }
    }
  }
});

export const { addUserBooking, updateAdminBookingStatus, updateUserBookingStatus } = bookingsSlice.actions;

export const selectUserBookings = (state) => state.bookings.userBookings;
export const selectAdminBookings = (state) => state.bookings.adminBookings;

export default bookingsSlice.reducer;
