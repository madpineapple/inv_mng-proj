import { InventoryTable } from "../components/Inv_Table/InventoryTable";
import AddNewProductModal from "../components/Inv_Table/AddNewProductModal";
import useModal from "../hooks/useModal";
import "../../src/components/styles/styles.css";

function Inventory() {
  const { isOpen, toggle } = useModal();

  return (
    <div>
      <h1 className="customH1">Inventory</h1>
      <button className="addButton" onClick={toggle}>
        Add New
      </button>
      <div>
        <InventoryTable />
      </div>
      <AddNewProductModal isOpen={isOpen} toggle={toggle} />
    </div>
  );
}
export default Inventory;
