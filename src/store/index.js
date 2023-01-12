import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices';

import usersSlice from './slices/users';
import documentsSlice from './slices/documents';
import backtestsSlice from './slices/backtests';
// import questionsSlice from './slices/questions';

const store = configureStore({
  reducer: combineReducers({
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    backtests: backtestsSlice.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
