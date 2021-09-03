import { API_URL } from "../common/constants";
import moment from "moment";
import { IProduct } from "../@types";
import { serverInstance } from "../common/config";

export default class ProductService {
  static async getProducts(
    data?: Partial<IProduct[]>
  ): Promise<IProduct[]> {
    try {
      const result = data
        ? { data: { products: data } }
        : await serverInstance.get(API_URL);
      return (
        result &&
        (result.data.products as IProduct[]).map((product) => {
          const finalPrice = (product.prices as any).reduce(
            (prev: any, curr: any) => {
              if (moment(prev.date).isAfter(curr.date)) {
                return prev;
              }
              return curr;
            },
            product.prices[0]
          );
          return {
            id: product.id.toString(),
            name: product.name,
            price: finalPrice.price,
            prices: [...(product.prices as any)].sort(
              (
                a: IProduct["prices"][number],
                b: IProduct["prices"][number]
              ) => moment(a.date).unix() - moment(b.date).unix()
            ),
          };
        })
      );
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
