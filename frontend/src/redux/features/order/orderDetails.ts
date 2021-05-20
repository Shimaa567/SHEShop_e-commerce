// Types
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FULFILLED,
  ORDER_DETAILS_REJECTED,
  OrderState,
  OrderActions,
  //OrderInfo,
} from "./types";

//Reducer
const initialState: OrderState = {
  order: { orderItems: [], shippingAddress: {} },
  loading: true,
  error: "",
};
export default function reducer(
  state = initialState,
  action: OrderActions
): OrderState {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_FULFILLED:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_REJECTED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

//Action
export const getOrderById = (id: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
