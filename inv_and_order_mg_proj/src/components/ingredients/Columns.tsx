import { ColumnDef } from "@tanstack/react-table";
import { IngredientCheck, RecipeIngredients } from "../types";

export const columns: ColumnDef<IngredientCheck>[] = [
  {
    accessorKey: "pmProductName",
    header: "Raw Material",
    cell: ({ getValue }) => getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: "qtyRequired",
    header: "Quantity Required",
    cell: ({ getValue }) => getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: "qtyAvailable",
    header: "Quantity Available",
    cell: ({ getValue }) => getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: "isEnough",
    header: "Is Enough",
    cell: ({ getValue }) => (getValue() ? "✅" : "❌"),
    enableColumnFilter: true,
  },
];
