import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  const isLoggedIn = useSelector((state) => state.auth.authDetails.isLoggedIn);
  const userType = useSelector((state) => state.auth.authDetails.userType);
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
  ];

  // visible links array
  const visibleNavLinks = [];

  for (let i = 0; i < navLinks.length; i++) {
    // check if link is active
    if (navLinks[i].active) {
      visibleNavLinks.push(navLinks[i]);
    }
  }

  return (
    <footer className="bg-gradient-to-t from-blue-900 via-gray-900 to-black  text-white py-8">
      <div className="container mx-auto flex flex-wrap items-start justify-between">
        <div className="w-full md:w-2/5 mb-8 md:mb-0 px-10  ">
          <div className="flex items-center">
            <div className="text-3xl font-bold text-blue-500">Logo</div>
          </div>
          <p className="mt-4 text-sm">
            Share your books with others. Knoledge increases by sharing. Trade
            your read now. Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Ullam, doloremque.
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/5">
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="text-sm">
            {visibleNavLinks.map((navLink) => (
              <li className="mb-2">
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
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/5">
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <p className="text-sm text-gray-400 mb-2">
            123 Street Name, City, Country
          </p>
          <p className="text-sm text-gray-400 mb-2">contact@example.com</p>
          <p className="text-sm text-gray-400 mb-2">9999999999</p>
        </div>
        <div className="w-full md:w-1/5">
          <p className="text-sm text-gray-400 mb-4">
            &copy; 2024 [company name]. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
