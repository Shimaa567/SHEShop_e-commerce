import { UserInfo } from "./../users/types";

export const USER_DETAILS_REQUEST = "USER_DETAILS_REQUEST";
export const USER_DETAILS_FULFILLED = "USER_DETAILS_FULFILLED";
export const USER_DETAILS_REJECTED = "USER_DETAILS_REJECTED";
export const USER_DETAILS_RESET = "USER_DETAILS_RESET";

export interface UserState {
  user?: UserInfo;
  loading?: boolean | null;
  error?: string;
}

export interface UserDetails {
  type: typeof USER_DETAILS_REQUEST;
}
export interface DetailsFulfilled {
  type: typeof USER_DETAILS_FULFILLED;
  payload: UserInfo;
}
export interface DetailsRejected {
  type: typeof USER_DETAILS_REJECTED;
  payload: string;
}

export interface DetailsReset {
  type: typeof USER_DETAILS_RESET;
}

export type UserDetailsAction =
  | UserDetails
  | DetailsFulfilled
  | DetailsRejected
  | DetailsReset;
