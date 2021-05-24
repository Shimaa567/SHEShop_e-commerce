import React, { useEffect, useState } from "react";
import axios from "axios";
//import { PayPalButton } from "react-paypal-button-v2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useTypedSelector } from "../redux/store";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { getOrderById } from "../redux/features/order/orderDetails";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ORDER_PAY_RESET, PaymentResult } from "../redux/features/order/types";
import { payOrder } from "../redux/features/order/orderPay";

interface Params {
  id: string;
}
//declare var window: any;

const OrderScreen: React.FC = () => {
  const { id: orderId } = useParams<Params>();
  const [pageLoading, setPageLoading] = useState(true);
  const [clientId, setClientId] = useState("");
  //const [successPay, setSuccessPay] = useState(false)

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useTypedSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useTypedSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const user = useTypedSelector((state) => state.userLogin);
  const { userInfo } = user;

  const itemsPrice = Number(
    order?.orderItems
      ?.reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2)
  );

  // const successPaymentHandler = (paymentResult: PaymentResult) => {
  //   console.log(paymentResult);
  //   dispatch(payOrder(order?._id, paymentResult));
  // };

  useEffect(() => {
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, order, successPay, orderId]);

  useEffect(() => {
    if (loading === false) {
      setPageLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    (async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      setClientId(clientId);
      setSdkReady(true);
    })();
  });

  return pageLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order: {order?._id}</h1>
      <Row className="py-3">
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {userInfo?.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${userInfo?.email}`}> {userInfo?.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order?.shippingAddress?.address},{" "}
                {order?.shippingAddress?.city},{" "}
                {order?.shippingAddress?.postalCode},{" "}
                {order?.shippingAddress?.country}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {order?.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not delivered yet</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order?.paidAt}</Message>
              ) : (
                <Message variant="danger">Not paid yet</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems?.length === 0 ? (
                <Message>Your Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        <Col md={4} className="ml-auto">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Taxes</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order?.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalScriptProvider options={{ "client-id": clientId }}>
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        onApprove={(paymentResult: PaymentResult) =>
                          dispatch(payOrder(order?._id, paymentResult))
                        }
                      />
                    </PayPalScriptProvider>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default OrderScreen;
