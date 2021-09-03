import React, { FC, useState } from "react";
import { Edit, Trash } from "react-feather";
import { useDispatch } from "react-redux";
import { IProduct } from "../../@types";
import { useProducts } from "../../hooks/useProducts";
import { modalActions } from "../../redux/slice/modal";
import { productActions } from "../../redux/slice/products";
import { AppDispatch } from "../../redux/store";
import { formatDate, getCashValue } from "../../utils";
import AddProductModal from "../AddProductModal";
import EditProductModal from "../EditProductModal";
import IconButton from "../IconButton";
import styles from "./style.module.scss";

interface PanelItemProps {
  product: IProduct;
}

const PanelItem: FC<PanelItemProps> = ({ product }) => {
  const dispatch: AppDispatch = useDispatch();
  const [showHistory, setShowHistory] = useState(false);
  const products = useProducts();
  const onDelete = (id: string) => {
    dispatch(productActions.remove(id));
  };
  const onEdit = (id: string) => {
    const product = products.find((p) => p.id === id);
    dispatch(modalActions.popup({ modal: "edit", params: product }));
  };
  const toggleHistoricalPrice = () => {
    setShowHistory((val) => !val);
  };
  return (
    <>
      <li
        data-testid="panel-item"
        className={styles.container}
        key={product.id}
      >
        <div className={styles.info}>
          <div>
            <div className={styles.name}>{product.name}</div>
            <div className={styles.price}>
              {getCashValue(product.price.toString())}{" "}
              <button
                onClick={toggleHistoricalPrice}
                className={styles.historicalPrice}
                data-testid="prices-toggle"
              >
                historical prices
              </button>
            </div>
          </div>
          <span>
            <span className={styles.actions}>
              <IconButton
                data-testid="delete"
                onClick={() => onDelete(product.id)}
                mode="delete"
                icon={<Trash />}
              />
              <IconButton
                data-testid="edit"
                onClick={() => onEdit(product.id)}
                mode="edit"
                icon={<Edit />}
              />
            </span>
          </span>
        </div>
        {showHistory && (
          <>
            <h4>Historical Prices</h4>
            <div data-testid="prices" className={styles.prices}>
              {product.prices.map((price) => {
                return (
                  <div className={styles.priceItem} key={price.id}>
                    <span className={styles.date}>
                      {formatDate(price.date)}
                    </span>
                    <span>
                      {getCashValue(price.price.toString())}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </li>
      <AddProductModal />
      <EditProductModal />
    </>
  );
};

export default PanelItem;
