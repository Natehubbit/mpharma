import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const { actions, ...loaderSlice } = createSlice({
  name: "loader",
  initialState,
  reducers: {
    loading: () => true,
    loaded: () => false,
  },
});

export const loaderActions = {
  ...actions,
};
