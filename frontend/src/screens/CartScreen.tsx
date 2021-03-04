import { Number } from "mongoose";
import qs from "querystring";
import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import Message from "../components/Message";
import { addToCart } from "../redux/features/addToCart/cart";
import { useTypedSelector } from "../redux/store";

interface Props {
  id: string;
}

const CartScreen: React.FC<Props> = ({ id }) => {
  const productId = id;
  const history = useHistory();
  const location = useLocation();

  const qty = location.search ? parseInt(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useTypedSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    if (qty) {
      history.push({
        search: qs.stringify({ qty }),
      });
    }
  }, [dispatch, history, productId, qty]);

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
                      onChange={(e) => dispatch(e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}></Col>
    </Row>
  );
};

export default CartScreen;
