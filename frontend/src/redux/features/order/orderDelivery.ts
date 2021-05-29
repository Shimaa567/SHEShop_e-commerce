import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
//Types
import {
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_FULFILLED,
  ORDER_DELIVERED_REJECTED,
  OrderDeliverActions,
  OrderState,
  ORDER_DELIVERED_RESET,
  OrderInfo,
} from "./types";

//Reducer
const initialState: OrderState = {
  success: false,
  loading: null,
  error: "",
  // order: {},
};
export default function reducer(
  state = initialState,
  action: OrderDeliverActions
): OrderState {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: true };
    case ORDER_DELIVERED_FULFILLED:
      return { loading: false, success: true };
    case ORDER_DELIVERED_REJECTED:
      return { loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
}

//Action
export const deliverOrder = (order: OrderInfo | null | undefined) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch({
      type: ORDER_DELIVERED_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${order?._id}/deliver`,
      {},
      config
    );

    dispatch({
      type: ORDER_DELIVERED_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVERED_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
