import { useDispatch, useSelector } from "react-redux";
import { Logo, Button, Dropdown } from "./";
import { Link, NavLink } from "react-router-dom";
import { setAuthDetails, setToken } from "../slices";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";

function Header() {
  const isLoggedIn = useSelector((state) => state.auth.authDetails.isLoggedIn);
  const userType = useSelector((state) => state.auth.authDetails.userType);
  const userId = useSelector((state) => state.auth.authDetails.id);
  const userProfilePhotoURL = useSelector(
    (state) => state.auth.authDetails.userProfilePhotoURL
  );
  const dispatch = useDispatch();

  // navbar open state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // list of navlinks to render
  const navLinks = [
    {
      title: "Home",
      path: "/home",
      active: isLoggedIn,
    },
    {
      title: "Signup",
      path: "/signup",
      active: !isLoggedIn,
    },
    {
      title: "Login",
      path: "/login",
      active: !isLoggedIn,
    },
    {
      title: "Complete Profile",
      path: "/completeProfile",
      active: isLoggedIn && userType === "NEW_MEMBER",
    },
    {
      title: "All Books",
      path: "/books",
      active: isLoggedIn && (userType === "MEMBER" || userType === "ADMIN"),
    },
    {
      title: "Upload Book",
      path: "/books/uploadBook",
      active: isLoggedIn && (userType === "MEMBER" || userType === "ADMIN"),
    },
    {
      title: "My Book Uploads",
      path: "/requests/myBookApprovalRequests",
      active: isLoggedIn && (userType === "MEMBER" || userType === "ADMIN"),
    },
    {
      title: "Member Approvals",
      path: "/requests/memberApprovalRequests",
      active: isLoggedIn && userType === "ADMIN",
    },
    {
      title: "Referrals",
      path: "/requests/referenceRequests",
      active: isLoggedIn && (userType === "MEMBER" || userType === "ADMIN"),
    },
    {
      title: "Book Approvals",
      path: "/requests/bookApprovalRequests",
      active: isLoggedIn && userType === "ADMIN",
    },
    {
      title: "Received Borrow Requests",
      path: "/requests/borrowRequests",
      active: isLoggedIn && (userType === "MEMBER" || userType === "ADMIN"),
    },
    {
      title: "Sent Borrow Requests",
      path: "/requests/myBorrowRequests",
      active: isLoggedIn && (userType === "MEMBER" || userType === "ADMIN"),
    },
  ];

  // visible links array
  const visibleNavLinks = [];
  // dropdown links array
  const dropdownNavLinks = [];

  let countOfAddedLinks = 0;

  for (let i = 0; i < navLinks.length; i++) {
    // check if link is active
    if (navLinks[i].active) {
      if (countOfAddedLinks < 3) {
        visibleNavLinks.push(navLinks[i]);
        countOfAddedLinks++;
      } else {
        dropdownNavLinks.push(navLinks[i]);
      }
    }
  }

  return (
    <header className="bg-gradient-to-r from-gray-700 via-black to-blue-800 text-white p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <div className="text-2xl font-bold tracking-wide mr-4 lg:mr-10">
            Logo
          </div>
        </Link>
        <nav className="hidden md:flex space-x-9 mx-10">
          {visibleNavLinks.map((navLink) => (
            <NavLink
              key={navLink.title}
              to={navLink.path}
              end
              className={({ isActive }) =>
                `hover:text-gray-400 transition duration-200 ${
                  isActive ? "text-blue-500" : ""
                }`
              }
            >
              {navLink.title}
            </NavLink>
          ))}

          {dropdownNavLinks.length > 0 && (
            <ClickAwayListener onClickAway={() => setIsDropdownOpen(false)}>
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                <button className="text-gray-400 hover:text-white focus:outline-none flex items-center transition duration-200">
                  more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-10"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    {dropdownNavLinks.map((navLink) => (
                      <Link
                        key={navLink.title}
                        to={navLink.path}
                        className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition duration-200"
                      >
                        {navLink.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </ClickAwayListener>
          )}
        </nav>
      </div>
      {isLoggedIn && userType != "NEW_MEMBER" && (
        <div className="flex-1 md:ml-10">
          <input
            type="text"
            placeholder="Search..."
            className="w-11/12 lg:w-1/2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring focus:border-blue-500 transition duration-200"
          />
        </div>
      )}

      <div className="relative flex items-end space-x-4">
        <ClickAwayListener onClickAway={() => setIsMobileMenuOpen(false)}>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-400 hover:text-white focus:outline-none transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            {isMobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-10">
                {visibleNavLinks.map((navLink) => (
                  <Link
                    key={navLink.title}
                    to={navLink.path}
                    className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition duration-200"
                  >
                    {navLink.title}
                  </Link>
                ))}
                {dropdownNavLinks.map((navLink) => (
                  <Link
                    key={navLink.title}
                    to={navLink.path}
                    className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition duration-200"
                  >
                    {navLink.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </ClickAwayListener>
        {isLoggedIn && (
          <ClickAwayListener
            onClickAway={() => setIsProfileDropdownOpen(false)}
          >
            <div className="relative">
              <button
                onMouseEnter={() => setIsProfileDropdownOpen(true)}
                className="text-gray-400 hover:text-white focus:outline-none transition duration-200"
              >
                <img
                  className="object-cover w-16 h-16 rounded-full"
                  src="https://picsum.photos/id/237/200/300"
                />
              </button>
              {isProfileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-10"
                  onMouseLeave={() => setIsProfileDropdownOpen(false)}
                >
                  {userType != "NEW_MEMBER" && (
                    <Link
                      to={`/users/${userId}`}
                      className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition duration-200"
                    >
                      Profile
                    </Link>
                  )}

                  <button
                    noClass
                    className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition duration-200"
                    handleClick={() => {
                      dispatch(setToken(null));
                      dispatch(
                        setAuthDetails({
                          isLoggedIn: false,
                          id: null,
                          userType: null,
                        })
                      );
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </ClickAwayListener>
        )}
      </div>
    </header>
  );
}
export default Header;
