//Types
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FULFILLED,
  PRODUCT_CREATE_REJECTED,
  ProductCreateActions,
  PRODUCT_CREATE_RESET,
} from "./types";
import { ProductState } from "../products/types";

//Reducer
const initialState: ProductState = {};
export default function reducer(
  state = initialState,
  action: ProductCreateActions
) {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_FULFILLED:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_REJECTED:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
}

//Action
export const createProduct = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
