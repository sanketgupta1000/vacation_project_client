import React from 'react'
import ClickAwayListener from 'react-click-away-listener'


function Dropdown({
    rounded = "rounded-md",
    btnElement = (<svg className="w-5 h-5 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>),
    children
})
{

    // dropdown open state
    const [isDropdownOpen, setDropdownOpen] = React.useState(false)

    return (


        <div className="relative inline-block">
            {/* <!-- Dropdown toggle button --> */}
            <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className={`${rounded} relative z-10 block p-2 text-gray-700 bg-white border border-transparent dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none`}
            >
                {btnElement}
            </button>

            {/* <!-- Dropdown menu --> */}
            {isDropdownOpen &&

                // hide on click away
                <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>

                    {children}

                </ClickAwayListener>
            }
        </div>

    )


}


export default Dropdown