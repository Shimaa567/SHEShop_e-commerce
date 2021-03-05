//Types / Action'
import axios from "axios";
import { Dispatch } from "redux";
import store, { RootState } from "../../store";
import {
  //CART_REMOVE_ITEM,
  CartActions,
  CartItem,
  CartState,
  CART_ADD_ITEM,
} from "./types";

const cartItemsFromStorage: Array<CartItem> = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") ?? "")
  : [];

//Reducer
const initialState: CartState = {
  cartItems: cartItemsFromStorage,
};

export default function reducer(
  state = initialState,
  action: CartActions
): CartState {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    default:
      return state;
  }
}

//Side Effect (Action Creator)
export const addToCart = (id: string, qty: number) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(store.getState().cart.cartItems)
  );
};
