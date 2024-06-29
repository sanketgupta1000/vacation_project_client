import { useDispatch, useSelector } from "react-redux";
import {Logo, Button, Dropdown } from "./"
import { Link, NavLink } from "react-router-dom";
import { setAuthDetails, setToken } from "../slices";
import { useState } from "react";

function Header()
{

    const isLoggedIn = useSelector(state=>state.auth.authDetails.isLoggedIn)
    const userType = useSelector(state=>state.auth.authDetails.userType)
    const userId = useSelector(state=>state.auth.authDetails.id)
    const dispatch = useDispatch()

    // navbar open state
    const [isOpen, setOpen] = useState(false)

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
            title: "All Books",
            path: "/books",
            active: isLoggedIn && ((userType === "MEMBER")||(userType === "ADMIN"))
        },
        {
            title: "Upload Book",
            path: "/books/uploadBook",
            active: isLoggedIn && ((userType === "MEMBER")||(userType === "ADMIN"))
        },
        {
            title: "My Book Uploads",
            path: "/requests/myBookApprovalRequests",
            active: isLoggedIn && ((userType === "MEMBER")||(userType === "ADMIN"))
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
            title: "Book Approvals",
            path: "/requests/bookApprovalRequests",
            active: isLoggedIn && userType === "ADMIN"
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

    // visible links array
    const visibleNavLinks = []
    // dropdown links array
    const dropdownNavLinks = []

    let countOfAddedLinks = 0

    for(let i = 0; i<navLinks.length; i++)
    {
        // check if link is active
        if(navLinks[i].active)
        {
            if(countOfAddedLinks<5)
            {
                visibleNavLinks.push(navLinks[i])
                countOfAddedLinks++
            }
            else
            {
                dropdownNavLinks.push(navLinks[i])
            }
        }
    }

    return (
    <>
       <div className=" bg-gradient-to-tl from-slate-900 via-black to-slate-500 text-white font-serif">
        <nav className=" dark:bg-gray-800">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center">
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <Logo />
                        </Link>

                        {/* mobile menu buttons */}
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu"
                                // toggle open state on click
                                onClick={()=>setOpen(!isOpen)}
                            >

                                {
                                isOpen?
                                
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                
                                :

                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                </svg>
                                }


                            </button>
                        </div>
                    </div>

                    <div className={`${isOpen?"translate-x-0 opacity-100":"opacity-0 -translate-x-full"} absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between`}>
                        <div className="flex flex-col text-white font-serif capitalize dark:text-gray-300 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">

                            {visibleNavLinks.map((navLink)=>(
                                
                                <NavLink
                                    key={navLink.title}
                                    to={navLink.path}
                                    className={({isActive})=>`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-yellow-600 dark:hover:text-gray-200 ${isActive?"text-green-500 dark:text-gray-200":""}`}
                                >
                                    {navLink.title}
                                </NavLink>

                            ))}

                            {/* dropdown for more links */}
                            {dropdownNavLinks.length>0 &&
                            
                            <div>

                                <Dropdown
                                >

                                    <div
                                        className="absolute left-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                                    >
                                        {dropdownNavLinks.map((navLink)=>(
                                            
                                            <Link
                                                key={navLink.title}
                                                to={navLink.path}
                                                className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                {navLink.title}
                                            </Link>

                                        ))}
                                        
                                    </div>

                                </Dropdown>

                            </div>
                            
                            }

                        </div>

                        {/* search input */}
                        {isLoggedIn && userType!="NEW_MEMBER" &&
                        <div className="relative mt-4 lg:mt-0 lg:mx-4">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>

                            <input type="text" className="w-full py-1 pl-10 pr-4 text-gray-700 placeholder-gray-600 bg-white border-b border-gray-600 dark:placeholder-gray-300 dark:focus:border-gray-300 lg:w-56 lg:border-transparent dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:border-gray-600" placeholder="Search book" />
                        </div>
                        }


                        {/* dropdown for user profile */}
                        {isLoggedIn &&
                    
                        <Dropdown
                            rounded="rounded-full"
                            btnElement={
                                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar" />
                                </div>
                            }
                        >
                        
                            <div
                                className="absolute lg:right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                            >

                                {userType!="NEW_MEMBER" &&
                                
                                <Link
                                    to={`/users/${userId}`}
                                    className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Profile
                                </Link>
                                
                                }

                                <Button
                                    noClass
                                    className="w-full text-left block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                                    handleClick={()=>
                                        {
                                            dispatch(setToken(null));
                                            dispatch(setAuthDetails({isLoggedIn: false, id: null, userType: null}))
                                        }
                                    }
                                >
                                    Logout
                                </Button>
                            </div>
                        
                        </Dropdown>
                        }

                    </div>
                </div>
            </div>
        </nav>
        </div>
    </>
    );
}
export default Header;