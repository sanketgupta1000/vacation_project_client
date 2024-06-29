import React from 'react'


// to be used as a general button component
function Button({
    // the text to be displayed on the button
    children,
    // the type of button
    type="button",
    color="blue",
    // optional click handler
    handleClick,
    className="",
    // should there be no class
    noClass=false,
    ...props

})
{

    const colorVariants = {
        blue: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400",
        red: "bg-red-500 hover:bg-red-600 focus:ring-red-400",
        green: "bg-green-500 hover:bg-green-600 focus:ring-green-400",
        white: "bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    }

    const classNameToApply = noClass?className:`${colorVariants[color]} px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-opacity-80 ${className}`

    return (


        <button
            type={type}
            className={classNameToApply}
            onClick={(e) => handleClick && handleClick(e)}
            {...props}
        >
            {children}
        </button>


    )


}


export default Button