import { useSelector, useDispatch } from "react-redux"
import { authService } from "./services"
import {setAuthDetails, setLoading, setInfo, setUser,  } from "./slices"
import { useEffect, useState } from "react"
import {Header, Footer, Login, UserProfile, Loader} from "./components"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import './styles/backgroud1.css'
import 'react-toastify/dist/ReactToastify.css';



function App()
{
    
    const dispatch = useDispatch()

    const jwt = useSelector(state=>state.auth.token)

    const [isUserChecked, setUserChecked] = useState(false)

    // const isLoading = useSelector(state=>state.loading.isLoading)

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

        // set user checked
        setUserChecked(true)
    }

    // user logged in check after first opening app, and when jwt changes
    useEffect(()=>
    {
        checkUser()
    }, [jwt])

    return (
        <>
        <div class="area">
			<ul class="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
                <li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
            <Header/>

            {/* display outlet only when user checked */}
            {isUserChecked &&

                <Outlet />
            }

                <Loader/>
            
            <Footer/>

            {/* toaster */}
            <ToastContainer/>
        </>
    )
}

export default App