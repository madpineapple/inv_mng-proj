type EditableCellProps = {
  value: any;
  onChange: (value: any) => void;
};

const EditableCell: React.FC<EditableCellProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default EditableCell;
