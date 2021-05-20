import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Products from "../components/Products";
import { Product } from "../types/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../redux/features/products/productList";
import { useTypedSelector } from "../redux/store";

interface Props {
  product: Product;
}

const HomeScreen: React.FC<Props> = () => {
  const productList = useTypedSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    //Dispatch (SideEffect)
    dispatch(listProducts());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error || !(products instanceof Array))
    return <Message variant="danger">{error}</Message>;
  return (
    <>
      <h1>Welcome To SHEShop</h1>

      <h2 style={{ textAlign: "center" }}>Latest Products</h2>

      <Row>
        {products.map((product: Product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Products product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
