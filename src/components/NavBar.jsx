import { Link, NavLink, useLocation } from "react-router-dom";
import "animate.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2"; // Import SweetAlert2 for enhanced logout alert
import { FaMoon, FaSun } from "react-icons/fa";

const NavBar = ({ darkMode, setDarkMode }) => {
    const { user, logOut } = useContext(AuthContext); // Using context for user and logout
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation(); // Get the current location

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                // SweetAlert success message
                Swal.fire({
                    icon: "success",
                    title: "Logged Out",
                    text: "You have successfully logged out!",
                    timer: 2000,
                    showConfirmButton: false,
                });
            })
            .catch((error) => {
                // SweetAlert error message
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `Logout failed: ${error.message}`,
                });
            });
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    onClick={closeDropdown}
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold rounded-full shadow-md bg-gradient-to-r from-blue-300 via-sky-500 to-indigo-500 hover:from-blue-400 hover:via-sky-600 hover:to-indigo-600 transition px-4 py-2"
                            : "hover:bg-gray-200 px-4 py-2 rounded-full transition"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allLostFound"
                    onClick={closeDropdown}
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold rounded-full shadow-md bg-gradient-to-r from-blue-300 via-sky-500 to-indigo-500 hover:from-blue-400 hover:via-sky-600 hover:to-indigo-600 transition px-4 py-2"
                            : "hover:bg-gray-200 px-4 py-2 rounded-full transition"
                    }
                >
                    All Lost & Found Listings
                </NavLink>
            </li>

            {/* Show these links only if the user is logged in */}
            {user && user?.email && (
                <>
                    <li>
                        <NavLink
                            to="/addLost-found"
                            onClick={closeDropdown}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white font-semibold rounded-full shadow-md bg-gradient-to-r from-blue-300 via-sky-500 to-indigo-500 hover:from-blue-400 hover:via-sky-600 hover:to-indigo-600 transition px-4 py-2"
                                    : "hover:bg-gray-200 px-4 py-2 rounded-full transition"
                            }
                        >
                            Add Lost & Found Item
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/myPosts"
                            onClick={closeDropdown}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white font-semibold rounded-full shadow-md bg-gradient-to-r from-blue-300 via-sky-500 to-indigo-500 hover:from-blue-400 hover:via-sky-600 hover:to-indigo-600 transition px-4 py-2"
                                    : "hover:bg-gray-200 px-4 py-2 rounded-full transition"
                            }
                        >
                            My Posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/allRecovered"
                            onClick={closeDropdown}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white font-semibold rounded-full shadow-md bg-gradient-to-r from-blue-300 via-sky-500 to-indigo-500 hover:from-blue-400 hover:via-sky-600 hover:to-indigo-600 transition px-4 py-2"
                                    : "hover:bg-gray-200 px-4 py-2 rounded-full transition"
                            }
                        >
                            All Recovered Items
                        </NavLink>
                    </li>
                </>
            )}

            <li>
                <NavLink
                    to="/aboutUS"
                    onClick={closeDropdown}
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold rounded-full shadow-md bg-gradient-to-r from-blue-300 via-sky-500 to-indigo-500 hover:from-blue-400 hover:via-sky-600 hover:to-indigo-600 transition px-4 py-2"
                            : "hover:bg-gray-200 px-4 py-2 rounded-full transition"
                    }
                >
                    AboutUs
                </NavLink>
            </li>
        </>
    );


    // Update the document title dynamically based on route
    useEffect(() => {
        const routeTitle = () => {
            switch (location.pathname) {
                case "/":
                    return "Home - FindTrack";
                case "/allLostFound":
                    return "All Lost & Found Listings - FindTrack";
                case "/addLost-found":
                    return "Add Lost & Found Item - FindTrack";
                case "/myPosts":
                    return "My Posts - FindTrack";
                case "/allRecovered":
                    return "All Recovered Items - FindTrack";
                case "/aboutUS":
                    return "AboutUS - FindTrack";
                default:
                    return "FindTrack";
            }
        };

        document.title = routeTitle(); // Update document title based on current route
    }, [location]); // Run effect whenever location changes

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 shadow-lg">
            <div className="navbar p-0 md:py-2 md:container mx-auto">
                {/* Navbar start */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                            onClick={toggleDropdown}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        {dropdownOpen && (
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            >
                                {links}
                            </ul>
                        )}
                    </div>
                    {/* Added "FundFusion" section */}
                    <a
                        className="btn border-none text-white font-semibold md:text-2xl bg-gradient-to-r from-blue-300 via-sky-500 to-indigo-500 animate__hinge"
                    >
                        <img src="https://i.ibb.co.com/cS7fWW7b/Screenshot-2025-01-31-141801.png" alt="" className="w-10 rounded-lg" />
                        FindTrack
                    </a>
                </div>

                {/* Navbar center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal space-x-3 px-1">{links}</ul>
                </div>
                <div>
                    <nav className="flex justify-between items-center ">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            {darkMode ? (
                                <FaSun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <FaMoon className="w-5 h-5 text-gray-800" />
                            )}
                        </button>
                    </nav>

                </div>

                {/* Navbar end */}
                <div className="navbar-end">
                    {user && user?.email ? (
                        <div className="flex justify-center gap-1 md:gap-3 items-center">
                            <div className="relative group">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={user.photoURL || "/default-avatar.png"}
                                    alt="User Avatar"
                                />
                                <div
                                    className="absolute top-12 left-1/2 transform -translate-x-1/2 w-max bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    {user.displayName}
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="btn btn-primary rounded-full"
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className="join animate__heartBeat">
                            <Link
                                to="/register"
                                className="btn join-item rounded-l-full btn-primary"
                            >
                                Sign Up
                            </Link>
                            <Link
                                to="/login"
                                className="btn join-item border rounded-r-full border-gray-300 text-gray-700"
                            >
                                Log in
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;