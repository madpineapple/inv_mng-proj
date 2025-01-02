import { useEffect, useState } from "react";
import { useOrders } from "../../hooks/orderHooks/useOrders";
import { Order } from "../types";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./Columns";
const OrderTable = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const { data, isLoading, error } = useOrders();

  useEffect(() => {
    if (data) {
      console.log(data);
      setOrderData(data);
    }
  }, [data]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data: orderData,
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
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                console.log("Rendering cell:", cell.renderValue);
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default OrderTable;
