import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import adminReducer from './Admin/AdminSlice';
import adminUsersReducer from './Admin/Admin-UserSlice';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import persistStore from "redux-persist/es/persistStore";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  adminUsers: adminUsersReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Add persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export persistor
export const persistor = persistStore(store);

// Export types for RootState and AppDispatch
export default store;
