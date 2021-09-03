import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { STATE_CACHE } from "../common/constants";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import Panel from "../components/Panel";
import { useLoader } from "../hooks/useLoader";
import { useProducts } from "../hooks/useProducts";
import { productActions } from "../redux/slice/products";
import { AppDispatch, store } from "../redux/store";
import { getStoreItem, storeItem } from "../utils";
import styles from "./style.module.scss";

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useProducts();
  const loading = useLoader();
  const getCachedProducts = () => {
    const data = getStoreItem(STATE_CACHE);
    return data ? data.products : null;
  };
  useEffect(() => {
    const cachedProducts = getCachedProducts();
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      storeItem(STATE_CACHE, state);
    });
    if (cachedProducts) {
      dispatch(productActions.set(cachedProducts));
    } else {
      dispatch(productActions.populate());
    }
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <Panel products={products} loading={loading} />
      <AddProductModal />
      <EditProductModal />
    </div>
  );
};

export default App;
