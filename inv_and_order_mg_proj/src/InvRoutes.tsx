import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Order from "./pages/Order";
import OrderCreate from "./pages/OrderCreate";

const InvRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Inventory" element={<Inventory />} />
      <Route path="/Order" element={<Order />} />
      <Route path="/OrderCreate" element={<OrderCreate />} />
    </Routes>
  </Router>
);
export default InvRoutes;
