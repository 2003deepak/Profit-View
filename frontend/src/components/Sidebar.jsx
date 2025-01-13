import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faSignOutAlt,
  faBars,
  faMoon,
  faSun,
  faChartLine,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import themeStore from "../store/themeStore"; // Import themeStore
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme, changeTheme } = themeStore((state) => state); // Use themeStore
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/logout",
        {},
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div
      className={`flex ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } h-screen p-4 flex flex-col justify-between transition-all duration-300 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-200 text-gray-900"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1
            className={`text-xl font-bold ${
              isSidebarOpen ? "block" : "hidden"
            } transition-all`}
          >
            ProfitView
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-xl transition-all hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        {/* Navigation */}
        <ul className="space-y-4">
          {[
            { to: "/user/dashboard", label: "Dashboard", icon: faHome },
            { to: "/portfolio", label: "Portfolio", icon: faChartLine },
            { to: "/markets", label: "Markets", icon: faMoneyBillTrendUp },
            { to: "/profile", label: "Profile", icon: faUser },
            { to: "/settings", label: "Settings", icon: faCog },
          ].map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.to}
                className={`flex items-center space-x-4 p-3 rounded-lg transition-all ${
                  theme === "dark"
                    ? "hover:bg-gray-700"
                    : "hover:bg-blue-300 hover:text-gray-800"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom Section */}
        <div className="space-y-4 mt-auto">
          {/* Dark Mode Toggle */}
          <button
            onClick={changeTheme}
            className={`flex items-center space-x-4 p-3 rounded-lg transition-all ${
              theme === "dark"
                ? "hover:bg-gray-700"
                : "hover:bg-blue-300 hover:text-gray-800"
            }`}
          >
            <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} className="text-lg" />
            {isSidebarOpen && (
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-red-500 hover:text-white transition-all"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Sidebar;
