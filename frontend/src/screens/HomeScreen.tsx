import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Products from "../components/Products";
import { Product } from "../types/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import { listProducts } from "../redux/features/products/productList";
import { useTypedSelector } from "../redux/store";
import ProductCarousel from "../components/ProductCarousel";

interface Props {
  product: Product;
}

interface Params {
  keyword?: string | undefined;
  pageNumber?: string | undefined;
}

const HomeScreen: React.FC<Props> = () => {
  const { keyword, pageNumber } = useParams<Params>();

  const dispatch = useDispatch();

  const productList = useTypedSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  console.log(keyword, pageNumber);

  useEffect(() => {
    //Dispatch (SideEffect)
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h2
            id="home-title"
            style={{
              textAlign: "center",
              paddingTop: "25px",
            }}
          >
            Latest Products
          </h2>
          <Row>
            {products?.map((product: Product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Products product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
