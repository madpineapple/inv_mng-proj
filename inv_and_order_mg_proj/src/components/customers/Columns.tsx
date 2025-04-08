import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "../types";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "p_CustomerName",
    header: "Customer",
    cell: ({ getValue }) => getValue(),
    enableColumnFilter: true,
  },

  {
    accessorKey: "p_ContactInfo",
    header: "Contact Info",
    cell: ({ getValue }) => getValue(),
    enableColumnFilter: true,
  },
];
