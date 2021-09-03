import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";

import { IProduct } from "../../@types";
import { useModal } from "../../hooks/useModal";
import { modalActions } from "../../redux/slice/modal";
import { productActions } from "../../redux/slice/products";
import { AppDispatch } from "../../redux/store";
import {
  validate,
  validateNumber,
  validateString,
} from "../../utils";
import Button from "../Button";
import styles from "./style.module.scss";

interface EditProductModalProps {}

const EditProductModal: FC<EditProductModalProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    edit: { params: product, show },
  } = useModal();
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState<Partial<IProduct>>({
    id: undefined,
    name: undefined,
    price: undefined,
  });
  const hasErrors = errors.length > 0;
  const reset = useCallback(() => {
    setForm({
      id: undefined,
      name: undefined,
      price: undefined,
    });
    setErrors([]);
    setEditing(false);
  }, []);
  useEffect(() => {
    product && setForm(product);
    return () => reset();
    // eslint-disable-next-line
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
    dispatch(modalActions.collapse({ modal: "edit" }));
  };
  const onAddClicked = () => {
    setEditing(true);
    const formVal = { ...form, id: product?.id } as IProduct;
    const { errors: validationErrors, valid } = validate(formVal);
    if (!valid) {
      return setErrors((errs) => [...errs, ...validationErrors]);
    } else {
      dispatch(productActions.update(formVal));
    }
    setEditing(false);
    onClose();
  };
  if (!show) return null;
  return (
    <div className={styles.root}>
      <div data-testid="edit-modal" className={styles.container}>
        <span
          onClick={onClose}
          className={styles.close}
          data-testid="close-icon"
        >
          &times;
        </span>
        <h2>Edit Product</h2>
        {product && (
          <div className={styles.form}>
            <input
              onChange={(e) => onChange(e, "name")}
              value={form["name"] || ""}
              placeholder="Name"
              data-testid="name"
            />
            <input
              onChange={(e) => onChange(e, "price")}
              value={form["price"] || ""}
              placeholder="Price"
              data-testid="price"
            />
            <Button disabled={editing} onClick={onAddClicked}>
              {editing ? "Saving..." : "Save"}
            </Button>
            {hasErrors ? (
              <ul data-testid="errors" className={styles.errors}>
                {errors.map((e, i) => {
                  return <li key={i}>{e}</li>;
                })}
              </ul>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProductModal;
