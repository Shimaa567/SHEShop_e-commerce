import { UserInfo } from "./../users/types";
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_FULFILLED,
  USER_DETAILS_REJECTED,
  UserDetailsAction,
  UserState,
  USER_DETAILS_RESET,
} from "./types";

//Reducer
const initialState: UserState = { user: {}, loading: null, error: "" };

export default function reducer(
  state = initialState,
  action: UserDetailsAction
): UserState {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_FULFILLED:
      return { loading: false, user: action.payload };
    case USER_DETAILS_REJECTED:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
}

//SideEffects
export const getUserDetails = (id: string | undefined) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get<UserInfo>(`/api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
