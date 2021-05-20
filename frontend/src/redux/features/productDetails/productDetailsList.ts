import axios from "axios";
import { Dispatch } from "redux";
//Types or Actions
import {
  LOAD_DETAILS_FULFILLED,
  LOAD_DETAILS_PENDING,
  LOAD_DETAILS_REJECTED,
  ProductDetailsAction,
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
  action: ProductDetailsAction
): ProductDetailsState {
  switch (action.type) {
    case LOAD_DETAILS_PENDING:
      return { ...state, loading: true };
    case LOAD_DETAILS_FULFILLED:
      return { loading: false, product: action.payload };
    case LOAD_DETAILS_REJECTED:
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
    dispatch({ type: LOAD_DETAILS_PENDING });
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: LOAD_DETAILS_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_DETAILS_REJECTED,
      payload: error.response?.data.message || error.message,
    });
  }
};
