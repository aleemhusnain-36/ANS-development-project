import { createSlice } from '@reduxjs/toolkit';
import { projectsData } from '../../data/mockData';

const initialState = {
  items: projectsData,
  selectedCategory: 'All',
  selectedListingType: 'All',   // 'All' | 'For Sale' | 'For Rent' | 'New Project'
  searchQuery: '',
  status: 'idle'
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setListingType: (state, action) => {
      state.selectedListingType = action.payload;
      state.selectedCategory = 'All'; // reset category when switching listing type
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addProject: (state, action) => {
      state.items.unshift(action.payload);
    },
    deleteProject: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    updateProjectStatus: (state, action) => {
      const { id, status } = action.payload;
      const project = state.items.find(p => p.id === id);
      if (project) {
        project.status = status;
      }
    }
  }
});

export const {
  setCategory,
  setListingType,
  setSearchQuery,
  addProject,
  deleteProject,
  updateProjectStatus
} = projectsSlice.actions;

// Selectors
export const selectAllProjects = (state) => state.projects.items;

export const selectFilteredProjects = (state) => {
  const { items, selectedCategory, selectedListingType, searchQuery } = state.projects;
  return items.filter(project => {
    const matchesListing =
      selectedListingType === 'All' || project.listingType === selectedListingType;
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesListing && matchesCategory && matchesSearch;
  });
};

// Convenience selector: only For Rent listings (used in Home featured section)
export const selectRentProperties = (state) =>
  state.projects.items.filter(p => p.listingType === 'For Rent');

export default projectsSlice.reducer;
