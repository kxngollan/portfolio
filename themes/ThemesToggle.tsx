"use client";

import { useTheme } from "@/themes/ThemeProvider";
import { FaMoon } from "react-icons/fa";
import { MdDevicesOther, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const { display, toggle } = useTheme();

  const handleClick = () => {
    console.log("Toggle clicked, current display:", display);
    toggle();
  };

  return (
    <button
      onClick={handleClick}
      title={
        display === "light"
          ? "Switch to dark"
          : display === "dark"
            ? "Switch to device"
            : "Switch to light"
      }
      className="px-3 py-2 dark:px-3 dark:py-2 rounded-md dark:rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 fixed bottom-5 right-5 z-50 opacity-50 dark:opacity-50 hover:opacity-100 dark:hover:opacity-100 text-gray-700 dark:text-white transition-all dark:transition-all duration-200 dark:duration-200"
    >
      {display === "dark" ? (
        <FaMoon />
      ) : display === "device" ? (
        <MdDevicesOther />
      ) : (
        <MdLightMode />
      )}
    </button>
  );
};

export default ThemeToggle;
