import React,{useId} from 'react'


// a general select input component
// will expose the underlying select input through forwardRef
const SelectInput = React.forwardRef(function({
    // optional label for the select input
    label,
    // options array
    options,
    className="",
    ...props
}, ref)
{

    // id for the field, useful in linking the label to the input field
    const id = useId()

    return(

        <div>

            {/* display the label if it is provided */}
            {
            label &&
            <label
                htmlFor={id}
                className='block text-sm font-medium text-gray-900'
            >
                {label}
            </label>
            }

            <select
                id={id}
                className={`mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm ${className}`}
                ref={ref}
                {...props}
            >

                {options.map((option)=>(
                    <option value={option.value} key={option.value}>
                        {option.name}
                    </option>
                ))}

            </select>

        </div>

    )
})


export default SelectInput