import { useEffect, useState } from "react";
import { Customer, Recipe } from "../types";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./Columns";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetRecipeByCustomerID } from "../../hooks/recipeHooks/useGetRecipeByCustomerID";
import React from "react";

const ManufacturedProductTable = () => {
  const location = useLocation();
  const state = location.state as { customer?: Customer } | undefined;
  const customerID = state?.customer?.p_CustomerId;
  const [productData, setProductData] = useState<Recipe[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };
  const { data, isLoading, error } = useGetRecipeByCustomerID(customerID || 0);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setProductData(data);
    }
  }, [data]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: productData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Error loading inventory!</p>;

  return (
    <div>
      <table className="custom-table">
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
          {table.getRowModel().rows.map((row) => {
            const rowId = Number(row.original.p_m_productID);
            return (
              <React.Fragment key={row.id}>
                <tr>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  <td>
                    <button
                      className="editButton"
                      onClick={() =>
                        navigate(`/EditProduct`, {
                          state: { product: row.original },
                        })
                      }
                    >
                      {" "}
                      Edit
                    </button>
                    <button
                      className="dropButton"
                      onClick={() => toggleRow(rowId)}
                    >
                      {expandedRows.includes(rowId) ? "▲" : "▼"}
                    </button>
                  </td>
                </tr>

                {/* Expanded Row  with Table*/}
                {expandedRows.includes(rowId) && (
                  <table
                    className="dropdownTable"
                    // style={{
                    //   tableLayout: "fixed",
                    //   width: "100%",
                    // }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "60%" }}>Raw Material</th>
                        <th style={{ width: "40%" }}>Quantity</th>
                      </tr>
                    </thead>

                    <tbody>
                      {row.original.p_productName ? (
                        (() => {
                          try {
                            const parsed = JSON.parse(
                              row.original.p_productName
                            );
                            if (Array.isArray(parsed)) {
                              return parsed.map((item: any, index: number) => (
                                <tr key={index}>
                                  <td>{item.productName}</td>
                                  <td>{item.quantity}</td>
                                </tr>
                              ));
                            } else if (parsed && typeof parsed === "object") {
                              return (
                                <div>
                                  {parsed.productName} (Quantity:{" "}
                                  {parsed.quantity})
                                </div>
                              );
                            } else {
                              return <span>Invalid data format</span>;
                            }
                          } catch (error) {
                            return <span>Error parsing data</span>;
                          }
                        })()
                      ) : (
                        <span>No ingredients available</span>
                      )}
                    </tbody>
                  </table>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="pagContainer">
        <button
          className="pagButton"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="pagButton"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="pagButton"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="pagButton"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="pagText">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="pagText">
          | Go to page:
          <input
            className="pagInput"
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>
        <select
          className="pagSelect"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default ManufacturedProductTable;
