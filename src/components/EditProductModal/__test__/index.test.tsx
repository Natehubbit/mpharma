import {
  getByPlaceholderText,
  queryByTestId,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import EditProductModal from "..";
import { MOCK_PRODUCTS } from "../../../common/constants";
import { modalActions } from "../../../redux/slice/modal";
import { productActions } from "../../../redux/slice/products";
import { store } from "../../../redux/store";
import ProductService from "../../../services/ProductsService";

test("renders EditProductModal, edits name and price fields and saves successfully", async () => {
  const data = await ProductService.getProducts(MOCK_PRODUCTS);
  const product = data[0];
  store.dispatch(productActions.set(data));
  store.dispatch(
    modalActions.popup({ modal: "edit", params: product })
  );
  const {
    getByTestId,
    getByPlaceholderText,
    getByText,
    queryByTestId,
  } = render(
    <Provider store={store}>
      <EditProductModal />
    </Provider>
  );

  const modal = getByTestId("edit-modal");
  expect(modal).toBeTruthy();

  expect(screen.getByDisplayValue(product.name)).toBeTruthy();
  expect(screen.getByDisplayValue(product.price)).toBeTruthy();

  const nameInput = getByPlaceholderText("Name");
  const priceInput = getByPlaceholderText("Price");
  const saveBtn = getByText("Save");

  userEvent.clear(nameInput);
  userEvent.clear(priceInput);
  userEvent.type(nameInput, "Paracetamol 10mg");
  userEvent.type(priceInput, "5");

  expect(screen.queryByDisplayValue("Paracetamol 10mg")).toBeTruthy();
  expect(screen.queryByDisplayValue("5")).toBeTruthy();
  expect(screen.queryByText("Save")).toBeTruthy();

  userEvent.click(saveBtn);
  expect(queryByTestId("edit-modal")).toBeNull();
});

test("hide EditProductModal when close is clicked", async () => {
  store.dispatch(modalActions.popup({ modal: "edit" }));
  const { getByTestId, queryByTestId } = render(
    <Provider store={store}>
      <EditProductModal />
    </Provider>
  );

  let modal = getByTestId("edit-modal");
  let closeBtn = getByTestId("close-icon");

  expect(modal).toBeTruthy();
  expect(closeBtn).toBeTruthy();

  userEvent.click(closeBtn);

  expect(queryByTestId("close-icon")).toBeNull();
  expect(queryByTestId("edit-modal")).toBeNull();
});

test("populate EditProductModal with wrong inputs and submit", async () => {
  const data = await ProductService.getProducts(MOCK_PRODUCTS);
  const product = data[0];
  store.dispatch(productActions.set(data));
  store.dispatch(
    modalActions.popup({ modal: "edit", params: product })
  );
  const {
    queryByTestId,
    getByTestId,
    getByPlaceholderText,
    getByText,
  } = render(
    <Provider store={store}>
      <EditProductModal />
    </Provider>
  );

  const modal = getByTestId("edit-modal");
  expect(modal).toBeTruthy();

  expect(screen.getByDisplayValue(product.name)).toBeTruthy();
  expect(screen.getByDisplayValue(product.price)).toBeTruthy();

  const nameInput = getByPlaceholderText("Name");
  const priceInput = getByPlaceholderText("Price");
  const saveBtn = getByText("Save");

  userEvent.clear(nameInput);
  userEvent.clear(priceInput);
  userEvent.type(nameInput, "Chloroquine 50mg");
  userEvent.type(priceInput, "two thousand");
  userEvent.click(saveBtn);

  const errors = getByTestId("errors");
  expect(errors.children.length).toBe(1);
  expect(queryByTestId("edit-modal")).toBeTruthy();
});
