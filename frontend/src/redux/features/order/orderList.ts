//Types
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_FULFILLED,
  ORDER_LIST_REJECTED,
  OrderListActions,
  OrderState,
} from "./types";

//Reducer
const initialState: OrderState = { orders: [] };
export default function reducer(
  state = initialState,
  action: OrderListActions
) {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_FULFILLED:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_REJECTED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

//Action Creator
export const listOrders = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: ORDER_LIST_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
