import React from 'react'


// to be used as a general button component
function Button({
    // the text to be displayed on the button
    children,
    // the type of button
    type="button",
    className="",
    bgColor="blue",
    textColor="white",
    // optional click handler
    handleClick,
    ...props

})
{


    return (


        <button
            type={type}
            className={`px-6 py-2 font-medium tracking-wide text-${textColor} capitalize transition-colors duration-300 transform bg-${bgColor}-600 rounded-lg hover:bg-${bgColor}-500 focus:outline-none focus:ring focus:ring-${bgColor}-300 focus:ring-opacity-80 ${className}`}
            onClick={(e) => handleClick && handleClick(e)}
            {...props}
        >
            {children}
        </button>


    )


}


export default Button