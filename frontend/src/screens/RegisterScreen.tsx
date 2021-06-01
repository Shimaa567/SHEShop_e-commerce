import React, { useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Row, Col, Button, Form, FormControl } from "react-bootstrap";
import { useTypedSelector } from "../redux/store";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/features/register/UserRegister";

type Inputs = {
  name: string;
  email: string;
  password: string;
  password_repeat: string;
};

const RegisterScreen: React.FC<Inputs> = () => {
  const { handleSubmit, errors, register, setError } = useForm<Inputs>({
    mode: "onChange",
  });

  const history = useHistory();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const userRegister = useTypedSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (!userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const onSubmit = (data: Inputs) => {
    const { name, email, password, password_repeat } = data;
    if (password !== password_repeat) {
      setError("password_repeat", { message: `The two passwords don't match` });
    } else {
      dispatch(registerUser(name, email, password, password_repeat));
      alert("Your Registration has been Completed Successfully");

      history.push("/");
    }
  };

  return (
    <FormContainer>
      <h1>Sign UP</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <label>Name</label>
          <FormControl
            name="name"
            type="text"
            placeholder="Your name..."
            ref={register({ required: true })}
          ></FormControl>
          {errors.name && <p>This field is required</p>}
        </Form.Group>

        <Form.Group>
          <label>Email Address</label>
          <FormControl
            name="email"
            type="pattern"
            placeholder="Type Your Email..."
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          ></FormControl>
          {errors.email && <p>Please, follow the pattern name@example.com</p>}
        </Form.Group>

        <Form.Group>
          <label>Password</label>
          <FormControl
            name="password"
            type="password"
            placeholder="Password.."
            ref={register({ required: true, minLength: 8 })}
          ></FormControl>
          {errors.password && <p>Password must have at least 8 characters</p>}
        </Form.Group>

        <Form.Group>
          <label>Confirm Password</label>
          <FormControl
            name="password_repeat"
            type="password"
            placeholder="Confirm Password.."
            ref={register({ required: true })}
          />
          {errors.password_repeat && <p>The passwords don't match</p>}
          {/* {confirmError === true && (
            <Message variant="danger">The two passwords don't match</Message>
          )} */}
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </form>
      <Row className="py-3">
        <Col>
          Have an Account ?
          <Link
            className="px-3"
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
