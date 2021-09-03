export interface IProduct {
  id: string;
  name: string;
  price: number;
  prices: {
    id: number | string;
    price: number;
    date: string;
  }[];
}

export interface ModalType {
  edit: { show: boolean; params?: IProduct };
  add: { show: boolean; params?: IProduct };
}
