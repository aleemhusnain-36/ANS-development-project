import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: 'USR-8821',
    name: 'Aleem Khan',
    email: 'aleem@example.com',
    phone: '+92 300 1234567',
    role: 'Premium Investor',
    cnic: '35201-1234567-1',
    city: 'Lahore, Pakistan',
    address: 'House 14-B, Sector Z, Phase 6 DHA, Lahore'
  },
  isAuthenticated: true,
  role: 'admin' // or 'user'
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      if (action.payload) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
    }
  }
});

export const { updateProfile, login, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
