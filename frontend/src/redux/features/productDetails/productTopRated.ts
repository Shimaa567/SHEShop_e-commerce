import axios from "axios";
import { Dispatch } from "redux";
import { ProductState } from "../products/types";

//Types or Actions
import {
  PRODUCT_TOP_FULFILLED,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_REJECTED,
  ProductTopRatedActions,
} from "./types";

//Reducer
const initialState: ProductState = { loading: null, error: "", products: [] };
export default function reducer(
  state = initialState,
  action: ProductTopRatedActions
): ProductState {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_FULFILLED:
      return { loading: false, products: action.payload.products };
    case PRODUCT_TOP_REJECTED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

//Action Creators

export const listTopProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({
      type: PRODUCT_TOP_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_REJECTED,
      payload: error.response?.data.message || error.message,
    });
  }
};

//Another Types/Actions
// const CREATE= ''
// const UPDATE= ''
// const REMOVE = ''
