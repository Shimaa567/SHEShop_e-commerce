import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");

  const history = useHistory();

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} inline className=" ml-sm-n5 py-2">
      <Form.Control
        type="text"
        name="q"
        id="search-box"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products Here..."
        className="m-auto mr-sm-2 ml-sm-5"
        style={{ width: "450px" }}
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-primary"
        className="p-2"
        style={{ width: "80px" }}
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
