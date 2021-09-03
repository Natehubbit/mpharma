import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Panel from "..";
import { MOCK_PRODUCTS } from "../../../common/constants";
import { productActions } from "../../../redux/slice/products";
import { store } from "../../../redux/store";
import ProductService from "../../../services/ProductsService";

test("render list of products on Panel successfully", async () => {
  const data = await ProductService.getProducts(MOCK_PRODUCTS);
  const { getByTestId } = render(
    <Provider store={store}>
      <Panel products={data} loading={false} />
    </Provider>
  );
  const list = getByTestId("panel-list");
  expect(list.children.length).toBeGreaterThanOrEqual(
    MOCK_PRODUCTS.length
  );
});

test("render empty list of products on Panel successfully", async () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Panel products={[]} loading={false} />
    </Provider>
  );
  const list = getByTestId("panel-list");
  expect(list.children.length).toBe(1);
  expect(screen.queryByText("No products found")).toBeTruthy();
});

test("render a loading indicator on Panel successfully", async () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Panel products={[]} loading={true} />
    </Provider>
  );
  const list = getByTestId("panel-list");
  expect(list.children.length).toBe(1);
  expect(screen.queryByText("loading...")).toBeTruthy();
});
