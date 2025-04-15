import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Order from "./pages/Order";
import OrderCreate from "./pages/OrderCreate";
import Customer from "./components/customers/Customer";
import CustomerDetails from "./components/customers/CustomerDetails";
import CreateNewRecipe from "./components/customers/CreateNewRecipe";
import EditProduct from "./components/manufacturedProducts/EditProduct";

const InvRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Inventory" element={<Inventory />} />
      <Route path="/Order" element={<Order />} />
      <Route path="/OrderCreate" element={<OrderCreate />} />
      <Route path="/Customer" element={<Customer />} />
      <Route path="/customer/:id" element={<CustomerDetails />} />
      <Route path="/recipe/:id" element={<CreateNewRecipe />} />
      <Route path="/EditProduct" element={<EditProduct />} />
    </Routes>
  </Router>
);
export default InvRoutes;
