import { CartItem } from "../cartDetails/types";
import { ShippingAddress } from "../cartDetails/types";

export const ORDER_CREATE_REQUEST = "ORDER_CREATE_REQUEST";
export const ORDER_CREATE_FULFILLED = "ORDER_CREATE_FULFILLED";
export const ORDER_CREATE_REJECTED = "ORDER_CREATE_REJECTED";
export const ORDER_CREATE_RESET = "ORDER_CREATE_RESET";

export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_FULFILLED = "ORDER_DETAILS_FULFILLED";
export const ORDER_DETAILS_REJECTED = "ORDER_DETAILS_REJECTED";

export const ORDER_PAY_REQUEST = "ORDER_PAY_REQUEST";
export const ORDER_PAY_FULFILLED = "ORDER_PAY_FULFILLED";
export const ORDER_PAY_REJECTED = "ORDER_PAY_REJECTED";
export const ORDER_PAY_RESET = "ORDER_PAY_RESET";

export interface OrderState {
  order?: OrderInfo;
  loading?: boolean | null;
  success?: boolean;
  error?: string;
}

export interface OrderInfo {
  orderItems?: Array<CartItem>;
  _id?: string;
  shippingAddress?: ShippingAddress;
  paymentMethod?: string;
  itemsPrice?: number;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice?: number;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
}

export interface PaymentResult {
  _id: string;
  status: number;
  update_time: Date;
  email_address: string;
}

export interface OrderCreate {
  type: typeof ORDER_CREATE_REQUEST;
}

export interface OrderCreateFulfilled {
  type: typeof ORDER_CREATE_FULFILLED;
  payload: OrderInfo;
}

export interface OrderCreateRejected {
  type: typeof ORDER_CREATE_REJECTED;
  payload: string;
}

export interface OrderCreateReset {
  type: typeof ORDER_CREATE_RESET;
}

export interface OrderDetails {
  type: typeof ORDER_DETAILS_REQUEST;
}

export interface OrderDetailsFulfilled {
  type: typeof ORDER_DETAILS_FULFILLED;
  payload: OrderInfo;
}

export interface OrderDetailsRejected {
  type: typeof ORDER_DETAILS_REJECTED;
  payload: string;
}

export interface OrderPay {
  type: typeof ORDER_PAY_REQUEST;
}

export interface OrderPayFulfilled {
  type: typeof ORDER_PAY_FULFILLED;
}

export interface OrderPayRejected {
  type: typeof ORDER_PAY_REJECTED;
  payload: string;
}

export interface OrderPayReset {
  type: typeof ORDER_PAY_RESET;
}

export type OrderActions =
  | OrderCreate
  | OrderCreateFulfilled
  | OrderCreateRejected
  | OrderCreateReset
  | OrderDetails
  | OrderDetailsFulfilled
  | OrderDetailsRejected
  | OrderPay
  | OrderPayFulfilled
  | OrderPayRejected
  | OrderPayReset;
