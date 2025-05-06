// components/ThemeToggle.tsx
"use client";

import { MoonIcon, SunIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const themes = ["light", "dark", "cupcake"];
    const newTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <MoonIcon className="h-5 w-5" />
      ) : theme === "cupcake" ? (
        <SparklesIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  );
}