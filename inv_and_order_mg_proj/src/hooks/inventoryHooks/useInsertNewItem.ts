import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../../components/types";

const insertNewInventoryItemAPI = async (productToAdd: Product) => {
  const response = await axios.post(
    `http://localhost:5230/product/`,
    productToAdd
  );
  if (response.status !== 200) {
    throw new Error("Failed to add product");
  }
  console.log("Product Added!");
  return response.data;
};
const useInsertNewItem = () => {
  const mutation = useMutation({
    mutationFn: insertNewInventoryItemAPI,
    onError: (error) => {
      console.log("Error adding product: ", error);
    },
    onSuccess: () => {
      console.log("Product added successfully");
    },
  });
  return mutation;
};
export default useInsertNewItem;
