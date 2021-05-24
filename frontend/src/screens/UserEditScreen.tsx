import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useTypedSelector } from "../redux/store";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../redux/features/userDetails/userProfileDetails";
import { updateUser } from "../redux/features/users/userUpdates";
import { USER_UPDATE_RESET } from "../redux/features/users/types";

// type Inputs = {
//   name: string;
//   email: string;
//   isAdmin: boolean;
// };

interface Params {
  id: string;
}

const UserEditScreen: React.FC = () => {
  //   const { handleSubmit, errors, register, setValue } = useForm<Inputs>({
  //     mode: "onChange",
  //   });
  const { id: userId } = useParams<Params>();

  const [name, setName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const userDetails = useTypedSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useTypedSelector((state) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user?.name || user?._id !== userId) {
        dispatch(getUserDetails(userId));
        //console.log(userId);
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, userId, history, successUpdate]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              {" "}
              Update{" "}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
