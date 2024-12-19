import { useMutation } from "@tanstack/react-query";
import { Product } from "../../components/types";
import axios from "axios";

const updatedInventoryAPI = async (updatedProduct: Product) => {
  const response = await axios.put(
    `http://localhost:5230/product/`,
    updatedProduct
  );
  if (response.status !== 200) {
    throw new Error("Failed to update product");
  }
  console.log(updatedProduct);
  return response.data;
};

const useUpdateInventory = () => {
  const mutation = useMutation({
    mutationFn: updatedInventoryAPI,
    onError: (error) => {
      console.log("Error updating product: ", error);
    },
    onSuccess: (updatedProduct) => {
      console.log("Product updated successfully:", updatedProduct);
    },
  });
  return mutation;
};

export default useUpdateInventory;
