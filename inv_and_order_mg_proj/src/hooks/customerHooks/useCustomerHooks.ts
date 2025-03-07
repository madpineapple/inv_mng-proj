import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Customer } from "../../components/types";

const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get("http://localhost:5230/customer");
  const data = await response.data;
  return data;
};

export const useCustomers = () => {
  return useQuery<Customer[], Error>({
    queryKey: ["customers"], // Unique key for this query
    queryFn: fetchCustomers, // Fetching function
  });
};
