import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import MyNav from "./components/Navbar";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Detail";
import OrdersPage from "./pages/ViewOrder";
import OrderDetailsPage from "./pages/ViewOrderDetails";

function App() {
  return (
    <div>
      <MyNav></MyNav>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
      <Route path="/book/list" element={<ListingPage/>}></Route>
      <Route path="/book/view/:bookId" element={<BookDetailPage/>}></Route>
      <Route path="/book/orders" element={<OrdersPage/>}></Route>
      <Route path="/book/orders/:bookId" element={<OrderDetailsPage/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
