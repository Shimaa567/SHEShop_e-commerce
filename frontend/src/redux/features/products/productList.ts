import axios from "axios";
import { Dispatch } from "redux";

//Types or Actions
import {
  PRODUCT_LIST_FULFILLED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REJECTED,
  ProductListAction,
  ProductState,
} from "./types";

//Reducer
const initialState: ProductState = {
  loading: null,
  error: "",
};
export default function reducer(
  state = initialState,
  action: ProductListAction
): ProductState {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_FULFILLED:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case PRODUCT_LIST_REJECTED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
//Action Creators
//SideEffect
export const listProducts = (
  keyword: string | undefined = "",
  pageNumber: string | undefined = ""
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );

    dispatch({
      type: PRODUCT_LIST_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_REJECTED,
      payload: error.response?.data.message || error.message,
    });
  }
};

//Another Types/Actions
// const CREATE= ''
// const UPDATE= ''
// const REMOVE = ''
