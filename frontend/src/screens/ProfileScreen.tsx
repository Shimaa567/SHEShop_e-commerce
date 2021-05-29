import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { useTypedSelector } from "../redux/store";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../redux/features/userDetails/userProfileDetails";
import { updateUserProfile } from "../redux/features/profile/updateProfile";
import { listMyOrders } from "../redux/features/order/orderMyList";
import { LinkContainer } from "react-router-bootstrap";

type Inputs = {
  name?: string;
  email?: string;
  password: string;
  password_repeat: string;
};

const ProfileScreen: React.FC = () => {
  const {
    handleSubmit,
    errors,
    register,
    setValue,
    setError,
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const history = useHistory();

  const dispatch = useDispatch();

  const userProfileDetails = useTypedSelector((state) => state.userDetails);
  const { error, loading, user } = userProfileDetails;

  const userLogin = useTypedSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useTypedSelector((state) => state.updateUserProfile);
  const { success } = userProfile;

  const orderMyList = useTypedSelector((state) => state.orderMyList);
  const { orders, loading: ordersLoading, error: ordersError } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user?.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setValue("email", user.email, { shouldValidate: true });
        setValue("name", user.name);
      }
    }
  }, [userInfo, history, dispatch, setValue, user]);

  const onSubmit = (data: Inputs) => {
    console.log(data);
    const { name, email, password, password_repeat } = data;
    if (password !== password_repeat) {
      return setError("password_repeat", {
        message: `The two passwords don't match`,
      });
    }
    dispatch(
      updateUserProfile({
        _id: user?._id || "",
        name,
        email,
        password,
        password_repeat,
      })
    );
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">Profile Updated successfully</Message>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <label>Name</label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Your name..."
              ref={register({ required: true })}
            ></Form.Control>
            {errors.name && <p>This field is required</p>}
          </Form.Group>

          <Form.Group>
            <label>Email Address</label>
            <Form.Control
              name="email"
              type="pattern"
              placeholder="Type Your Email..."
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            ></Form.Control>
            {errors.email && <p>Please, follow the pattern name@example.com</p>}
          </Form.Group>

          <Form.Group>
            <label>Password</label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password.."
              ref={register({ required: true, minLength: 8 })}
            ></Form.Control>
            {errors.password && <p>Password must have at least 8 characters</p>}
          </Form.Group>

          <Form.Group>
            <label>Confirm Password</label>
            <Form.Control
              name="password_repeat"
              type="password"
              placeholder="Confirm Password.."
              ref={register({ required: true })}
            />
            {errors.password_repeat && <p>The passwords don't match</p>}
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {ordersLoading ? (
          <Loader />
        ) : ordersError ? (
          <Message variant="danger">{ordersError}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order?.createdAt?.toString().substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order?.isPaid ? (
                      order?.paidAt?.toString().substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order?.isDelivered ? (
                      order?.deliveredAt?.toString().substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order?._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      //onClick={() => ()}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
