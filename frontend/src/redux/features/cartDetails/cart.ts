import { Dispatch } from "redux";
//Types / Action'
import axios from "axios";
import { RootState } from "../../store";
import {
  CART_REMOVE_ITEM,
  CartActions,
  CartItem,
  CartState,
  CART_ADD_ITEM,
  ShippingAddress,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "./types";

//Reducer
const initialState: CartState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: "",
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
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
}

//Side Effect (Action Creator)
export const addToCart = (id: string, qty: number) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const { data } = await axios.get<CartItem>(`/api/products/${id}`);

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
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  console.log("this is data", getState());
};

export const removeFromCart = (id: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data: ShippingAddress) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data: string | undefined) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
