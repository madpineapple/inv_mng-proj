import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../../components/types";

const insertNewInventoryItmeAPI = async (productToAdd: Product) => {
  const response = await axios.post(
    `http://localhost:5230/product/`,
    productToAdd
  );
  if (response.status !== 200) {
    throw new Error("Failed to delete product");
  }
  console.log("Product Deleted!");
  return response.data;
};
const useInsertNewItem = () => {
  const mutation = useMutation({
    mutationFn: insertNewInventoryItmeAPI,
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
