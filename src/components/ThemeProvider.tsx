"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light";

interface ThemeCtx {
  theme: Theme;
}

const ThemeContext = createContext<ThemeCtx>({ theme: "light" });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Locked to single light mode — site theme is fixed.
  const [theme] = useState<Theme>("light");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
  }, []);

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
