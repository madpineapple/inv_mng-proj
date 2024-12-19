import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../../components/types";

const fetchInventory = async (): Promise<Product[]> => {
  const response = await axios.get("http://localhost:5230/product");
  const data = await response.data;
  return data;
};

export const useInventory = () => {
  return useQuery<Product[], Error>({
    queryKey: ["inventory"], // Unique key for this query
    queryFn: fetchInventory, // Fetching function
  });
};
