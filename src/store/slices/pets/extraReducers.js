import { createAsyncThunk } from '@reduxjs/toolkit';
import * as petsApi from 'api/pets';
import { toast } from 'react-toastify';

export const getAllPets = createAsyncThunk(
  '/pets/getAll',
  async (_, { rejectWithValue }) => {
    return petsApi
      .getAllPets()
      .then((res) => ({ pets: res.data.pets }))
      .catch((err) => {
        console.log('err.message', err.message);
        return rejectWithValue(err);
      });
  }
);

export const createPet = createAsyncThunk(
  '/pets/createOne',
  async (values, { rejectWithValue }) => {
    return petsApi
      .createPet(values)
      .then((resData) => ({ pet: resData.pet }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

export const deletePet = createAsyncThunk(
  '/pets/deleteOne',
  async (id, { rejectWithValue }) => {
    return petsApi
      .deletePet(id)
      .then((res) => id)
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

export const updatePet = createAsyncThunk(
  '/pets/updateOne',
  async ({ id, updatedPet }, { rejectWithValue }) => {
    return petsApi
      .updatePet(id, updatedPet)
      .then((resData) => ({ pet: resData.pet }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);
