import { createAsyncThunk } from '@reduxjs/toolkit';
import * as documentsApi from 'api/documents';
import { toast } from 'react-toastify';

export const getAllDocuments = createAsyncThunk(
  '/documents/getAll',
  async (_, { rejectWithValue }) => {
    return documentsApi
      .getAllDocuments()
      .then((res) => ({ documents: res.data.documents }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const createCommment = createAsyncThunk(
  '/documents/createCommment',
  async ({ id, text }, { rejectWithValue }) =>
    documentsApi
      .createCommment(id, text)
      .then((res) => ({
        document: res.data.document,
      }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      })
);
export const createDocument = createAsyncThunk(
  '/documents/createOne',
  async (document, { rejectWithValue }) => {
    return documentsApi
      .createDocument(document)
      .then((resData) => {
        console.log('resData', resData);
        return { document: resData.document };
      })
      .catch((err) => {
        console.log('err', err);
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

export const assignUsers = createAsyncThunk(
  '/documents/assignUsers',
  async ({ id, userIds }, { rejectWithValue }) => {
    return documentsApi
      .assignUsers(id, userIds)
      .then((res) => ({ document: res.data.document }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

export const submitDocument = createAsyncThunk(
  '/documents/submitDocument',
  async ({ id, document }, { rejectWithValue }) => {
    return documentsApi
      .submitDocument(id, document)
      .then((res) => ({ document: res.data.document }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

export const deleteDocument = createAsyncThunk(
  '/documents/deleteOne',
  async (id, { rejectWithValue }) => {
    return documentsApi
      .deleteDocument(id)
      .then((res) => ({ document: res.data.document }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);

export const updateDocument = createAsyncThunk(
  '/documents/updateOne',
  async ({ id, updatedDocument }, { rejectWithValue }) => {
    return documentsApi
      .updateDocument(id, updatedDocument)
      .then((resData) => ({ document: resData.document }))
      .catch((err) => {
        toast.error(err.message);
        return rejectWithValue(err);
      });
  }
);
