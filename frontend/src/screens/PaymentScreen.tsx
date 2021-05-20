import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Form, Col } from "react-bootstrap";
import { useTypedSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../redux/features/cartDetails/cart";
import CheckoutSteps from "../components/CheckoutSteps";

interface PaymentMethod {
  paymentMethod: string | undefined;
}

const PaymentScreen: React.FC = () => {
  const cart = useTypedSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const history = useHistory();

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data: PaymentMethod) => {
    console.log(data);
    const { paymentMethod } = data;
    dispatch(savePaymentMethod(paymentMethod));
    setValue("paymentMethod", paymentMethod);
    console.log(paymentMethod);
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label as="legend">Select Method of Payment</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              ref={register()}
              //checked
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              ref={register()}
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
