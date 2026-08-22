"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "cmg-theme";

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const current = document.documentElement.dataset.theme;
    const next = saved === "light" || saved === "dark"
      ? saved
      : current === "light" || current === "dark"
        ? current
        : "dark";
    if (current !== next) document.documentElement.dataset.theme = next;
    const frame = window.requestAnimationFrame(() => setTheme(next));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.dataset.theme = next;
  };

  const isLight = theme === "light";
  return (
    <button
      type="button"
      className={cn("cmg-theme-toggle", className)}
      onClick={toggle}
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      aria-pressed={isLight}
    >
      {isLight ? <Moon aria-hidden /> : <Sun aria-hidden />}
      <span>{isLight ? "Dark" : "Light"}</span>
    </button>
  );
}
