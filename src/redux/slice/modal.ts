import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ModalType } from "../../@types";

const initialState: ModalType = {
  edit: {
    show: false,
    params: undefined,
  },
  add: {
    show: false,
    params: undefined,
  },
};

export const { actions, ...modalSlice } = createSlice({
  name: "modal",
  initialState,
  reducers: {
    popup: (state, { payload }: PayloadAction<ModalPayload>) => {
      return {
        ...state,
        [payload.modal]: {
          show: true,
          params: payload.params,
        },
      };
    },
    collapse: (state, { payload }: PayloadAction<ModalPayload>) => {
      return {
        ...state,
        [payload.modal]: {
          show: false,
          params: undefined,
        },
      };
    },
  },
});

export const modalActions = {
  ...actions,
};

interface ModalPayload {
  modal: keyof ModalType;
  params?: any;
}
