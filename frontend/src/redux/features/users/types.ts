export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_FULFILLED = "USER_LOGIN_FULFILLED";
export const USER_LOGIN_REJECTED = "USER_LOGIN_REJECTED";
export const USER_LOGOUT = "USER_LOGOUT";

export interface UserState {
  userInfo?: UserInfo | null;
  loading?: boolean | null;
  error?: string;
}

export interface UserInfo {
  _id?: string;
  name?: string;
  isAdmin?: boolean;
  email?: string;
  token?: string;
  password?: string;
  password_repeat?: string;
}

export interface Login {
  type: typeof USER_LOGIN_REQUEST;
}
export interface LoginFulfilled {
  type: typeof USER_LOGIN_FULFILLED;
  payload: UserInfo;
}
export interface LoginRejected {
  type: typeof USER_LOGIN_REJECTED;
  payload: string;
}
export interface Logout {
  type: typeof USER_LOGOUT;
}

export type UserAction = Login | LoginFulfilled | LoginRejected | Logout;
