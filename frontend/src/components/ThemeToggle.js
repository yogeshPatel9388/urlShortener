import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative flex items-center w-14 h-8 p-1 bg-brand-100 dark:bg-slate-700 rounded-full transition-colors duration-300 focus:outline-none shadow-inner"
    >
      {/* Slider Circle */}
      <div
        className={`
        flex items-center justify-center w-6 h-6 bg-white dark:bg-brand-500 rounded-full shadow-md transform transition-transform duration-300
        ${isDark ? "translate-x-6" : "translate-x-0"}
      `}
      >
        {isDark ? (
          <Moon size={14} className="text-white" fill="currentColor" />
        ) : (
          <Sun size={14} className="text-brand-500" fill="currentColor" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
