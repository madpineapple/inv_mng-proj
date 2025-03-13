import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Customer, ManufacturedProduct } from "../../components/types";

const fetchManufacturedProductByCustomerID = async (
  customerID: number
): Promise<ManufacturedProduct[]> => {
  const response = await axios.get(
    `http://localhost:5230/MaterialProduct?m_customerID=${customerID}`
  );
  const data = await response.data;
  return data;
};

export const useManufacturedProductbyCustomerID = (
  customerID: number | null
) => {
  return useQuery<ManufacturedProduct[], Error>({
    queryKey: ["manufacturedProduct", customerID], // Unique key for this query
    queryFn: () =>
      customerID
        ? fetchManufacturedProductByCustomerID(customerID)
        : Promise.resolve([]), // Pass customerID properly
    enabled: !!customerID !== undefined && customerID !== null, // Fetching function
  });
};
