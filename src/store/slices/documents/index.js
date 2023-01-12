import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createCommment,
  createDocument,
  deleteDocument,
  getAllDocuments,
  updateDocument,
} from './extraReducers';

const initialState = {
  fetching: false,
  loading: false,
  documents: [],
};

const servicesSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllDocuments.pending]: (state) => {
      state.fetching = true;
    },
    [getAllDocuments.fulfilled]: (state, { payload }) => ({
      ...state,
      fetching: false,
      documents: payload.documents,
    }),
    [getAllDocuments.rejected]: (state) => ({
      ...state,
      fetching: false,
      documents: [],
    }),

    [createDocument.pending]: (state) => {
      state.loading = true;
    },
    [createDocument.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.documents = state.documents
        ? [...state.documents, payload.document]
        : [payload.document];
    },
    [createDocument.rejected]: (state) => {
      state.loading = false;
    },

    [createCommment.pending]: (state) => {
      state.loading = true;
    },
    [createCommment.fulfilled]: (state, { payload }) => ({
      ...state,
      loading: false,
      documents: state.documents.map((el) =>
        el._id === payload.document._id ? payload.document : el
      ),
    }),
    [createCommment.rejected]: (state) => {
      state.loading = false;
    },
    [updateDocument.pending]: (state) => {
      state.loading = true;
    },
    [updateDocument.fulfilled]: (state, { payload }) => ({
      ...state,
      loading: false,
      documents: state.documents.map((el) =>
        el._id === payload.document._id ? payload.document : el
      ),
    }),
    [updateDocument.rejected]: (state) => {
      state.loading = false;
    },

    [deleteDocument.pending]: (state) => {
      state.loading = true;
    },
    [deleteDocument.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.documents = state.documents.filter(
        (el) => el._id !== payload.document._id
      );
      toast.success('Document Deleted Successfully!');
    },
    [deleteDocument.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default servicesSlice;
