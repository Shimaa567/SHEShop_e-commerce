import { Product } from "../../../types/Product";

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_FULFILLED = "PRODUCT_LIST_FULFILLED";
export const PRODUCT_LIST_REJECTED = "PRODUCT_LIST_REJECTED";

export interface ProductState {
  products?: Array<Product>;
  page?: string | number;
  pages?: string | number;
  loading?: boolean | null;
  error?: string | null;
  success?: boolean | null;
  product?: Product;
}

export interface ProductList {
  type: typeof PRODUCT_LIST_REQUEST;
}
export interface ProductListFulfilled {
  type: typeof PRODUCT_LIST_FULFILLED;
  payload: ProductState;
}
export interface ProductListRejected {
  type: typeof PRODUCT_LIST_REJECTED;
  payload: string;
}

export type ProductListAction =
  | ProductList
  | ProductListFulfilled
  | ProductListRejected;
