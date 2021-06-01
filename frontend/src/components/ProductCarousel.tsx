import React from "react";
import CarouselModel from "../components/CarouselModel";
import { Row, Col, Image } from "react-bootstrap";

const ProductCarousel = () => {
  return (
    <>
      <h1
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Welcome To Ladies Corner ❤️!
      </h1>
      <Row className="mb-3">
        <Col
          md={8}
          sm={4}
          style={{ marginLeft: "-160px" }}
          className="mb-3"
          id="carousel-col"
        >
          <CarouselModel />
        </Col>

        <Col md={2} className="collection">
          <div
            style={{
              display: "inline-block",
              width: "max-content",
              marginBottom: "15px",
            }}
          >
            <Image
              src="/images/new.gif"
              alt=""
              style={{ width: "50px", height: "50px" }}
            />{" "}
            <h4 style={{ marginTop: "-35px", marginLeft: "55px" }}>
              New Arrival !
            </h4>
          </div>
          <Image
            id="coll-img"
            src="/images/collection.gif"
            alt=""
            style={{ width: "350px", height: "100%" }}
          />
        </Col>
      </Row>
    </>
  );
};

export default ProductCarousel;
