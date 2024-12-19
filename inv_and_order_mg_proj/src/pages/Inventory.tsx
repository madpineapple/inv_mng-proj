import { InventoryTable } from "../components/Inv_Table/InventoryTable";
import AddNewProductModal from "../components/Inv_Table/AddNewProductModal";
import useModal from "../hooks/useModal";

function Inventory() {
  const { isOpen, toggle } = useModal();

  return (
    <div>
      <h1>Inventory</h1>
      <button onClick={toggle}>Add New</button>
      <InventoryTable />
      <AddNewProductModal isOpen={isOpen} toggle={toggle} />
    </div>
  );
}
export default Inventory;
