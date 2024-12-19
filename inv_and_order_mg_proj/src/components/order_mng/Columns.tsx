import { ColumnDef } from "@tanstack/react-table";
import { Order } from "../types";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "p_OrderID",
    header: "OrderId",
  },
  {
    accessorKey: " p_CustomerId:",
    header: " CustomerId",
  },
  {
    accessorKey: " p_OrderDate:",
    header: " OrderDate",
  },
  {
    accessorKey: " p_OrderStatus",
    header: "OrderStatus",
  },
  {
    accessorKey: " p_Price",
    header: "Total Price",
  },
];
