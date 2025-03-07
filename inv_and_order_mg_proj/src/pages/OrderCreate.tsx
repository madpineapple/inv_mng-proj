import { useForm } from "react-hook-form";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomerDropdown from "../components/customers/CustomerDropDown";

const OrderCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  const [startOrderDate, setStartOrderDate] = useState<Date | null>(null);

  const handleCustomerSelect = (customerId: number) => {
    setSelectedCustomer(customerId);
  };
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <h1>Create new order</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomerDropdown onSelect={handleCustomerSelect} />
        <label>Pick new order date</label>
        <DatePicker
          selected={startOrderDate}
          onChange={(date: Date | null) => setStartOrderDate(date)}
        />
        <select>
          <option value="">Select Customer Product</option>
          <option>Dog chew type 1</option>
          <option>Dog chew type 2</option>
          <option>Dog chew type 3</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default OrderCreate;
