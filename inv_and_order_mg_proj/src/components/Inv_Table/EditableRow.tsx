import React, { useEffect, useRef, useState } from "react";
import EditableCell from "./EditableCell";
import { Product } from "../types";
import { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import useUpdateInventory from "../../hooks/inventoryHooks/useUpdateInventory";
import useDeleteInventoryItem from "../../hooks/inventoryHooks/useDeleteInventoryItem";

type EditableRowProps = {
  row: Row<Product>;
  columns: any[];
};

const EditableRow: React.FC<EditableRowProps> = ({ row }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(row.original);
  const rowRef = useRef<HTMLTableRowElement | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const { mutate: updateProduct } = useUpdateInventory();
  const { mutate: productToDelete } = useDeleteInventoryItem();

  const handleSaveClick = async () => {
    try {
      updateProduct(editedProduct);
      setIsEditing(false);
    } catch (err) {
      console.log("Error saving product: ", err);
    }
  };

  const handleDeleteClick = async () => {
    try {
      productToDelete(editedProduct.prodItemID);
      setIsEditing(false);
    } catch (err) {
      console.log("Error saving product: ", err);
    }
  };

  const handleChange = (field: keyof Product, value: any) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rowRef.current && !rowRef.current.contains(event.target as Node)) {
        setIsEditing(false); // Cancel editing if click is outside
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsEditing(false); // Cancel editing on Escape key press
      }
    };

    // Add the event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listeners on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <tr ref={rowRef}>
      {row.getVisibleCells().map((cell) => {
        const column = cell.column;
        return (
          <td key={column.id}>
            {isEditing ? (
              <EditableCell
                value={editedProduct[column.id as keyof Product]}
                onChange={(value) =>
                  handleChange(column.id as keyof Product, value)
                }
              />
            ) : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
          </td>
        );
      })}
      <td>
        {isEditing ? (
          <div>
            <button className="saveButton" onClick={handleSaveClick}>
              Save
            </button>
            <button className="deleteButton" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        ) : (
          <button className="editButton" onClick={handleEditClick}>
            Edit
          </button>
        )}
      </td>
    </tr>
  );
};
export default EditableRow;
