import axios from "axios";
import { Order } from "../../components/types";
import { useMutation } from "@tanstack/react-query";

const createNewOrder = async (newOrder: Order): Promise<Order> => {
  console.log("data: ", newOrder);
  const response = await axios.post(`http://localhost:5230/order/`, newOrder);

  if (response.status !== 200) {
    throw new Error("Failed to add order");
  }
  console.log("Order Added!");
  return response.data;
};
const useCreateNewOrder = () => {
  const mutation = useMutation<Order, Error, Order>({
    mutationFn: createNewOrder,
    onError: (error: Error) => {
      console.log("Error adding product: ", error);
    },
    onSuccess: () => {
      console.log("Product added successfully");
    },
  });
  return mutation;
};
export default useCreateNewOrder;
