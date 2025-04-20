"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Use an initialized state to avoid hydration mismatches
  // Default to light mode during SSR
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // This effect runs only on the client after hydration
  useEffect(() => {
    setMounted(true);
    
    // Check if user has a theme preference in localStorage
    const storedTheme = localStorage.getItem("theme");
    
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (storedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      // If no stored preference, default to light theme
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      // Store the default preference
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      
      // Update localStorage
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      
      // Toggle class on html element
      if (newTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      return newTheme;
    });
  };

  // To avoid hydration mismatch, we need to ensure the component renders the same on server and client
  // During the first client render (before useEffect runs), we want to match server rendering
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {/* Spread the children as-is, without modifications during initial render */}
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
} 