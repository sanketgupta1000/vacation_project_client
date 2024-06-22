import React, { useCallback } from 'react'
import { userService } from '../services'
import { useDispatch } from 'react-redux'
import { setInfo } from '../slices'
import {debounce} from "lodash"

// a component to select a referrer
const ReferrerSelector = React.forwardRef(
    function ({
        label = "Referrer",
        placeholder = "Search for a referrer by name or email",
        ...props
    }, ref)
    {

        // dispatcher
        const dispatch = useDispatch()
    
        // ref for the search box
        const searchBoxRef = React.useRef(null)

        // state for the select options
        const [options, setOptions] = React.useState([])

        // id to connect the label with the input
        const id = React.useId()

        // callback to fetch the referrers
        const fetchReferrers = useCallback(async ()=>
        {

            // get the input value
            const searchValue = searchBoxRef.current.value
            if(searchValue=="") return
            console.log(searchValue)

            try
            {
                // fetch the referrers
                const response = await userService.getUsersByNameOrEmail(searchValue);

                if(!response.ok)
                {
                    throw new Error((await response.json()).message)
                }

                const referrers = await response.json()

                // set the options
                setOptions(referrers)

            }
            catch(error)
            {
                dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
            }

        }, [])

        // debouncing the callback
        const debouncedFetchReferrers = React.useMemo(()=>{
            return debounce(fetchReferrers, 500)
        }, [fetchReferrers])
    
        return (
    
    
            <div>
            
                {label && 
                    <label htmlFor={id} className="block text-sm text-gray-500 dark:text-gray-300">
                        {label}
                    </label>
                }

                <input
                    placeholder={placeholder}
                    className={`block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300`}
                    id={id}
                    ref={searchBoxRef}
                    onChange={debouncedFetchReferrers}
                />

                <select
                    defaultValue="no-referrer"
                    ref={ref}
                    className="mt-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                    {...props}
                >

                    {/* default enpty value */}
                    <option value="no-referrer">No Referrer</option>

                    {options.map((option)=>
                    {
                        return (
                            <option key={option.id} value={option.id}>
                                {option.fullName}: {option.email}
                            </option>
                        )
                    })}

                </select>

            </div>
    
    
        )
    
    
    }
)



export default ReferrerSelector