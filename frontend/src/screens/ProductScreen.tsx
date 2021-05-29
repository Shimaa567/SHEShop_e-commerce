import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { Product } from "../types/Product";
import { useTypedSelector } from "../redux/store";
import { listProductDetails } from "../redux/features/productDetails/productDetailsList";
import Loader from "../components/Loader";
import Message from "../components/Message";

interface Props {
  product: Product;
}
interface Params {
  id: string;
}
//Check the history

const ProductScreen: React.FC<Props> = () => {
  const [qty, setQty] = useState<number | string>(1);

  //custom useSelector (state.reducer)
  const productDetails = useTypedSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const { id } = useParams<Params>();

  const dispatch = useDispatch();

  //Check here
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);
  const history = useHistory();
  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };
  if (loading) return <Loader />;
  if (error || !product) return <Message variant="danger">{error}</Message>;
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;

// useEffect(() => {
//   const fetchProducts = async () => {
//     const { data } = await axios.get('/api/products');
//     setProducts(data);
//   };
//   fetchProducts();
// }, [products]);

// const product = products.find((p) => p._id === id);
// if (!product) {
//   return <div>Error 404! Not Found</div>;
// }
