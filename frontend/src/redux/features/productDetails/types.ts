import { Product } from '../../../types/Product';

export const LOAD_DETAILS_PENDING = 'productDetails/LOAD_DETAILS_PENDING';
export const LOAD_DETAILS_FULFILLED = 'productDetails/LOAD_DETAILS_FULFILLED';
export const LOAD_DETAILS_REJECTED = 'productDetails/LOAD_DETAILS_REJECTED';

export interface ProductDetailsState {
  product?: Product;
  loading: boolean | null;
  error?: string;
}

export interface LoadDetailsPending {
  type: typeof LOAD_DETAILS_PENDING;
}
export interface LoadDetailsFulfilled {
  type: typeof LOAD_DETAILS_FULFILLED;
  payload: Product;
}
export interface LoadDetailsRejected {
  type: typeof LOAD_DETAILS_REJECTED;
  payload: string;
}

export type ProductDetailsAction =
  | LoadDetailsPending
  | LoadDetailsFulfilled
  | LoadDetailsRejected;
