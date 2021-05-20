import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FULFILLED,
  ORDER_CREATE_REJECTED,
  OrderState,
  OrderInfo,
  OrderActions,
  ORDER_CREATE_RESET,
} from "./types";

//Reducer
const initialState: OrderState = {
  order: {},
  loading: null,
  success: false,
  error: "",
};
export default function reducer(
  state = initialState,
  action: OrderActions
): OrderState {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_FULFILLED:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_REJECTED:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
}

//Action

export const createOrder = (order: OrderInfo) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
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

    const { data } = await axios.post<OrderInfo>(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
