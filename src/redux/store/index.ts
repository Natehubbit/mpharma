import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as appSelector,
} from "react-redux";
import { loaderSlice } from "../slice/loader";
import { modalSlice } from "../slice/modal";
import { productSlice } from "../slice/products";

export const store = configureStore({
  reducer: {
    [loaderSlice.name]: loaderSlice.reducer,
    [productSlice.name]: productSlice.reducer,
    [modalSlice.name]: modalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> =
  appSelector;
