import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const OrderDetailsPage = () => {
    const params = useParams();
    const [orders, setOrders] = useState([]);

    const firebase = useFirebase();

    useEffect(() => {
        firebase.fetchOrders(params.bookId).then((orders) => setOrders(orders.docs));
    }, []);

    if(!!orders) return <h5 style={{margin:"20px"}}>There are no orders for this piece of work!!</h5>

    return (
        <div className="container">
            <h1>Orders</h1>
            {
                orders.map(order => {
                    const data = order.data();
                    return (
                        <div className="mt-5" style={{border: "1px solid", padding:"10px", margin:"10px"}}>
                            <h5>Orderd by: {data.displayName}</h5>
                            <h5>Quantity: {data.qt}</h5>
                            <h6>Email: {data.userEmail}</h6>
                        </div>
                    )
                }) 
            }
        </div>
    )
}

export default OrderDetailsPage;