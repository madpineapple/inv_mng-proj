import OrderTable from "./OrderTable";

const OrderStart = () => {
  return (
    <div>
      <button>+ Add new order</button>
      <h2>Current orders in progress</h2>
      <OrderTable />
    </div>
  );
};
export default OrderStart;
