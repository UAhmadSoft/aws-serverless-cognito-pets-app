import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices';

import petsSlice from './slices/pets';

const store = configureStore({
  reducer: combineReducers({
    auth: authSlice.reducer,
    pets: petsSlice.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
