export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";

export const CART_SAVE_SHIPPING_ADDRESS = "CART_SAVE_SHIPPING_ADDRESS";
export const CART_SAVE_PAYMENT_METHOD = "CART_SAVE_PAYMENT_METHOD";

export interface CartState {
  cartItems: Array<CartItem>;
  shippingAddress?: ShippingAddress;
  paymentMethod?: string;

  itemsPrice?: number;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice?: number;
}
export interface CartItem {
  product: string;
  _id?: string;
  name?: string;
  image?: string;
  price: number;
  countInStock?: number;
  qty: number;
}

export interface ShippingAddress {
  address?: string;
  city?: string;
  postalCode?: number;
  country?: string;
}

export interface AddToCart {
  type: typeof CART_ADD_ITEM;
  payload: CartItem;
}

export interface RemoveFromCart {
  type: typeof CART_REMOVE_ITEM;
  payload: string;
}

export interface SaveShippingAddress {
  type: typeof CART_SAVE_SHIPPING_ADDRESS;
  payload: ShippingAddress;
}

export interface PaymentMethod {
  type: typeof CART_SAVE_PAYMENT_METHOD;
  payload: string;
}

export type CartActions =
  | AddToCart
  | RemoveFromCart
  | SaveShippingAddress
  | PaymentMethod;
