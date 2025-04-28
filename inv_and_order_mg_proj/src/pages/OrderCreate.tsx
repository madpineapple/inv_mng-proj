import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomerDropdown from "../components/customers/CustomerDropDown";
import { useManufacturedProductbyCustomerID } from "../hooks/manufacturedProductsHooks/useManufacturedProductsHooks";
import {
  IngredientCheck,
  ManufacturedProduct,
  Order,
  RecipeIngredients,
} from "../components/types";
import useCreateNewOrder from "../hooks/orderHooks/useCreateNewOrder";
import IngredientTable from "../components/ingredients/IngredientTable";
import { useGetIngredients } from "../hooks/ingredientHooks/useGetIngredients";
import { useCheckInventory } from "../hooks/ingredientHooks/useCheckInventory";

const OrderCreate = () => {
  const { register, handleSubmit, reset } = useForm();

  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [startOrderDate, setStartOrderDate] = useState<Date | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [ingredientData, setIngredientData] = useState<RecipeIngredients[]>([]);
  const [requiredIngredients, setRequiredIngredients] = useState<
    RecipeIngredients[]
  >([]); // State for updated ingredient requirements

  const {
    data: products,
    isLoading,
    error,
  } = useManufacturedProductbyCustomerID(selectedCustomer);

  const {
    mutate: createOrder,
    isPending,
    isError,
    isSuccess,
  } = useCreateNewOrder();

  const handleCustomerSelect = (customerId: number) => {
    setSelectedCustomer(customerId);
  };
  const { data: ingredients } = useGetIngredients(selectedProduct);

  useEffect(() => {
    if (ingredients) {
      setIngredientData(ingredients);
      setRequiredIngredients(ingredients);
    }
  }, [ingredients]);

  const { data: inventory } = useCheckInventory(requiredIngredients);

  const isSubmitDisabled = inventory?.some(
    (ingredient: IngredientCheck) => !ingredient.isEnough
  );

  // Update the required ingredients based on quantity
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);

    const updatedIngredients = ingredientData.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.quantity * newQuantity, // Multiply base required amount by the quantity
    }));

    setRequiredIngredients(updatedIngredients); // Update the required ingredients
  };

  const onSubmit = () => {
    const orderData: Order = {
      p_OrderID: 0,
      p_CustomerId: selectedCustomer!,
      p_OrderDate: startOrderDate!,
      p_OrderStatus: "Pending",
      p_Price: price!,
      p_m_productId: selectedProduct!,
      p_quantity: quantity!,
    };

    createOrder(orderData, {
      onSuccess: () => {
        console.log("Order added successfully!");
        reset();
        setStartOrderDate(null);
        setSelectedCustomer(null);
        setSelectedProduct(null);
      },
    });
  };

  return (
    <div>
      <h1 className="customH1">Create new order</h1>
      <form className={"orderForm"} onSubmit={handleSubmit(onSubmit)}>
        <CustomerDropdown onSelect={handleCustomerSelect} />
        <label>Pick new order date</label>
        <DatePicker
          className="orderFormInput"
          selected={startOrderDate}
          onChange={(date: Date | null) => setStartOrderDate(date)}
        />
        <label>Select Customer Product</label>
        <select
          className="orderFormSelect"
          value={selectedProduct || ""}
          onChange={(e) => setSelectedProduct(Number(e.target.value))}
        >
          <option value="">Select Customer Product</option>
          {isLoading ? (
            <option>Loading...</option>
          ) : error ? (
            <option>Error fetching products</option>
          ) : (
            products?.map((product: ManufacturedProduct) => (
              <option key={product.m_productID} value={product.m_productID}>
                {product.m_productName}
              </option>
            ))
          )}
        </select>
        {inventory && <IngredientTable inventory={inventory} />}
        <label>Enter number of 1000-unit batches</label>
        <input
          className="orderFormInput"
          {...register("quantity", { required: "Quantity is required" })}
          value={quantity}
          type="number"
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
        />
        <label>Enter price</label>
        <input
          className="orderFormInput"
          {...register("price", { required: "Price is required" })}
          type="number"
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <button
          className="addButton"
          type="submit"
          disabled={isSubmitDisabled || isPending}
        >
          {" "}
          {isPending ? "Creating Order..." : "Submit"}
        </button>
      </form>

      {isSuccess && <p>Order created successfully!</p>}
      {isError && <p>Error creating order!</p>}
    </div>
  );
};
export default OrderCreate;
