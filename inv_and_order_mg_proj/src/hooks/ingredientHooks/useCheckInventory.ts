// useCheckInventory.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RecipeIngredients } from "../../components/types";

const checkInventory = async (
  ingredients: RecipeIngredients[]
): Promise<any> => {
  const response = await axios.post(
    "http://localhost:5230/IngredientCheck",
    ingredients
  );
  console.log(ingredients);

  return response.data;
};

export const useCheckInventory = (ingredients: RecipeIngredients[] | null) => {
  return useQuery({
    queryKey: ["checkInventory", ingredients],
    queryFn: () =>
      ingredients && ingredients.length > 0
        ? checkInventory(ingredients)
        : Promise.resolve([]),
    enabled: !!ingredients && ingredients.length > 0,
  });
};
