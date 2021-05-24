import React, { useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useTypedSelector } from "../redux/store";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/users/user";

type Inputs = {
  email: string;
  password: string;
};

const LoginScreen: React.FC = () => {
  const { handleSubmit, errors, register } = useForm<Inputs>({
    mode: "onChange",
  });

  const history = useHistory();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const userLogin = useTypedSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const onSubmit = (data: Inputs) => {
    const { email, password } = data;
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <form onSubmit={handleSubmit(onSubmit)}>
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
            ref={register({ required: true })}
            {...(errors.password && <p>Invalid Email or Password</p>)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </form>
      <Row className="py-3">
        <Col>
          New Customer?
          <Link
            className="px-3"
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
