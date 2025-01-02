import { ColumnDef } from "@tanstack/react-table";
import { Order } from "../types";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "p_OrderID",
    header: "OrderId",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "p_CustomerId",
    header: "CustomerId",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "p_OrderDate",
    header: " OrderDate",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "p_OrderStatus",
    header: "OrderStatus",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "p_Price",
    header: "Total Price",
    cell: ({ getValue }) => getValue(),
  },
];
