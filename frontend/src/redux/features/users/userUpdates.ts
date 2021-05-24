//Types
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import { USER_DETAILS_FULFILLED } from "../userDetails/types";
import {
  USER_UPDATE_REQUEST,
  USER_UPDATE_FULFILLED,
  USER_UPDATE_REJECTED,
  USER_UPDATE_RESET,
  UserUpdateActions,
  UserState,
  UserInfo,
} from "./types";

//Reducer
const initialState: UserState = { user: {} };
export default function reducer(
  state = initialState,
  action: UserUpdateActions
) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_FULFILLED:
      return { loading: false, success: true };
    case USER_UPDATE_REJECTED:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
}

//Action
export const updateUser = (user: UserInfo) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: USER_UPDATE_FULFILLED,
    });
    dispatch({ type: USER_DETAILS_FULFILLED, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
