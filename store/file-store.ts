import { createSlice } from "@reduxjs/toolkit";

type FileState = {
  files: any[];
};

const filesSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
  } as FileState,
  reducers: {
    setFiles(state: FileState, action) {
      state.files = action.payload;
    },
  },
});

export const filesActions = filesSlice.actions;
export default filesSlice;
