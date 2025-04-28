import { useCustomers } from "../../hooks/customerHooks/useCustomerHooks";
import { Customer, CustomerDropdownProps } from "../types";

const CustomerDropdown: React.FC<CustomerDropdownProps> = ({ onSelect }) => {
  const { data: customers, isLoading, error } = useCustomers();

  if (isLoading) return <p>Loading customers...</p>;
  if (error) return <p>Error fetching customers</p>;
  return (
    <select
      className="orderFormSelect"
      onChange={(e) => onSelect(Number(e.target.value))}
    >
      <option value="">Select a customer</option>
      {customers?.map((customer: Customer) => (
        <option key={customer.p_CustomerId} value={customer.p_CustomerId}>
          {customer.p_CustomerName}
        </option>
      ))}
    </select>
  );
};
export default CustomerDropdown;
