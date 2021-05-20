import { UserInfo } from "../users/types";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_FULFILLED = "USER_REGISTER_FULFILLED";
export const USER_REGISTER_REJECTED = "USER_REGISTER_REJECTED";

export interface Register {
  type: typeof USER_REGISTER_REQUEST;
}
export interface RegisterFulfilled {
  type: typeof USER_REGISTER_FULFILLED;
  payload: UserInfo;
}
export interface RegisterRejected {
  type: typeof USER_REGISTER_REJECTED;
  payload: string;
}

export type UserRegisterAction =
  | Register
  | RegisterFulfilled
  | RegisterRejected;
