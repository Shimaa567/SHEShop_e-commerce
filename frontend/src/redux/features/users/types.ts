export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_FULFILLED = "USER_LOGIN_FULFILLED";
export const USER_LOGIN_REJECTED = "USER_LOGIN_REJECTED";
export const USER_LOGOUT = "USER_LOGOUT";

export const USER_LIST_REQUEST = "USER_LIST_REQUEST";
export const USER_LIST_FULFILLED = "USER_LIST_FULFILLED";
export const USER_LIST_REJECTED = "USER_LIST_REJECTED";
export const USER_LIST_RESET = "USER_LIST_RESET";

export const USER_DELETE_REQUEST = "USER_DELETE_REQUEST";
export const USER_DELETE_FULFILLED = "USER_DELETE_FULFILLED";
export const USER_DELETE_REJECTED = "USER_DELETE_REJECTED";

export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_FULFILLED = "USER_UPDATE_FULFILLED";
export const USER_UPDATE_REJECTED = "USER_UPDATE_REJECTED";
export const USER_UPDATE_RESET = "USER_UPDATE_RESET";

export interface UserState {
  userInfo?: UserInfo | null;
  loading?: boolean | null;
  error?: string;
  users?: Array<UserInfo> | null;
  success?: boolean | null;
  user?: UserInfo | null;
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

export interface UserList {
  type: typeof USER_LIST_REQUEST;
}

export interface UserListFulfilled {
  type: typeof USER_LIST_FULFILLED;
  payload: Array<UserInfo>;
}

export interface UserListRejected {
  type: typeof USER_LIST_REJECTED;
  payload: string;
}

export interface UserListReset {
  type: typeof USER_LIST_RESET;
}

export interface UserDelete {
  type: typeof USER_DELETE_REQUEST;
}

export interface UserDeleteFulfilled {
  type: typeof USER_DELETE_FULFILLED;
}

export interface UserDeleteRejected {
  type: typeof USER_DELETE_REJECTED;
  payload: string;
}

export interface UserUpdate {
  type: typeof USER_UPDATE_REQUEST;
}

export interface UserUpdateFulfilled {
  type: typeof USER_UPDATE_FULFILLED;
}

export interface UserUpdateRejected {
  type: typeof USER_UPDATE_REJECTED;
  payload: string;
}

export interface UserUpdateReset {
  type: typeof USER_UPDATE_RESET;
}

export type UserAction = Login | LoginFulfilled | LoginRejected | Logout;

export type UsersListActions =
  | UserList
  | UserListFulfilled
  | UserListRejected
  | UserListReset;

export type UserDeleteActions =
  | UserDelete
  | UserDeleteFulfilled
  | UserDeleteRejected;

export type UserUpdateActions =
  | UserUpdate
  | UserUpdateFulfilled
  | UserUpdateRejected
  | UserUpdateReset;
