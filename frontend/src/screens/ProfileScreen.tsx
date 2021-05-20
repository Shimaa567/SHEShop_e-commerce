import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useTypedSelector } from "../redux/store";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { userDetails } from "../redux/features/userDetails/userProfileDetails";
import { updateUserProfile } from "../redux/features/profile/updateProfile";

type Inputs = {
  name?: string;
  email?: string;
  password: string;
  password_repeat: string;
};

// interface Params {
//   id: string;
// }

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

  //const { id } = useParams<Params>();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user?.name) {
        dispatch(userDetails("profile"));
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
      <Col md={9}>My orders</Col>
    </Row>
  );
};

export default ProfileScreen;
