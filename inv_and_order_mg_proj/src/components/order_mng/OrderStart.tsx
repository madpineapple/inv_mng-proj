import { Link } from "react-router-dom";
import OrderTable from "./OrderTable";

const OrderStart = () => {
  return (
    <div>
      <Link to="/ordercreate">
        <button className="addButton">+ Add new order</button>
      </Link>
      <h2>Current orders in progress</h2>
      <OrderTable />
    </div>
  );
};
export default OrderStart;
