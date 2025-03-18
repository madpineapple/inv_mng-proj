import { useLocation, useNavigate } from "react-router-dom";
import { Customer } from "../types";

const CustomerDetails: React.FC = () => {
  const location = useLocation();
  const state = location.state as { customer?: Customer } | undefined;
  const navigate = useNavigate();

  return (
    <div>
      <h1>Details for Customer : {state?.customer?.p_CustomerName}</h1>
      <button
        onClick={() =>
          navigate(`/recipe/${state?.customer?.p_CustomerId}`, {
            state: { customer: state?.customer },
          })
        }
      >
        + Add new recipe
      </button>
    </div>
  );
};

export default CustomerDetails;
