import { Product } from '../../../types/Product';

export const LOAD_PENDING = 'productList/LOAD_PENDING';
export const LOAD_FULFILLED = 'productList/LOAD_FULFILLED';
export const LOAD_REJECTED = 'productList/LOAD_REJECTED';

export interface ProductState {
  products?: Array<Product>;
  loading: boolean | null;
  error?: string;
}

export interface LoadPending {
  type: typeof LOAD_PENDING;
}
export interface LoadFulfilled {
  type: typeof LOAD_FULFILLED;
  payload: Array<Product>;
}
export interface LoadRejected {
  type: typeof LOAD_REJECTED;
  payload: string;
}

export type ProductListAction = LoadPending | LoadFulfilled | LoadRejected;
