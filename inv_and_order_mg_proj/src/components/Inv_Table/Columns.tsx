import { ColumnDef, ColumnFiltering } from "@tanstack/react-table";
import { Product } from "../types";
import "../styles/styles.css";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "prodItemName",
    header: "Name",
    enableColumnFilter: true,
  },
  {
    accessorKey: "prodItemLotNum",
    header: "Lot Num",
    enableColumnFilter: true,
  },
  {
    accessorKey: "prodVendorLotNum",
    header: "Vendor Lot Num",
    enableColumnFilter: true,
  },
  {
    accessorKey: "prodExpDate",
    header: "ExpDate",
    enableColumnFilter: false,
  },
  {
    accessorKey: "prodItemLoc",
    header: "Item Loc",
    enableColumnFilter: true,
  },

  {
    accessorKey: "prodQuantity",
    header: "QTY",
    enableColumnFilter: false,
  },
  {
    accessorKey: "prodWeight",
    header: "Weight",
    enableColumnFilter: false,
  },
];
