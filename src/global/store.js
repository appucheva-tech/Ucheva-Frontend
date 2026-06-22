import { configureStore } from "@reduxjs/toolkit";
import { userReducer, staffReducer } from "./userSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const persistConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    staff: staffReducer,
    // parent: parentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
