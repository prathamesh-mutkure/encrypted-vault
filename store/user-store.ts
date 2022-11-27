import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user-model";

export interface UserState {
  user: User;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: { id: null, name: null, username: null, publicKey: null },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (
      state: UserState,
      action: PayloadAction<typeof initialState.user>
    ) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    clearUser: (state: UserState) => {
      state = initialState;
    },
  },
});

const userActions = userSlice.actions;

export default userSlice;
export { userActions };
