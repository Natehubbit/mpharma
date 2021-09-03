import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { IProduct } from "../../@types";
import { useModal } from "../../hooks/useModal";
import { modalActions } from "../../redux/slice/modal";
import { productActions } from "../../redux/slice/products";
import { AppDispatch } from "../../redux/store";
import {
  generateId,
  validate,
  validateNumber,
  validateString,
} from "../../utils";
import Button from "../Button";
import styles from "./style.module.scss";

interface AddProductModalProps {
  onAdd?: (data: Partial<IProduct>) => void;
}

const AddProductModal: FC<AddProductModalProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [adding, setAdding] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const {
    add: { show },
  } = useModal();
  const [form, setForm] = useState<Partial<IProduct>>({
    id: undefined,
    name: undefined,
    price: undefined,
  });
  const hasErrors = errors.length > 0;
  const reset = () => {
    setForm({
      id: undefined,
      name: undefined,
      price: undefined,
    });
    setErrors([]);
    setAdding(false);
  };
  useEffect(() => {
    return () => reset();
  }, [show]);

  const onChange = (
    { target: { value } }: ChangeEvent<HTMLInputElement>,
    key: keyof Omit<IProduct, "id">
  ) => {
    let valid = false;
    if (key === "price") {
      valid = validateNumber(value);
    } else {
      valid = validateString(value);
    }
    return valid && setForm((f) => ({ ...f, [key]: value }));
  };
  const onClose = () => {
    dispatch(modalActions.collapse({ modal: "add" }));
  };
  const onAddClicked = () => {
    setAdding(true);
    const id = generateId();
    const formVal = { ...form, id } as IProduct;
    const { errors: validationErrors, valid } = validate(formVal);
    if (!valid) {
      setErrors((errs) => [...errs, ...validationErrors]);
    } else {
      dispatch(productActions.add(formVal));
      onClose();
    }
    setAdding(false);
  };
  if (!show) return null;
  return (
    <div className={styles.root}>
      <div data-testid="add-modal" className={styles.container}>
        <span
          data-testid="close-icon"
          onClick={onClose}
          className={styles.close}
        >
          &times;
        </span>
        <h2>Add Product</h2>
        <div className={styles.form}>
          <input
            data-testid="product-name"
            onChange={(e) => onChange(e, "name")}
            value={form["name"] || ""}
            placeholder="Name"
          />
          <input
            data-testid="product-price"
            onChange={(e) => onChange(e, "price")}
            value={form["price"] || ""}
            placeholder="Price"
          />
          <Button
            data-testid="add-button"
            role="button"
            disabled={adding}
            onClick={onAddClicked}
          >
            {adding ? "adding..." : "Add"}
          </Button>
          {hasErrors ? (
            <ul data-testid="errors" className={styles.errors}>
              {errors.map((e, i) => {
                return <li key={i}>{e}</li>;
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
