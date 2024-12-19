import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const deleteInventoryItemApI = async (productToDelete: number) => {
  const response = await axios.delete(
    `http://localhost:5230/product/${productToDelete}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to delete product");
  }
  console.log("Product Deleted!");
  return response.data;
};

const useDeleteInventoryItem = () => {
  const mutation = useMutation({
    mutationFn: deleteInventoryItemApI,
    onError: (error) => {
      console.log("Error deleting product: ", error);
    },
    onSuccess: () => {
      console.log("Product deleted successfully");
    },
  });
  return mutation;
};
export default useDeleteInventoryItem;
