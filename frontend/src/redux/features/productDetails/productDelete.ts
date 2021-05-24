//Types
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FULFILLED,
  PRODUCT_DELETE_REJECTED,
  ProductDeleteActions,
} from "./types";
import { ProductState } from "../products/types";
//Reducer
const initialState: ProductState = {};
export default function reducer(
  state = initialState,
  action: ProductDeleteActions
) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_FULFILLED:
      return { loading: false, success: true };
    case PRODUCT_DELETE_REJECTED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

//Action
export const deleteProduct = (id: string | number | undefined) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_FULFILLED,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_REJECTED,
      payload: error?.response.data.message || error.message,
    });
  }
};
