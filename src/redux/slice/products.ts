import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../@types";
import ProductService from "../../services/ProductsService";
import { generateId } from "../../utils";
import { AppDispatch } from "../store";
import { loaderActions } from "./loader";

const initialState: IProduct[] = [];

export const { actions, ...productSlice } = createSlice({
  name: "products",
  initialState,
  reducers: {
    set: (_, { payload }: PayloadAction<IProduct[]>) => {
      return payload;
    },
    add: (state, { payload }: PayloadAction<IProduct>) => {
      const hasProduct =
        state.filter(
          (p) => p.name.toLowerCase() === payload.name.toLowerCase()
        ).length > 0;
      return !hasProduct
        ? [
            ...state,
            {
              ...payload,
              prices: [
                {
                  id: generateId(),
                  date: new Date().toISOString(),
                  price: payload.price,
                },
              ],
            },
          ]
        : state;
    },
    remove: (state, { payload }: PayloadAction<string>) => {
      return state.filter((product) => product.id !== payload);
    },
    update: (
      state,
      { payload }: PayloadAction<Partial<IProduct>>
    ) => {
      return state.map((product) => {
        if (product.id === payload.id) {
          if (product.price !== payload.price) {
            return {
              ...product,
              ...payload,
              prices: [
                ...product.prices,
                {
                  id: generateId(),
                  date: new Date().toISOString(),
                  price: payload.price!,
                },
              ],
            };
          }
          return { ...product, ...payload };
        }
        return product;
      });
    },
  },
});

const populate = () => async (dispatch: AppDispatch) => {
  dispatch(loaderActions.loading());
  const result = await ProductService.getProducts();
  dispatch(actions.set(result));
  dispatch(loaderActions.loaded());
};

export const productActions = {
  ...actions,
  populate,
};
