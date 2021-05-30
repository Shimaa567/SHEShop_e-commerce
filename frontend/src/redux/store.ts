import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import productList from "./features/products/productList";
import productDetails from "./features/productDetails/productDetailsList";
import productDelete from "./features/productDetails/productDelete";
import productCreate from "./features/productDetails/productCreate";
import productCreateReview from "./features/productDetails/productReview";
import productUpdate from "./features/productDetails/productUpdate";
import productTopRated from "./features/productDetails/productTopRated";
import cart from "./features/cartDetails/cart";
import thunk from "redux-thunk";
import { CartItem } from "./features/cartDetails/types";
import userLogin from "./features/users/user";
import userRegister from "./features/register/UserRegister";
import userDetails from "./features/userDetails/userProfileDetails";
import updateUserProfile from "./features/profile/updateProfile";
import userList from "./features/users/usersList";
import userDelete from "./features/users/userDelete";
import userUpdate from "./features/users/userUpdates";
import orderCreate from "./features/order/orderCreate";
import orderDetails from "./features/order/orderDetails";
import orderPay from "./features/order/orderPay";
import orderDeliver from "./features/order/orderDelivery";
import orderMyList from "./features/order/orderMyList";
import orderList from "./features/order/orderList";

const cartItemsFromStorage: Array<CartItem> = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") ?? "")
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") ?? "")
  : null;

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress") ?? "")
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const reducer = combineReducers({
  productList,
  productDetails,
  productDelete,
  productCreate,
  productUpdate,
  productCreateReview,
  productTopRated,
  cart,
  userLogin,
  userRegister,
  userDetails,
  updateUserProfile,
  userList,
  userDelete,
  userUpdate,
  orderCreate,
  orderDetails,
  orderPay,
  orderDeliver,
  orderMyList,
  orderList,
});
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

console.log(store.getState());
export default store;
export type RootState = ReturnType<typeof reducer>;

//Custom useSelector
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
