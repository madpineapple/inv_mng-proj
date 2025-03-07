import { ColumnDef } from "@tanstack/react-table";
import { Order } from "../types";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "p_customerName",
    header: "Customer",
    cell: ({ getValue }) => getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: "p_orderDate",
    header: " OrderDate",
    cell: ({ getValue }) => getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: "p_orderStatus",
    header: "OrderStatus",
    cell: ({ getValue }) => getValue(),
    enableColumnFilter: true,
  },
];
