import { ColumnDef } from "@tanstack/react-table";
import { Recipe } from "../types";

export const columns: ColumnDef<Recipe>[] = [
  {
    accessorKey: "p_m_productName",
    header: "Product",
    cell: ({ getValue }) => getValue(),
    enableColumnFilter: true,
  },
];
