// Types
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import {
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_FULFILLED,
  ORDER_MY_LIST_REJECTED,
  ORDER_MY_LIST_RESET,
  OrderState,
  OrderActions,
} from "./types";

//Reducer
const initialState: OrderState = {
  orders: [],
  loading: null, //loading not true
  error: "",
};
export default function reducer(
  state = initialState,
  action: OrderActions
): OrderState {
  switch (action.type) {
    case ORDER_MY_LIST_REQUEST:
      return { ...state, loading: true };
    case ORDER_MY_LIST_FULFILLED:
      return { loading: false, orders: action.payload };
    case ORDER_MY_LIST_REJECTED:
      return { loading: false, error: action.payload };
    case ORDER_MY_LIST_RESET:
      return { orders: [] };
    default:
      return state;
  }
}

//Action
export const listMyOrders = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch({
      type: ORDER_MY_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_MY_LIST_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_MY_LIST_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
