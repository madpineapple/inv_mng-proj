import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Recipe } from "../../components/types";

const insertNewRecipeApi = async (recipeToAdd: Recipe) => {
  const response = await axios.post(
    `http://localhost:5230/recipe`,
    recipeToAdd
  );
  //Do I need these ?
  if (response.status !== 200) {
    throw new Error("Failed to add recipe");
  }
  console.log("Recipe Added!");
  return response.data;
};

export const useCreateNewRecipeHooks = () => {
  const mutation = useMutation({
    mutationFn: insertNewRecipeApi,
    onError: (error) => {
      console.log("Error adding recipe: ", error);
    },
    onSuccess: () => {
      console.log("Recipe added successfully");
    },
  });
  return mutation;
};
