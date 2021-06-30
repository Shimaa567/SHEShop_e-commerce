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
import { ToastContainer, toast } from "react-toastify";
import Rating from "../components/Rating";
import { Product } from "../types/Product";
import { useTypedSelector } from "../redux/store";
import { listProductDetails } from "../redux/features/productDetails/productDetailsList";
import { reviewProduct } from "../redux/features/productDetails/productReview";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/features/productDetails/types";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

interface Props {
  product: Product;
}
interface Params {
  id: string;
}

interface Review {
  _id: string | number;
  name: string;
  rating: number | string;
  comment: string;
  user: string;
  createdAt: Date;
}

const ProductScreen: React.FC<Props> = () => {
  const [qty, setQty] = useState<number | string>(1);
  const [rating, setRating] = useState<number | string>(0);
  const [comment, setComment] = useState<string>("");

  const { id } = useParams<Params>();

  //custom useSelector (state.reducer)

  const userLogin = useTypedSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useTypedSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const productReview = useTypedSelector((state) => state.productCreateReview);
  const { success: successReview, error: errorReview } = productReview;

  const dispatch = useDispatch();
  const history = useHistory();

  //Check here
  useEffect(() => {
    if (successReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(reviewProduct(id, { rating, comment }));
    <ToastContainer />;
    toast("Your review has been added successfully!");
  };

  if (loading) return <Loader />;
  if (error || !product) return <Message variant="danger">{error}</Message>;

  return (
    <>
      <Meta title={product.name} />
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
      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews?.length === 0 && <Message>No Reviews yet!</Message>}
          <ListGroup variant="flush">
            {product.reviews?.map((review: Review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={Number(review.rating)} />
                <p>{review.createdAt.toString().substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h1>Write a Review</h1>
              {errorReview && <Message variant="danger">{errorReview}</Message>}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select..</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Leave a Comment.."
                    ></Form.Control>
                    <Button
                      style={{ marginTop: "20px" }}
                      type="submit"
                      variant="primary"
                    >
                      {" "}
                      Submit{" "}
                    </Button>
                  </Form.Group>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">Sign in</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
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
