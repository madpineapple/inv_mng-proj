import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomerDropdown from "../components/customers/CustomerDropDown";
import { useManufacturedProductbyCustomerID } from "../hooks/manufacturedProductsHooks/useManufacturedProductsHooks";
import { Order, RecipeIngredients } from "../components/types";
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
  const [quantity, setQuantity] = useState<number | null>(null);
  const [ingredientData, setIngredientData] = useState<RecipeIngredients[]>([]);

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
    }
  }, [ingredients]);

  const { data: inventory } = useCheckInventory(ingredientData);
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
      <h1>Create new order</h1>
      <form className={"order-form"} onSubmit={handleSubmit(onSubmit)}>
        <CustomerDropdown onSelect={handleCustomerSelect} />
        <label>Pick new order date</label>
        <DatePicker
          selected={startOrderDate}
          onChange={(date: Date | null) => setStartOrderDate(date)}
        />
        <label>Select Customer Product</label>
        <select
          value={selectedProduct || ""}
          onChange={(e) => setSelectedProduct(Number(e.target.value))}
        >
          <option value="">Select Customer Product</option>
          {isLoading ? (
            <option>Loading...</option>
          ) : error ? (
            <option>Error fetching products</option>
          ) : (
            //probably shouldn't have an any type. Review later
            products?.map((product: any) => (
              <option key={product.m_productID} value={product.m_productID}>
                {product.m_productName}
              </option>
            ))
          )}
        </select>
        {inventory && <IngredientTable inventory={inventory} />}
        <label>Enter number of 1000-unit batches</label>
        <input
          {...register("quantity", { required: "Quantity is required" })}
          type="number"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <label>Enter price</label>
        <input
          {...register("price", { required: "Price is required" })}
          type="number"
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <button type="submit">
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
