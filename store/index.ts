import { configureStore } from "@reduxjs/toolkit";
import filesSlice from "./file-store";
import userSlice from "./user-store";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    files: filesSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
