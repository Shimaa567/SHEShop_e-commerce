import { ProductState } from "./../products/types";
import { Product } from "../../../types/Product";

export const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
export const PRODUCT_DETAILS_FULFILLED = "PRODUCT_DETAILS_FULFILLED";
export const PRODUCT_DETAILS_REJECTED = "PRODUCT_DETAILS_REJECTED";

export const PRODUCT_DELETE_REQUEST = "PRODUCT_DELETE_REQUEST";
export const PRODUCT_DELETE_FULFILLED = "PRODUCT_DELETE_FULFILLED";
export const PRODUCT_DELETE_REJECTED = "PRODUCT_DELETE_REJECTED";

export const PRODUCT_CREATE_REQUEST = "PRODUCT_CREATE_REQUEST";
export const PRODUCT_CREATE_FULFILLED = "PRODUCT_CREATE_FULFILLED";
export const PRODUCT_CREATE_REJECTED = "PRODUCT_CREATE_REJECTED";
export const PRODUCT_CREATE_RESET = "PRODUCT_CREATE_RESET";

export const PRODUCT_UPDATE_REQUEST = "PRODUCT_UPDATE_REQUEST";
export const PRODUCT_UPDATE_FULFILLED = "PRODUCT_UPDATE_FULFILLED";
export const PRODUCT_UPDATE_REJECTED = "PRODUCT_UPDATE_REJECTED";
export const PRODUCT_UPDATE_RESET = "PRODUCT_UPDATE_RESET";

export const PRODUCT_CREATE_REVIEW_REQUEST = "PRODUCT_CREATE_REVIEW_REQUEST";
export const PRODUCT_CREATE_REVIEW_FULFILLED =
  "PRODUCT_CREATE_REVIEW_FULFILLED";
export const PRODUCT_CREATE_REVIEW_REJECTED = "PRODUCT_CREATE_REVIEW_REJECTED";
export const PRODUCT_CREATE_REVIEW_RESET = "PRODUCT_CREATE_REVIEW_RESET";

export const PRODUCT_TOP_REQUEST = "PRODUCT_TOP_REQUEST";
export const PRODUCT_TOP_FULFILLED = "PRODUCT_TOP_FULFILLED";
export const PRODUCT_TOP_REJECTED = "PRODUCT_TOP_REJECTED";

export interface ProductDetailsState {
  product?: Product;
  loading?: boolean | null;
  error?: string;
  success?: boolean | null;
  //productReview?: ProductReview;
}

export interface ProductReview {
  _id?: string | number | undefined;
  rating?: number | string;
  comment?: string;
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

export interface ProductCreate {
  type: typeof PRODUCT_CREATE_REQUEST;
}
export interface ProductCreateFulfilled {
  type: typeof PRODUCT_CREATE_FULFILLED;
  payload: Product;
}
export interface ProductCreateRejected {
  type: typeof PRODUCT_CREATE_REJECTED;
  payload: string;
}
export interface ProductCreateReset {
  type: typeof PRODUCT_CREATE_RESET;
}

export interface ProductUpdate {
  type: typeof PRODUCT_UPDATE_REQUEST;
}
export interface ProductUpdateFulfilled {
  type: typeof PRODUCT_UPDATE_FULFILLED;
  payload: Product;
}
export interface ProductUpdateRejected {
  type: typeof PRODUCT_UPDATE_REJECTED;
  payload: string;
}
export interface ProductUpdateReset {
  type: typeof PRODUCT_UPDATE_RESET;
}

export interface ProductCreateReview {
  type: typeof PRODUCT_CREATE_REVIEW_REQUEST;
}
export interface ProductCreateReviewFulfilled {
  type: typeof PRODUCT_CREATE_REVIEW_FULFILLED;
}
export interface ProductCreateReviewRejected {
  type: typeof PRODUCT_CREATE_REVIEW_REJECTED;
  payload: string;
}
export interface ProductCreateReviewReset {
  type: typeof PRODUCT_CREATE_REVIEW_RESET;
}

export interface ProductTopRated {
  type: typeof PRODUCT_TOP_REQUEST;
}
export interface ProductTopRatedFulfilled {
  type: typeof PRODUCT_TOP_FULFILLED;
  payload: ProductState;
}
export interface ProductTopRatedRejected {
  type: typeof PRODUCT_TOP_REJECTED;
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

export type ProductCreateActions =
  | ProductCreate
  | ProductCreateFulfilled
  | ProductCreateRejected
  | ProductCreateReset;

export type ProductUpdateActions =
  | ProductUpdate
  | ProductUpdateFulfilled
  | ProductUpdateRejected
  | ProductUpdateReset;

export type ProductCreateReviewActions =
  | ProductCreateReview
  | ProductCreateReviewFulfilled
  | ProductCreateReviewRejected
  | ProductCreateReviewReset;

export type ProductTopRatedActions =
  | ProductTopRated
  | ProductTopRatedFulfilled
  | ProductTopRatedRejected;
