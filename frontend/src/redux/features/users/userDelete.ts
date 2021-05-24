//Types
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import {
  USER_DELETE_REQUEST,
  USER_DELETE_FULFILLED,
  USER_DELETE_REJECTED,
  UserDeleteActions,
  UserState,
} from "./types";

//Reducer
const initialState: UserState = {};
export default function reducer(
  state = initialState,
  action: UserDeleteActions
) {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_FULFILLED:
      return { loading: false, success: true };
    case USER_DELETE_REJECTED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

//Action
export const deleteUser = (id: string | undefined) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: USER_DELETE_FULFILLED,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
