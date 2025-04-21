import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Order from "./pages/Order";
import OrderCreate from "./pages/OrderCreate";
import Customer from "./components/customers/Customer";
import CustomerDetails from "./components/customers/CustomerDetails";
import CreateNewRecipe from "./components/customers/CreateNewRecipe";
import EditProduct from "./components/manufacturedProducts/EditProduct";

const InvRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/inventory" element={<Inventory />} />
    <Route path="/order" element={<Order />} />
    <Route path="/orderCreate" element={<OrderCreate />} />
    <Route path="/customer" element={<Customer />} />
    <Route path="/customer/:id" element={<CustomerDetails />} />
    <Route path="/recipe/:id" element={<CreateNewRecipe />} />
    <Route path="/editProduct" element={<EditProduct />} />
  </Routes>
);
export default InvRoutes;
