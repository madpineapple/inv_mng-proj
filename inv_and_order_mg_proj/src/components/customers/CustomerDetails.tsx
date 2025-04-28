import { useLocation, useNavigate } from "react-router-dom";
import { Customer, ManufacturedProduct } from "../types";
import { useState } from "react";
import { useManufacturedProductbyCustomerID } from "../../hooks/manufacturedProductsHooks/useManufacturedProductsHooks";
import ManufacturedProductTable from "../manufacturedProducts/ManufacturedProductTable";

const CustomerDetails: React.FC = () => {
  const location = useLocation();
  const state = location.state as { customer?: Customer } | undefined;
  const customerID = state?.customer?.p_CustomerId;
  const {
    data: products,
    isLoading,
    error,
  } = useManufacturedProductbyCustomerID(customerID || 0);

  const navigate = useNavigate();

  return (
    <div>
      <h1>Details for Customer : {state?.customer?.p_CustomerName}</h1>
      <button
        className="addButton"
        onClick={() =>
          navigate(`/recipe/${state?.customer?.p_CustomerId}`, {
            state: { customer: state?.customer },
          })
        }
      >
        + Add new customer product
      </button>
      <ManufacturedProductTable />
    </div>
  );
};

export default CustomerDetails;
