import { UserInfo } from "../users/types";

export const USER_UPDATE_PROFILE_REQUEST = "USER_UPDATE_PROFILE_REQUEST";
export const USER_UPDATE_PROFILE_FULFILLED = "USER_UPDATE_PROFILE_FULFILLED";
export const USER_UPDATE_PROFILE_REJECTED = "USER_UPDATE_PROFILE_REJECTED";
export const USER_UPDATE_PROFILE_RESET = "USER_UPDATE_PROFILE_RESET";

export interface UserProfile {
  userInfo?: UserInfo;
  loading?: boolean | null;
  success?: boolean;
  error?: string;
}

export interface UpdateProfile {
  type: typeof USER_UPDATE_PROFILE_REQUEST;
}
export interface UpdateFulfilled {
  type: typeof USER_UPDATE_PROFILE_FULFILLED;
  payload: UserInfo;
}
export interface UpdateRejected {
  type: typeof USER_UPDATE_PROFILE_REJECTED;
  payload: string;
}

export type UserUpdateAction = UpdateProfile | UpdateFulfilled | UpdateRejected;
