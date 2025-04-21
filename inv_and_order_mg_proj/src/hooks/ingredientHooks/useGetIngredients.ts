import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RecipeIngredients } from "../../components/types";

const fetchIngredientsByID = async (
  customerID: number
): Promise<RecipeIngredients[]> => {
  const response = await axios.get(
    `http://localhost:5230/RecipeIngredients?id=${customerID}`
  );
  const rawData = response.data;

  if (!Array.isArray(rawData) || rawData.length === 0) return [];

  // Parse the product_name field
  const ingredients = JSON.parse(rawData[0].product_name);

  return ingredients;
};

export const useGetIngredients = (id: number | null) => {
  return useQuery<RecipeIngredients[], Error>({
    queryKey: ["recipeIngredients", id],
    queryFn: () =>
      id !== null && id !== undefined
        ? fetchIngredientsByID(id)
        : Promise.resolve([]),
    enabled: id !== null && id !== undefined,
  });
};
