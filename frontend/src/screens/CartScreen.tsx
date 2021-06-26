import { useParams } from "react-router";
import qs from "querystring";
import React, { useEffect, useCallback } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../redux/features/cartDetails/cart";
import { useTypedSelector } from "../redux/store";

interface Params {
  id: string;
}

const CartScreen: React.FC = () => {
  const { id: productId } = useParams<Params>();
  const history = useHistory();
  const location = useLocation();

  const qty = location.search ? parseInt(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useTypedSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    //console.log(productId);
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    if (qty) {
      history.push({
        search: qs.stringify({ qty }),
      });
    }
  }, [dispatch, history, productId, qty]);

  const removeFromCartHandler = useCallback((id: string) => {
    dispatch(removeFromCart(id));
  }, [dispatch])
  const checkoutHandler = useCallback(() => {
    history.push("/login?redirect=shipping")
  }, [history])
  //console.log(qs.parse(location.search.replace('?', '')));
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="light"
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item?.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default React.memo(CartScreen)
