import { createAsyncThunk } from '@reduxjs/toolkit';
import * as backtestsApi from 'api/backtests';
import { toast } from 'react-toastify';

export const getAllBackTests = createAsyncThunk(
  '/backtests/getAll',
  async (_, { rejectWithValue }) => {
    return backtestsApi
      .getAllBacktests()
      .then((res) => ({ backtests: res.data.backtests }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);
