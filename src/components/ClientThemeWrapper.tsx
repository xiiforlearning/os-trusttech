"use client";

import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";

// This is a client component wrapper for ThemeProvider
// It allows server components to use ThemeProvider functionality
export default function ClientThemeWrapper({ children }: { children: ReactNode }) {
  // Check for stored theme preference and apply it
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("theme");
      
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else if (storedTheme === "light") {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);
  
  return <ThemeProvider>{children}</ThemeProvider>;
} 