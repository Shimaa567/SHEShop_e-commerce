//Types
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import {
  USER_LIST_REQUEST,
  USER_LIST_FULFILLED,
  USER_LIST_REJECTED,
  USER_LIST_RESET,
  UsersListActions,
  UserState,
} from "./types";

//Reducer
const initialState: UserState = { users: [] };
export default function reducer(
  state = initialState,
  action: UsersListActions
) {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_FULFILLED:
      return { loading: false, users: action.payload };
    case USER_LIST_REJECTED:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
}

//Action Creator
export const listUsers = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: USER_LIST_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
