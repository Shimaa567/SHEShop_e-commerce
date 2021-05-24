import { Product } from "../../../types/Product";

export const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
export const PRODUCT_DETAILS_FULFILLED = "PRODUCT_DETAILS_FULFILLED";
export const PRODUCT_DETAILS_REJECTED = "PRODUCT_DETAILS_REJECTED";

export const PRODUCT_DELETE_REQUEST = "PRODUCT_DELETE_REQUEST";
export const PRODUCT_DELETE_FULFILLED = "PRODUCT_DELETE_FULFILLED";
export const PRODUCT_DELETE_REJECTED = "PRODUCT_DELETE_REJECTED";

export interface ProductDetailsState {
  product?: Product;
  loading: boolean | null;
  error?: string;
}

export interface ProductDetails {
  type: typeof PRODUCT_DETAILS_REQUEST;
}
export interface ProductDetailsFulfilled {
  type: typeof PRODUCT_DETAILS_FULFILLED;
  payload: Product;
}
export interface ProductDetailsRejected {
  type: typeof PRODUCT_DETAILS_REJECTED;
  payload: string;
}

export interface ProductDelete {
  type: typeof PRODUCT_DELETE_REQUEST;
}
export interface ProductDeleteFulfilled {
  type: typeof PRODUCT_DELETE_FULFILLED;
  payload: Product;
}
export interface ProductDeleteRejected {
  type: typeof PRODUCT_DELETE_REJECTED;
  payload: string;
}

export type ProductDetailsActions =
  | ProductDetails
  | ProductDetailsFulfilled
  | ProductDetailsRejected;

export type ProductDeleteActions =
  | ProductDelete
  | ProductDeleteFulfilled
  | ProductDeleteRejected;
