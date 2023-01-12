import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createPet, deletePet, getAllPets, updatePet } from './extraReducers';

const initialState = {
  fetching: true,
  loading: false,
  pets: [],
};

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    updateAPet: (state, { payload }) => ({
      ...state,
      loading: false,
      pets: state.pets.map((el) =>
        el._id === payload.campaign._id ? payload.campaign : el
      ),
    }),
  },
  extraReducers: {
    [getAllPets.pending]: (state) => {
      state.fetching = true;
    },
    [getAllPets.fulfilled]: (state, { payload }) => ({
      ...state,
      fetching: false,
      pets: payload.pets,
    }),
    [getAllPets.rejected]: (state) => ({
      ...state,
      fetching: false,
      pets: [],
    }),

    [createPet.pending]: (state) => {
      state.loading = true;
    },
    [createPet.fulfilled]: (state, { payload }) => {
      toast.success('Pet Created Successfully!');

      state.loading = false;
      state.pets = state.pets ? [...state.pets, payload.pet] : [payload.pet];
    },
    [createPet.rejected]: (state) => {
      state.loading = false;
    },

    [updatePet.pending]: (state) => {
      state.loading = true;
    },
    [updatePet.fulfilled]: (state, { payload }) => ({
      ...state,
      loading: false,
      pets: state.pets.map((el) =>
        el._id === payload.pet._id ? payload.pet : el
      ),
    }),
    [updatePet.rejected]: (state) => {
      state.loading = false;
    },

    [deletePet.pending]: (state) => {
      state.loading = true;
    },
    [deletePet.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.pets = state.pets.filter((el) => el.id !== payload);
      toast.success('Pet Deleted Successfully!');
    },
    [deletePet.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default petsSlice;
