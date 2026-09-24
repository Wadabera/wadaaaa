import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Dark is the default brand experience. Persist explicit user choice.
  const [isDark, setIsDark] = useState(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved) return saved === "dark";
    return true; // default dark
  });

  useEffect(() => {
    // Theme is scoped to <body> (class "light") so it never collides with
    // AccessibilityProvider, which writes className on <html>.
    const body = document.body;
    if (isDark) {
      body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme, theme: isDark ? "dark" : "light" }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
