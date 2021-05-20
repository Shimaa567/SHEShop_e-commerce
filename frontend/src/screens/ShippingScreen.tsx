import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { useTypedSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../redux/features/cartDetails/cart";
import CheckoutSteps from "../components/CheckoutSteps";

interface FullAddress {
  address: string;
  city: string;
  postalCode: number;
  country: string;
}

const ShippingScreen: React.FC<FullAddress> = () => {
  const cart = useTypedSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const history = useHistory();

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data: FullAddress) => {
    console.log(data);
    const { address, postalCode, city, country } = data;
    dispatch(saveShippingAddress({ address, postalCode, city, country }));
    setValue("address", shippingAddress?.address);
    setValue("city", shippingAddress?.city);
    setValue("postalCode", shippingAddress?.postalCode);
    setValue("country", shippingAddress?.country);
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      <h1>Shipping</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Type your address.."
            ref={register({ required: true })}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Your City Name.."
            ref={register({ required: true })}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            placeholder="The Postal Code.."
            ref={register({ required: true })}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            placeholder="Your Country.."
            ref={register({ required: true })}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
