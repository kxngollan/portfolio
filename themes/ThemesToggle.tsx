"use client";

import { useTheme } from "@/themes/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdDevicesOther } from "react-icons/md";

const ThemeToggle = () => {
  const { display, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      title={
        display === "light"
          ? "Switch to dark"
          : display === "dark"
            ? "Follow device"
            : "Switch to light"
      }
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-10 h-10 rounded-full border border-black/10 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 opacity-50 hover:opacity-100 hover:border-[#ffa351]/40 hover:text-[#ffa351] transition-all duration-200"
    >
      {display === "dark" ? (
        <FaMoon className="text-sm" />
      ) : display === "device" ? (
        <MdDevicesOther className="text-sm" />
      ) : (
        <FaSun className="text-sm" />
      )}
    </button>
  );
};

export default ThemeToggle;
