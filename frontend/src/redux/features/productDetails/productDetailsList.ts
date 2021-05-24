import axios from "axios";
import { Dispatch } from "redux";
//Types or Actions
import {
  PRODUCT_DETAILS_FULFILLED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_REJECTED,
  ProductDetailsActions,
  ProductDetailsState,
} from "./types";

//Reducer
const initialState: ProductDetailsState = {
  //product: { reviews: []},
  product: undefined,
  loading: null,
  error: "",
};
export default function reducer(
  state = initialState,
  action: ProductDetailsActions
): ProductDetailsState {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_FULFILLED:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_REJECTED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

//SideEffect
export const listProductDetails = (id: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_REJECTED,
      payload: error.response?.data.message || error.message,
    });
  }
};
