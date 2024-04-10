import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [qt, setQt] = useState(0);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const result = await firebase.getBookById(params.bookId);
        setData(result.data());

        if (result.data().imageURL) {
          const imageURL = await firebase.getImageURL(result.data().imageURL);
          setURL(imageURL);
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };
    fetchBookData();
  }, [params.bookId, firebase]);

  const placeOrder = async () => {
    const res = await firebase.placeOrder(params.bookId, qt);
    console.log("order placed", res);
  }

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container m-5">
      <h1>{data.name}</h1>
      {url && (
        <img
          width="300px"
          style={{ borderRadius: "10px" }}
          src={url}
          alt={data.title}
        />
      )}
      <h1>Details</h1>
      <p>Price: Rs.{data.price}</p>
      <p>ISBN Number: {data.isbnNumber}</p>
      <h1>Owner Details</h1>
      <p>Name: {data.displayName}</p>
      <p>Email: {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            onChange={(e) => setQt(e.target.value)}
            value={qt}
            type="Number"
            placeholder="Enter quantity"
          />
        </Form.Group>
      <Button variant="success" onClick={placeOrder}>Buy now</Button>
    </div>
  );
};

export default BookDetailPage;
