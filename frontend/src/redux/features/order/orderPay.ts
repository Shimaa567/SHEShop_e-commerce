import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
//Types
import {
  ORDER_PAY_REQUEST,
  ORDER_PAY_FULFILLED,
  ORDER_PAY_REJECTED,
  ORDER_PAY_RESET,
  OrderActions,
  OrderState,
  PaymentResult,
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
  action: OrderActions
): OrderState {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_FULFILLED:
      return { loading: false, success: true };
    case ORDER_PAY_REJECTED:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
}

//Action
export const payOrder = (
  orderId: string | undefined,
  paymentResult: PaymentResult
  //order?: OrderInfo
) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
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

    const { data } = await axios.put<PaymentResult>(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
