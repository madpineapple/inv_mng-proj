import { useEffect, useState } from "react";
import { Recipe } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import useUpdateRecipeHook from "../../hooks/recipeHooks/useUpdateRecipeHook";

const EditProduct = () => {
  const location = useLocation();
  const state = location.state as { product?: Recipe } | undefined;
  const [recipeName, setRecipeName] = useState(
    state?.product?.p_m_productName || ""
  );
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(state?.product?.p_quantity || 0);

  const [ingredients, setIngredients] = useState<
    { productName: string; quantity: number }[]
  >([]);

  useEffect(() => {
    if (state?.product?.p_productName) {
      try {
        const parsed = JSON.parse(state.product.p_productName);
        setIngredients(parsed);
      } catch (err) {
        console.error("Failed to parse ingredients JSON:", err);
      }
    }
  }, [state?.product?.p_productName]);

  //Not sure if this will work
  const handleIngredientChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setIngredients((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: field === "quantity" ? Number(value) : value,
      };
      return updated;
    });
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, { productName: "", quantity: 0 }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const { mutate: updateRecipe } = useUpdateRecipeHook();

  const handleSaveClick = async () => {
    if (!state?.product) return;

    const editedProduct = {
      p_m_productName: recipeName,
      p_m_productID: state.product.p_m_productID,
      p_customerID: state.product.p_customerID,
      p_quantity: quantity,
      p_unit: state.product.p_unit || "unit",
      p_productName: JSON.stringify(ingredients),
    };
    console.log("edited product:", editedProduct);
    try {
      updateRecipe(editedProduct);
    } catch (err) {
      console.log("Error saving Recipe: ", err);
    }
    navigate(-1);
  };

  return (
    <div>
      <h1>Edit Product: {state?.product?.p_m_productName}</h1>
      <form>
        <label>Recipe name</label>
        <input
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <label>Minimum order quantity (in units)</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <label>Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
          >
            <input
              type="text"
              value={ingredient.productName}
              onChange={(e) =>
                handleIngredientChange(index, "productName", e.target.value)
              }
              placeholder="Product ID"
            />

            <input
              type="number"
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
            />
            <label>qty in kilos</label>

            <button type="button" onClick={() => removeIngredient(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>
        <button type="button" onClick={handleSaveClick}>
          Save changes
        </button>
      </form>
    </div>
  );
};
export default EditProduct;
