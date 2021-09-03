import { useSelector } from "../redux/store";

export const useModal = () => useSelector((state) => state.modal);
