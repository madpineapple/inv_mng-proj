import { useForm } from "@tanstack/react-form";
import FieldWrapper from "./FieldWrapper";
import { ModalProps } from "react-bootstrap";
import useInsertNewItem from "../../hooks/inventoryHooks/useInsertNewItem";

const AddNewModal: React.FC<ModalProps> = ({ isOpen, toggle }) => {
  const { mutate: productToAdd } = useInsertNewItem();
  const form = useForm({
    defaultValues: {
      prodItemID: 0,
      prodItemName: "",
      prodItemLoc: "",
      prodItemLotNum: "",
      prodVendorLotNum: "",
      prodExpDate: new Date(),
      prodQuantity: 0,
      prodWeight: 0,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      try {
        productToAdd(value);
      } catch (err) {
        console.log("Error saving product: ", err);
      }
      form.reset();
    },
  });

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <div>
                <FieldWrapper
                  name="prodItemName"
                  form={form}
                  label="Product Name"
                >
                  {(field) => (
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </FieldWrapper>
                <FieldWrapper
                  name="prodItemLoc"
                  form={form}
                  label="Product Location"
                >
                  {(field) => (
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </FieldWrapper>
                <FieldWrapper
                  name="prodItemLotNum"
                  form={form}
                  label="Product Lot Number"
                >
                  {(field) => (
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </FieldWrapper>
                <FieldWrapper
                  name="prodVendorLotNum"
                  form={form}
                  label="Product  Vendor Lot Number"
                >
                  {(field) => (
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </FieldWrapper>
                <FieldWrapper
                  name="prodExpDate"
                  form={form}
                  label="Product Expiration Date"
                >
                  {(field) => (
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </FieldWrapper>
                <FieldWrapper
                  name="prodQuantity"
                  form={form}
                  label="Product Quantity"
                >
                  {(field) => (
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </FieldWrapper>
                <FieldWrapper
                  name="prodWeight"
                  form={form}
                  label="Product Weight"
                >
                  {(field) => (
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </FieldWrapper>
              </div>
              <button type="submit">Submit</button>
              <button onClick={toggle}>Close</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewModal;
