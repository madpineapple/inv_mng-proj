import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "../types";
import { useInventory } from "../../hooks/inventoryHooks/useInventory";
import Select from "react-select";
import { useCreateNewRecipeHooks } from "../../hooks/manufacturedProductsHooks/useCreateNewRecipeHooks";
import { useLocation } from "react-router-dom";

const CreateNewRecipe = () => {
  const { register, handleSubmit, reset } = useForm();
  const [customer, setCustomer] = useState<number | 0>(0);
  const [quantity, setQuantity] = useState<number | 0>(0);
  const [unit, sertUnit] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<
    { product: Product; quantity: number }[]
  >([]);

  const location = useLocation();

  useEffect(() => {
    setCustomer(location.state?.customer.p_CustomerId);
  });

  const { data, isLoading, error } = useInventory();

  const {
    mutate: createRecipe,
    isPending,
    isError,
    isSuccess,
  } = useCreateNewRecipeHooks();

  const ingredientOptions = data
    ? data.map((product: Product) => ({
        value: product.prodItemID,
        label: product.prodItemName,
        product,
      }))
    : [];

  const handleIngredientChange = (selectedOptions: any) => {
    const updatedIngredients = selectedOptions.map((option: any) => ({
      product: option.product, // Store full product info
      quantity: 1, // Default quantity to 1
    }));
    setSelectedIngredients(updatedIngredients);
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients[index].quantity = newQuantity;
    setSelectedIngredients(updatedIngredients);
  };

  const onSubmit = async () => {
    const recipeData = {
      p_m_productName: recipeName,
      p_m_productID: 0,
      p_customerID: customer,
      p_quantity: quantity,
      p_unit: "kg",
      p_productName: JSON.stringify(
        selectedIngredients.map((ingredient) => ({
          productName: ingredient.product.prodItemName,
          quantity: ingredient.quantity,
        }))
      ),
    };
    createRecipe(recipeData);
  };
  return (
    <div>
      <h1>New Recipe</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Enter new recipe name</label>
        <input
          {...register("recipeName", { required: "Recipe is required" })}
          onChange={(e) => setRecipeName(e.target.value)}
        />

        <label>Enter minimum order quantity</label>
        <input
          {...register("quantity", { required: "Quantity is required" })}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <label>Ingredients:</label>
        <Select
          isMulti
          options={ingredientOptions}
          onChange={handleIngredientChange}
          placeholder="Search for ingredients..."
        />

        {/* Render input fields for each selected ingredient */}
        {selectedIngredients.map((ingredient, index) => (
          <div key={ingredient.product.prodItemID}>
            <span>{ingredient.product.prodItemName}</span>
            <input
              type="number"
              min="1"
              value={ingredient.quantity}
              onChange={(e) =>
                handleQuantityChange(index, Number(e.target.value))
              }
            />
          </div>
        ))}
        <button type="submit">
          Submit
          {/* {" "} */}
          {/* {isPending ? "Creating Order..." : "Submit"} */}
        </button>
      </form>
    </div>
  );
};
export default CreateNewRecipe;
