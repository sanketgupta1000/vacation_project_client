import React from "react";
import { useId } from "react";

// to be used in the form components
// will expose the underlying input field through forwardRef

const InputField = React.forwardRef(function (
  { label, type = "text", placeholder, className = "", ...props },
  ref
) {
  // id for the field, useful in linking the label to the input field
  const id = useId();

  return (
    <div>
      {/* display the label if it is provided */}
      {label && (
        <label className="block text-sm text-gray-400" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        ref={ref}
        placeholder={placeholder}
        className={`block mt-2 w-full px-5 py-2.5 focus:ring-opacity-40 ${className}`}
        autoComplete="off"
        {...props}
      />
    </div>
  );
});

export default InputField;
