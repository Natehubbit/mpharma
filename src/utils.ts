import moment from "moment";
import { nanoid } from "nanoid";

export const generateId = () => {
  return nanoid();
};

export const validate = (
  data: object
): { errors: string[]; valid: boolean } => {
  const errors: string[] = [];
  Object.entries(data).every(([key, value]) => {
    if (!value) {
      errors.push(`No ${key} present.`);
      return [key, value];
    }
    return [key, value];
  });
  return { errors, valid: errors.length < 1 };
};

export const getCashValue = (value: string) => {
  const numberFormat = Intl.NumberFormat("en-US", {
    useGrouping: true,
    style: "currency",
    currency: "GHS",
  });
  const cash = numberFormat.format(Number(value));
  return `${cash}`;
};

export const validateString = (country: string) => {
  var format = /[!@#$%^&*()_+=\\[\]{};:"\\|~`,.<>\\/?]+/;
  if (format.test(country)) {
    return false;
  } else {
    return true;
  }
};

export const validateNumber = (value: string) => {
  var format = /[!@#$%^&*()_+=\\[\]{};\-:"\\|'~`,<>\\/?a-zA-Z\s]+/;
  if (format.test(value)) {
    return false;
  } else {
    return true;
  }
};

export const formatDate = (value: string) => {
  return moment(value).format("DD/MMM/YYYY");
};

export const storeItem = (key: string, value: any) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getStoreItem = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
