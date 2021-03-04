//import { Product } from '../../../types/Product';

import { Product } from "../../../types/Product";

export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";

export interface CartState {
  //product?: Product;
  cartItems: Array<CartItem>;
}
export interface CartItem {
  product: string | number;
  name?: string;
  image?: string;
  price?: string | number;
  countInStock?: number;
  qty?: number;
}

export interface AddToCart {
  type: typeof CART_ADD_ITEM;
  payload: CartItem;
}

export interface RemoveFromCart {
  type: typeof CART_REMOVE_ITEM;
  payload: string;
}

export type CartActions = AddToCart | RemoveFromCart;
