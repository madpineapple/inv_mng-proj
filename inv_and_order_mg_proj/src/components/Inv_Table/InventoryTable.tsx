import { Product } from "../types";
import { useInventory } from "../../hooks//inventoryHooks/useInventory";
import { ReactNode, useEffect, useState } from "react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./Columns";
import "../styles/styles.css";
import EditableRow from "./EditableRow";

export const InventoryTable = () => {
  const [invData, setInvData] = useState<Product[]>([]);

  const { data, isLoading, error } = useInventory();

  useEffect(() => {
    if (data) {
      setInvData(data);
    }
  }, [data]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: invData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Error loading inventory!</p>;

  return (
    <div>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.column.columnDef.header as ReactNode}
                  {header.column.getCanFilter() ? (
                    <input
                      type="text"
                      value={(header.column.getFilterValue() as string) || ""}
                      onChange={(e) =>
                        header.column.setFilterValue(e.target.value)
                      }
                      placeholder={`Search ${header.column.columnDef.header}`}
                    />
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <EditableRow key={row.id} row={row} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
