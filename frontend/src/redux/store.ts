import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import productList from './features/products/productList';
import productDetails from './features/productDetails/productDetailsList';
import cart from './features/addToCart/cart';
import thunk from 'redux-thunk';

const initialState = {
  //cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];
const reducer = combineReducers({ productList, productDetails, cart });
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
