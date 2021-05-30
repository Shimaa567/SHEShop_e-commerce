import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useTypedSelector } from "../redux/store";
import { useHistory } from "react-router";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../redux/features/order/orderList";
//import { deleteOrder } from "../redux/features/Order/OrderDelete";

const OrderListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useTypedSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useTypedSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  //   const userDelete = useTypedSelector((state) => state.userDelete);
  //   const {
  //     loading: loadingDelete,
  //     error: errorDelete,
  //     success: successDelete,
  //   } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  //   const deleteHandler = (id: string | undefined) => {
  //     if (window.confirm("Are you sure you want to delete this user?")) {
  //       //dispatch(deleteUser(id));
  //     }
  //   };
  return (
    <>
      <h1>Orders</h1>
      {/* 
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID ?</th>
              <th>DELIVERED ?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order?.user?.name}</td>
                <td>{order.createdAt?.toString().substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt?.toString().substring(0, 10)
                  ) : (
                    // <i className="fas fa-check" style={{ color: "green" }}></i>
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    // <i className="fas fa-check" style={{ color: "green" }}></i>
                    order.deliveredAt?.toString().substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;