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
} from "./types";

//Reducer
const initialState: UserState = { user: {}, loading: null, error: "" };

export default function reducer(
  state = initialState,
  action: UserDetailsAction
): UserState {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_FULFILLED:
      return { ...state, loading: false, user: action.payload };
    case USER_DETAILS_REJECTED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

//SideEffects
export const userDetails = (id: string) => async (
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
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get<UserInfo>(`/api/users/profile`, config);

    dispatch({
      type: USER_DETAILS_FULFILLED,
      payload: data,
    });
    // dispatch({
    //   type: USER_LOGIN_FULFILLED,
    //   payload: data,
    // });

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_DETAILS_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
