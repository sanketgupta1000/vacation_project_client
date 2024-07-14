import React, { useId } from "react";

// a general select input component
// will expose the underlying select input through forwardRef
const SelectInput = React.forwardRef(function (
  {
    // optional label for the select input
    label,
    placeholder,
    // options array
    options,
    className = "",
    ...props
  },
  ref
) {
  // id for the field, useful in linking the label to the input field
  const id = useId();

  return (
    <div>
      {/* display the label if it is provided */}
      {label && (
        <label htmlFor={id} className="block text-sm text-gray-400">
          {label}
        </label>
      )}

      <select
        id={id}
        ref={ref}
        className={`block mt-2 w-full px-5 py-2.5 focus:ring-opacity-40 ${className}`}
        {...props}
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SelectInput;
