import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllBackTests } from './extraReducers';

const initialState = {
  fetching: false,
  loading: false,
  backtests: [],
};

const servicesSlice = createSlice({
  name: 'backtests',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllBackTests.pending]: (state) => {
      state.fetching = true;
    },
    [getAllBackTests.fulfilled]: (state, { payload }) => ({
      ...state,
      fetching: false,
      backtests: payload.backtests,
    }),
    [getAllBackTests.rejected]: (state) => ({
      ...state,
      fetching: false,
      backtests: [],
    }),
  },
});

export default servicesSlice;
