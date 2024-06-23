import { useSelector, useDispatch } from "react-redux"
import { userService } from "./services"
import { setIsLoggedIn, setUserType, setLoading, setInfo, setUser } from "./slices"
import { useEffect } from "react"
import {Header, Footer} from "./components"
import { Outlet } from "react-router-dom"


function App()
{
    
    const dispatch = useDispatch()

    const jwt = useSelector(state=>state.user.token)

    const isLoading = useSelector(state=>state.loading.isLoading)

    async function checkUser()
    {
        // set loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Checking user..."}))
        
        if(jwt!=null)
        {
            // token retrieved from ls
            // now trying to to fetch user data
            
            try
            {
                const response = await userService.getUserDetails(jwt)

                if(response.ok)
                {
                    const userDetails = await response.json()
                    // set user type and is logged in
                    dispatch(setIsLoggedIn({isLoggedIn: true}))
                    dispatch(setUserType({userType: userDetails.userType}))
                }

            }
            catch(error)
            {
                dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
            }
        }

        dispatch(setLoading({isLoading: false, loadingMsg: ""}))
    }

    // user logged in check after first opening app, and when jwt changes
    useEffect(()=>
    {
        checkUser()
    }, [jwt])

    return (
        <>
            <Header/>

            {/* error displaying component goes here */}

            {!isLoading?
                <Outlet />
                :
                // loading component goes here
                "Loading..."
            }

            <Footer/>
        </>
    )
}

export default App
