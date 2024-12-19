import React from "react";

type FieldWrapperProps<TFormValues> = {
  name: keyof TFormValues;
  form: any; // Replace `any` with the type of `useForm` if you have it typed
  children: (field: any) => React.ReactNode;
  label?: string; // Optional label
};

const FieldWrapper = <TFormValues,>({
  name,
  form,
  children,
  label,
}: FieldWrapperProps<TFormValues>) => {
  return (
    <div className="field-wrapper">
      {label && <label htmlFor={String(name)}>{label}</label>}
      <form.Field name={name}>{children}</form.Field>
    </div>
  );
};

export default FieldWrapper;
