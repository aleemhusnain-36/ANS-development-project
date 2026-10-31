import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inquiries: [
    {
      id: "INQ-101",
      name: "Chaudhry Zafar",
      phone: "+92 301 8847291",
      email: "zafar@example.com",
      service: "Plots (Residential)",
      message: "Looking for 1 Kanal plot in Sector F-7 Islamabad with immediate possession.",
      date: "Today, 4:15 PM",
      status: "New"
    },
    {
      id: "INQ-102",
      name: "Dr. Kamran Siddiqui",
      phone: "+92 321 4455210",
      email: "kamran@health.com",
      service: "Shops (Commercial)",
      message: "Interested in ground floor retail space at Grand Vista Shopping Mall.",
      date: "Yesterday",
      status: "Contacted"
    },
    {
      id: "INQ-103",
      name: "Mian Hamza",
      phone: "+92 333 9988112",
      email: "hamza@textiles.com",
      service: "Construction",
      message: "Need turnkey construction estimate for 2 Kanal modern residence in DHA Lahore.",
      date: "28 Oct 2026",
      status: "In Progress"
    }
  ]
};

export const inquiriesSlice = createSlice({
  name: 'inquiries',
  initialState,
  reducers: {
    addInquiry: (state, action) => {
      const newInq = {
        id: `INQ-${Date.now().toString().slice(-4)}`,
        date: "Just now",
        status: "New",
        ...action.payload
      };
      state.inquiries.unshift(newInq);
    },
    markInquiryContacted: (state, action) => {
      const inq = state.inquiries.find(item => item.id === action.payload);
      if (inq) {
        inq.status = inq.status === "Contacted" ? "New" : "Contacted";
      }
    },
    deleteInquiry: (state, action) => {
      state.inquiries = state.inquiries.filter(item => item.id !== action.payload);
    }
  }
});

export const { addInquiry, markInquiryContacted, deleteInquiry } = inquiriesSlice.actions;

export const selectAllInquiries = (state) => state.inquiries.inquiries;

export default inquiriesSlice.reducer;
