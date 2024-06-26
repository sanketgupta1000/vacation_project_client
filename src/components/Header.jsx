import { useDispatch, useSelector } from "react-redux";
import {Logo, Button } from "./"
import { Link, NavLink } from "react-router-dom";
import { setAuthDetails, setToken } from "../slices";

function Header()
{

    const isLoggedIn = useSelector(state=>state.auth.authDetails.isLoggedIn)
    const userType = useSelector(state=>state.auth.authDetails.userType)

    const dispatch = useDispatch()

    // list of navlinks to render
    const navLinks = [
        {
            title: "Home",
            path: "/home",
            active: isLoggedIn
        },
        {
            title: "Signup",
            path: "/signup",
            active: !isLoggedIn
        },
        {
            title: "Login",
            path: "/login",
            active: !isLoggedIn
        },
        {
            title: "Complete Profile",
            path: "/completeProfile",
            active: isLoggedIn && userType === "NEW_MEMBER"
        },
        {
            title: "Member Approvals",
            path: "/requests/memberApprovalRequests",
            active: isLoggedIn && userType === "ADMIN"
        },
        {
            title: "Referrals",
            path: "/requests/referenceRequests",
            active: isLoggedIn && ((userType === "MEMBER")||(userType === "ADMIN"))
        },
        {
            title: "Upload Book",
            path: "/books/uploadBook",
            active: isLoggedIn && ((userType === "MEMBER")||(userType === "ADMIN"))
        },
        {
            title: "Book Approvals",
            path: "/requests/bookApprovalRequests",
            active: isLoggedIn && userType === "ADMIN"
        },
        {
            title: "My Book Uploads",
            path: "/requests/myBookApprovalRequests",
            active: isLoggedIn && ((userType === "MEMBER")||(userType === "ADMIN"))
        },
        {
            title: "All Books",
            path: "/books",
            active: isLoggedIn && ((userType === "MEMBER")||(userType === "ADMIN"))
        },
        {
            title: "Received Borrow Requests",
            path: "/requests/borrowRequests",
            active: isLoggedIn && ((userType === "MEMBER")||(userType === "ADMIN"))
        },
        {
            title: "Sent Borrow Requests",
            path: "/requests/myBorrowRequests",
            active: isLoggedIn && ((userType === "MEMBER")||(userType === "ADMIN"))
        }
    ]

    return (
    <>

        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center">
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <Logo />
                        </Link>


                        <div className="flex lg:hidden">
                            <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                <svg x-show="!isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                </svg>

                                <svg x-show="isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between">
                        <div className="flex flex-col text-gray-600 capitalize dark:text-gray-300 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">

                            {navLinks.map((navLink)=>(

                                navLink.active?
                                
                                <NavLink
                                    key={navLink.title}
                                    to={navLink.path}
                                    className={({isActive})=>`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 ${isActive?"text-gray-900 dark:text-gray-200":""}`}
                                >
                                    {navLink.title}
                                </NavLink>
                                :
                                null

                            ))}

                            <div className="relative mt-4 lg:mt-0 lg:mx-4">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>

                                <input type="text" className="w-full py-1 pl-10 pr-4 text-gray-700 placeholder-gray-600 bg-white border-b border-gray-600 dark:placeholder-gray-300 dark:focus:border-gray-300 lg:w-56 lg:border-transparent dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:border-gray-600" placeholder="Search book" />
                            </div>
                        </div>

                        <div className="flex justify-center mt-6 lg:flex lg:mt-0 lg:-mx-2">

                            <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar" />
                                </div>

                                <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">Khatab wedaa</h3>
                            </button>


                        </div>

                        {/* logout button if logged in */}
                        {isLoggedIn && 
                        (
                            <Button
                                color="red"
                                handleClick={()=>
                                    {
                                        dispatch(setToken(null));
                                        dispatch(setAuthDetails({isLoggedIn: false, id: null, userType: null}))
                                    }
                                }
                            >
                                Logout
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    </>
    );
}
export default Header;