import axios from 'axios';
import { Dispatch } from 'redux';

//Types or Actions
import {
  ProductState,
  LOAD_FULFILLED,
  LOAD_PENDING,
  LOAD_REJECTED,
  ProductListAction,
} from './types';

//Reducer
const initialState: ProductState = { products: [], loading: null, error: '' };
export default function reducer(
  state = initialState,
  action: ProductListAction
): ProductState {
  switch (action.type) {
    case LOAD_PENDING:
      return { loading: true, products: [], error: '' };
    case LOAD_FULFILLED:
      return { loading: false, products: action.payload };
    case LOAD_REJECTED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

//Action Creators
//We don't have

//SideEffect
export const listProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOAD_PENDING });
    const { data } = await axios.get(`api/products/`);

    dispatch({
      type: LOAD_FULFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_REJECTED,
      payload: error.response?.data.message || error.message,
    });
  }
};

//Another Types/Actions
// const CREATE= ''
// const UPDATE= ''
// const REMOVE = ''
