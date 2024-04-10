import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";

const OrdersPage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if(firebase.isLoggedIn) firebase.fetchMyBooks()?.then((books) => setBooks(books.docs));
    }, [firebase]);

    console.log(books);
    
  return (
    <div>
        {
            books.map(book => <BookCard link={`/book/orders/${book.id}`} key={book.id} id={book.id} {...book.data()}/>)
        }
    </div>
  )
};

export default OrdersPage;
