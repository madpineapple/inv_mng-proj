import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Order } from "../../components/types";

const fetchOrders = async (): Promise<Order[]> => {
  const response = await axios.get("http://localhost:5230/order");
  const data = await response.data;
  console.log(data);
  return data;
};

export const useOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ["orders"], // Unique key for this query
    queryFn: fetchOrders, // Fetching function
  });
};
