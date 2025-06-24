import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import "../assests/css/style.css";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logoutUser } = useContext(AuthContext);

  const userData = JSON.parse(localStorage.getItem('user'));
  const isAdmin = userData?.role === 'admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logoutUser();
      console.log("Logout successfully");
    } catch (error) {
      console.log(`Error in logout: ${error}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let navdata = [
    { title: "Home", path: "/home" },
    { title: "Insurance Selection", path: "/insurance-selection" },
    { title: "My Bookings", path: "/insurance-booking" },
    { title: "Payment", path: "/payment" },
  ];

  if(isAdmin){
    navdata = [
      { title: "Home", path: "/home" },
      { title: "Insurance Plans", path: "/insurance-selection" },
      { title: "User Bookings", path: "/insurance-booking" },
    ];
  }

  return (
    <div className="w-full h-[4rem] flex items-center justify-between bg-gradient-to-br from-blue-600 to-blue-500 shadow-md px-4 z-50 relative">
      {/* Left Section - Logo and Name */}
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <div className="font-bold text-3xl text-white ml-2">SmartInsure</div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="flex list-none flex-row items-center gap-6">
          {navdata.map((data, index) => (
            <NavLink
              key={index}
              to={data.path}
              className={({ isActive }) =>
                `p-2 font-semibold text-xl ${
                  isActive ? "text-white" : "text-gray-200 hover:text-white"
                }`
              }
            >
              <li>{data.title}</li>
            </NavLink>
          ))}
        </ul>
        <button
  className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition
              md:ml-6 ml-2  // Different margins for mobile and larger screens
              sm:py-2 sm:px-4 // Standard padding for small screens and up
              xs:py-1 xs:px-3 // Smaller padding for extra small screens
              text-sm sm:text-base // Adjust font size based on screen
              w-full sm:w-auto // Full width on mobile, auto width on larger screens"
  onClick={handleSubmit}
>
  Log out
</button>
        {/* <button
          className="ml-6 bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition"
          onClick={handleSubmit}
        >
          Log out
        </button> */}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          {isMenuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 right-2 w-3/4 bg-white rounded-lg shadow-md z-10 p-4">
          <ul className="flex flex-col items-center gap-4">
            {navdata.map((data, index) => (
              <NavLink
                key={index}
                to={data.path}
                className="font-semibold text-blue-700 hover:opacity-75 text-lg"
              >
                <li>{data.title}</li>
              </NavLink>
            ))}
          </ul>
          <button
            className="w-full mt-4 bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition"
            onClick={handleSubmit}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
