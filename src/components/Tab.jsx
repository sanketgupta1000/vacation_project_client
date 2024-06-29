const Tab = (
    {
        children,
        active=false,
        onClick,
    }
)=>
{
    return(
    <button className={`inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2  sm:text-base  whitespace-nowrap focus:outline-none ${ active ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent cursor-base hover:border-gray-400'}`}        onClick={onClick}
        >
        {children}
    </button>
    )
}

export default Tab