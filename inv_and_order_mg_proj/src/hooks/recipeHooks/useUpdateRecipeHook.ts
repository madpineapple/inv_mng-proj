import { useMutation } from "@tanstack/react-query";
import { Recipe } from "../../components/types";
import axios from "axios";

const updatedRecipeAPI = async (updatedRecipe: Recipe) => {
  const response = await axios.put(
    `http://localhost:5230/recipe/`,
    updatedRecipe
  );
  if (response.status !== 200) {
    throw new Error("Failed to update product");
  }
  console.log(updatedRecipe);
  return response.data;
};

const useUpdateRecipeHook = () => {
  const mutation = useMutation({
    mutationFn: updatedRecipeAPI,
    onError: (error) => {
      console.log("Error updating recipe: ", error);
    },
    onSuccess: (updatedProduct) => {
      console.log("Recipe updated successfully:", updatedProduct);
    },
  });
  return mutation;
};

export default useUpdateRecipeHook;
