import { useSelector, useDispatch } from "react-redux"
import { authService } from "./services"
import {setAuthDetails, setLoading, setInfo,  } from "./slices"
import { useEffect } from "react"
import {Header, Footer, Login, UserProfile, Loader} from "./components"
import { Outlet } from "react-router-dom"



function App()
{
    
    const dispatch = useDispatch()

    const jwt = useSelector(state=>state.auth.token)

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
                const response = await authService.getAuthDetails(jwt)

                if(response.ok)
                {
                    const userDetails = await response.json()
                    // set user type and is logged in
                    dispatch(setAuthDetails({
                        isLoggedIn: true,
                        id: userDetails.id,
                        userType: userDetails.userType,
                    }))
                    console.log('Set Auth details')
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
            {/* <Header/> */}

            {/* error displaying component goes here */}

            {!isLoading?
                <Outlet />
                :
                <Loader/>
            }

            {/* <Footer/> */}
        </>
    )
}

export default App
