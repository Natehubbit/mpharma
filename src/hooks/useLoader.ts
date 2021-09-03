import { useSelector } from "../redux/store";

export const useLoader = () => useSelector((state) => state.loader);
