import React, { useState } from "react";
import { Button } from "react-bootstrap";
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

  return (
    <tr>
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
            <Button onClick={handleSaveClick} variant="success">
              Save
            </Button>
            <Button onClick={handleDeleteClick} variant="danger">
              Delete
            </Button>
          </div>
        ) : (
          <Button onClick={handleEditClick}>Edit</Button>
        )}
      </td>
    </tr>
  );
};
export default EditableRow;
