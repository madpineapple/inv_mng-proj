import { useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "../types";
import { useInventory } from "../../hooks/inventoryHooks/useInventory";
import Select from "react-select";

const CreateNewRecipe = () => {
  const { register, handleSubmit, reset } = useForm();
  const [recipeName, setRecipeName] = useState("");

  const [selectedIngredients, setSelectedIngredients] = useState<
    { product: Product; quantity: number }[]
  >([]);
  const { data, isLoading, error } = useInventory();

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
      name: recipeName,
      ingredients: selectedIngredients.map((ingredient) => ({
        productId: ingredient.product.prodItemID,
        quantity: ingredient.quantity,
      })),
    };
    console.log(recipeData);
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
