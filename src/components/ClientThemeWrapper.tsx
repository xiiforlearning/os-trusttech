"use client";

import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";

// This is a client component wrapper for ThemeProvider
// It allows server components to use ThemeProvider functionality
export default function ClientThemeWrapper({ children }: { children: ReactNode }) {
  // Ensure light theme is applied immediately
  useEffect(() => {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }, []);
  
  return <ThemeProvider>{children}</ThemeProvider>;
} 