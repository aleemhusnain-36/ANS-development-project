import { createSlice } from '@reduxjs/toolkit';
import { testimonialsData } from '../../data/mockData';

const initialState = {
  items: [
    ...testimonialsData,
    {
      id: 4,
      quote: "Invested in their New Projects portfolio in Islamabad. Transparent agreements, zero hidden charges, and excellent property valuation appreciation.",
      author: "Haji Abdul Rasheed",
      role: "Overseas Pakistani Investor, UK",
      rating: 5,
      projectType: "Residential Plots",
      date: "October 2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 5,
      quote: "Their turnkey architectural & construction service converted our rough plot into an ultra-modern 1-Kanal designer residence within agreed deadlines.",
      author: "Dr. Samina Bilal",
      role: "Homeowner, Bahria Town",
      rating: 5,
      projectType: "Turnkey Construction",
      date: "September 2026",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    }
  ]
};

export const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    addTestimonial: (state, action) => {
      state.items.unshift({
        id: Date.now(),
        date: "Just now",
        ...action.payload
      });
    }
  }
});

export const { addTestimonial } = testimonialsSlice.actions;
export const selectAllTestimonials = (state) => state.testimonials.items;

export default testimonialsSlice.reducer;

