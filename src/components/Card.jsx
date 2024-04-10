import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
  const [url, setURL] = useState(null);
  const navigate = useNavigate();

  const firebase = useFirebase();

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setURL(url));
  }, []);

  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>Cost Rs. {props.price}</Card.Text>
        <Button
          variant="primary"
          onClick={(e) => navigate(props.link)}
        >
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
