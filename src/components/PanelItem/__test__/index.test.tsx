import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import PanelItem from "..";
import { MOCK_PRODUCTS } from "../../../common/constants";
import { productActions } from "../../../redux/slice/products";
import { store } from "../../../redux/store";
import ProductService from "../../../services/ProductsService";

test("render successfully", async () => {
  const data = await ProductService.getProducts(MOCK_PRODUCTS);
  render(
    <Provider store={store}>
      <PanelItem product={data[0]} />
    </Provider>
  );
});

test("render successfully and toggle historical prices", async () => {
  const data = await ProductService.getProducts(MOCK_PRODUCTS);
  const { getByTestId, queryByTestId } = render(
    <Provider store={store}>
      <PanelItem product={data[0]} />
    </Provider>
  );

  const pricesBtn = getByTestId("prices-toggle");

  userEvent.click(pricesBtn);
  expect(
    getByTestId("prices").children.length
  ).toBeGreaterThanOrEqual(1);

  userEvent.click(pricesBtn);
  expect(queryByTestId("prices")).toBeNull();
});

test("renders panel item and clicks edit and edit modal renders", async () => {
  const data = await ProductService.getProducts(MOCK_PRODUCTS);
  store.dispatch(productActions.set(data));
  const { getByTestId } = render(
    <Provider store={store}>
      <PanelItem product={data[0]} />
    </Provider>
  );

  const editBtn = getByTestId("edit");

  userEvent.click(editBtn);
  expect(screen.queryByTestId("edit-modal")).toBeTruthy();
});
