import { FC } from "react";
import { useDispatch } from "react-redux";

import { IProduct } from "../../@types";
import { modalActions } from "../../redux/slice/modal";
import { AppDispatch } from "../../redux/store";
import Button from "../Button";
import PanelItem from "../PanelItem";
import styles from "./style.module.scss";

interface PanelProps {
  products: IProduct[];
  loading: boolean;
}

const Panel: FC<PanelProps> = ({ loading, products }) => {
  const dispatch: AppDispatch = useDispatch();
  const hasProducts = products.length > 0;
  const onAddProduct = () => {
    dispatch(modalActions.popup({ modal: "add" }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>Product List</h1>
        <Button onClick={onAddProduct}>+Add Product</Button>
      </div>
      <ul data-testid="panel-list" className={styles.panelList}>
        {loading ? (
          <p>loading...</p>
        ) : hasProducts ? (
          products.map((p) => {
            return <PanelItem key={p.id} product={p} />;
          })
        ) : (
          <p className={styles.noProducts}>No products found</p>
        )}
      </ul>
    </div>
  );
};

export default Panel;
