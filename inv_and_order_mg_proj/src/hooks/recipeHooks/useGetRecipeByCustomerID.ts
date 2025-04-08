import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Recipe } from "../../components/types";

const fetchRecipeByCustomerID = async (
  customerID: number,
  id = customerID
): Promise<Recipe[]> => {
  const response = await axios.get(`http://localhost:5230/Recipe/${id}`);
  const data = await response.data;
  return data;
};

export const useGetRecipeByCustomerID = (customerID: number | null) => {
  return useQuery<Recipe[], Error>({
    queryKey: ["recipe", customerID], // Unique key for this query
    queryFn: () =>
      customerID ? fetchRecipeByCustomerID(customerID) : Promise.resolve([]), // Pass customerID properly
    enabled: !!customerID !== undefined && customerID !== null, // Fetching function
  });
};
