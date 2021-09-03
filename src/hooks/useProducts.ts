import { useSelector } from "../redux/store";

export const useProducts = () =>
  useSelector((state) => state.products);
