//Types
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import {
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FULFILLED,
  PRODUCT_UPDATE_REJECTED,
  ProductUpdateActions,
  PRODUCT_UPDATE_RESET,
} from "./types";
import { ProductState } from "../products/types";
import { Product } from "../../../types/Product";

//Reducer
const initialState: ProductState = { product: undefined };
export default function reducer(
  state = initialState,
  action: ProductUpdateActions
) {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_FULFILLED:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_REJECTED:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
}

//Action
export const updateProduct = (product: Product) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
