import { UserInfo } from "../users/types";
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

export const ORDER_MY_LIST_REQUEST = "ORDER_MY_LIST_REQUEST";
export const ORDER_MY_LIST_FULFILLED = "ORDER_MY_LIST_FULFILLED";
export const ORDER_MY_LIST_REJECTED = "ORDER_MY_LIST_REJECTED";
export const ORDER_MY_LIST_RESET = "ORDER_MY_LIST_RESET";

export const ORDER_LIST_REQUEST = "ORDER_LIST_REQUEST";
export const ORDER_LIST_FULFILLED = "ORDER_LIST_FULFILLED";
export const ORDER_LIST_REJECTED = "ORDER_LIST_REJECTED";

export const ORDER_DELIVERED_REQUEST = "ORDER_DELIVERED_REQUEST";
export const ORDER_DELIVERED_FULFILLED = "ORDER_DELIVERED_FULFILLED";
export const ORDER_DELIVERED_REJECTED = "ORDER_DELIVERED_REJECTED";
export const ORDER_DELIVERED_RESET = "ORDER_DELIVERED_RESET";

export interface OrderState {
  order?: OrderInfo | null;
  orders?: Array<OrderInfo> | null;
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
  createdAt?: Date;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
  user?: UserInfo;
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

export interface OrderMyList {
  type: typeof ORDER_MY_LIST_REQUEST;
}

export interface OrderMyListFulfilled {
  type: typeof ORDER_MY_LIST_FULFILLED;
  payload: Array<OrderInfo>;
}

export interface OrderMyListRejected {
  type: typeof ORDER_MY_LIST_REJECTED;
  payload: string;
}

export interface OrderMyListReset {
  type: typeof ORDER_MY_LIST_RESET;
}

export interface OrderList {
  type: typeof ORDER_LIST_REQUEST;
}

export interface OrderListFulfilled {
  type: typeof ORDER_LIST_FULFILLED;
  payload: Array<OrderInfo>;
}

export interface OrderListRejected {
  type: typeof ORDER_LIST_REJECTED;
  payload: string;
}

export interface OrderDeliver {
  type: typeof ORDER_DELIVERED_REQUEST;
}

export interface OrderDeliverFulfilled {
  type: typeof ORDER_DELIVERED_FULFILLED;
}

export interface OrderDeliverRejected {
  type: typeof ORDER_DELIVERED_REJECTED;
  payload: string;
}

export interface OrderDeliverReset {
  type: typeof ORDER_DELIVERED_RESET;
}

export type OrderListActions =
  | OrderList
  | OrderListFulfilled
  | OrderListRejected;

export type OrderDeliverActions =
  | OrderDeliver
  | OrderDeliverFulfilled
  | OrderDeliverRejected
  | OrderDeliverReset;

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
  | OrderPayReset
  | OrderMyList
  | OrderMyListFulfilled
  | OrderMyListRejected
  | OrderMyListReset;
