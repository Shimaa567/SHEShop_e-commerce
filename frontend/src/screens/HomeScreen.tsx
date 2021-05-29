import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Products from "../components/Products";
import { Product } from "../types/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../redux/features/products/productList";
import { useTypedSelector } from "../redux/store";
import CarouselModel from "../components/CarouselModel";

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
      <h1
        style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}
      >
        Welcome To Ladies Corner ❤️!
      </h1>

      <Row className="mb-3">
        <Col md={10} sm={4} style={{ marginLeft: "-160px" }} className="mb-3">
          <CarouselModel />
        </Col>

        <Col md={2} style={{ marginLeft: "155px" }}>
          <div
            style={{
              display: "inline-block",
              width: "max-content",
              marginBottom: "15px",
            }}
          >
            <img
              src="/images/new.gif"
              alt=""
              style={{ width: "50px", height: "50px" }}
            />{" "}
            <h4 style={{ marginTop: "-35px", marginLeft: "55px" }}>
              New Arrival !
            </h4>
          </div>
          <img
            src="/images/collection.gif"
            alt=""
            style={{ width: "350px", height: "100%" }}
          />
        </Col>
      </Row>

      <h2
        style={{ textAlign: "center", marginTop: "55px", paddingTop: "25px" }}
      >
        Latest Products
      </h2>

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
