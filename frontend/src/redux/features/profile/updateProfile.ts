import { UserInfo } from "./../users/types";
//Types
import {
  USER_UPDATE_PROFILE_FULFILLED,
  USER_UPDATE_PROFILE_REJECTED,
  USER_UPDATE_PROFILE_REQUEST,
  UserUpdateAction,
  UserProfile,
} from "./types";
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
//Reducer

const initialState: UserProfile = {
  userInfo: {},
  success: false,
  loading: null,
  error: "",
};

export default function reducer(
  state = initialState,
  action: UserUpdateAction
): UserProfile {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_FULFILLED:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_UPDATE_PROFILE_REJECTED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

//SideEffect (Action Creator)
export const updateUserProfile = (user: UserInfo) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.put<UserInfo>(
      `/api/users/profile`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
