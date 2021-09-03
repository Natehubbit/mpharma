import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import AddProductModal from "..";
import { modalActions } from "../../../redux/slice/modal";
import { productActions } from "../../../redux/slice/products";
import { store } from "../../../redux/store";

test("loads AddProductModal", async () => {
  store.dispatch(modalActions.popup({ modal: "add" }));
  const { getByTestId } = render(
    <Provider store={store}>
      <AddProductModal />
    </Provider>
  );
  expect(getByTestId("add-modal")).toBeTruthy();
  expect(getByTestId("close-icon")).toBeTruthy();
});

test("hide AddProductModal when close is clicked", async () => {
  store.dispatch(modalActions.popup({ modal: "add" }));
  const { getByTestId, queryByTestId } = render(
    <Provider store={store}>
      <AddProductModal />
    </Provider>
  );

  let modal = getByTestId("add-modal");
  let closeBtn = getByTestId("close-icon");

  expect(modal).toBeTruthy();
  expect(closeBtn).toBeTruthy();

  userEvent.click(closeBtn);

  expect(queryByTestId("close-icon")).toBeNull();
  expect(queryByTestId("add-modal")).toBeNull();
});

test("populate AddProductModal with correct inputs and submit", async () => {
  store.dispatch(modalActions.popup({ modal: "add" }));
  const { queryByTestId, getByTestId } = render(
    <Provider store={store}>
      <AddProductModal />
    </Provider>
  );

  const nameInput = getByTestId("product-name");
  const priceInput = getByTestId("product-price");
  const addBtn = getByTestId("add-button");

  userEvent.type(nameInput, "Chloroquine 50mg");
  userEvent.type(priceInput, "2.5");
  userEvent.click(addBtn);

  expect(queryByTestId("add-modal")).toBeNull();
});

test("populate AddProductModal with price as alphabets and submit", async () => {
  store.dispatch(modalActions.popup({ modal: "add" }));
  const { queryByTestId, getByTestId } = render(
    <Provider store={store}>
      <AddProductModal />
    </Provider>
  );

  const nameInput = getByTestId("product-name");
  const priceInput = getByTestId("product-price");
  const addBtn = getByTestId("add-button");

  userEvent.type(nameInput, "Chloroquine 50mg");
  userEvent.type(priceInput, "two thousand");
  userEvent.click(addBtn);

  const errors = getByTestId("errors");
  expect(errors.children.length).toBe(1);
  expect(queryByTestId("add-modal")).not.toBeNull();
});

test("submit AddProductModal with empty fields", async () => {
  store.dispatch(modalActions.popup({ modal: "add" }));
  const { queryByTestId, getByTestId } = render(
    <Provider store={store}>
      <AddProductModal />
    </Provider>
  );

  const nameInput = getByTestId("product-name");
  const priceInput = getByTestId("product-price");
  const addBtn = getByTestId("add-button");

  userEvent.type(nameInput, "");
  userEvent.type(priceInput, "");
  userEvent.click(addBtn);

  const errors = getByTestId("errors");
  expect(errors.children.length).toBe(2);
  expect(queryByTestId("add-modal")).not.toBeNull();
});
