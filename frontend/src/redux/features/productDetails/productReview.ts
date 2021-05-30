//Types
import axios from "axios";
import { Dispatch } from "redux";
//import { Product } from "../../../types/Product";
import { RootState } from "../../store";
import {
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_FULFILLED,
  PRODUCT_CREATE_REVIEW_REJECTED,
  ProductCreateReviewActions,
  PRODUCT_CREATE_REVIEW_RESET,
  ProductDetailsState,
  ProductReview,
} from "./types";
//import { ProductState } from "../products/types";

//Reducer
const initialState: ProductDetailsState = {};
export default function reducer(
  state = initialState,
  action: ProductCreateReviewActions
) {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_FULFILLED:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_REJECTED:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
}

//Action
export const reviewProduct = (
  productId: string | number | undefined,
  review: ProductReview
) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
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

    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({
      type: PRODUCT_CREATE_REVIEW_FULFILLED,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
