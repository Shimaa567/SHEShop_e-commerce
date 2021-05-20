import axios from "axios";
import { Dispatch } from "redux";
import { UserInfo, UserState, USER_LOGIN_FULFILLED } from "../users/types";
import {
  USER_REGISTER_FULFILLED,
  USER_REGISTER_REJECTED,
  USER_REGISTER_REQUEST,
  UserRegisterAction,
} from "./types";

//Reducer
const initialState: UserState = { userInfo: {}, loading: null, error: "" };

export default function reducer(
  state = initialState,
  action: UserRegisterAction
): UserState {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_FULFILLED:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_REGISTER_REJECTED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

//SideEffects or ActionCreator
export const registerUser = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post<UserInfo>(
      "/api/users",
      { name, email, password, confirmPassword },
      config
    );

    dispatch({
      type: USER_REGISTER_FULFILLED,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_FULFILLED,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
