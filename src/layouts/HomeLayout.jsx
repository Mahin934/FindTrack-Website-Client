import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const HomeLayout = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className={`md:container mx-auto ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className="mt-10 md:mt-24">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default HomeLayout;
