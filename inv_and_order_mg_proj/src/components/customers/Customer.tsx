import CustomerTable from "./CustomerTable";

const Customer = () => {
  return (
    <div>
      <h1 className="customH1"> Customer</h1>
      <button className="addButton">+ Add new customer</button>
      <CustomerTable />
    </div>
  );
};
export default Customer;
