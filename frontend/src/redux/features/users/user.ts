import axios from "axios";
import { Dispatch } from "redux";
//Types
import {
  UserState,
  UserAction,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FULFILLED,
  USER_LOGIN_REJECTED,
  USER_LOGOUT,
  UserInfo,
} from "./types";

//Reducer
const initialState: UserState = { userInfo: null, loading: null, error: "" };

export default function reducer(
  state = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_FULFILLED:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_LOGIN_REJECTED:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

//SideEffect
export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post<UserInfo>(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_FULFILLED,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
