"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  locale: "en" | "es";
}

export function SearchInput({ value, onChange, onClear, placeholder, locale }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Detect if client is macOS for keyboard shortcut display
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
      }
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus shortcuts: '/' or 'Ctrl + K' / 'Cmd + K'
      const isKCombo = (e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey);
      const isSlash = e.key === "/" && document.activeElement !== inputRef.current;

      if (isKCombo || isSlash) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      // Clear/blur shortcut: 'Esc'
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        e.preventDefault();
        onClear();
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClear]);

  return (
    <div className="relative w-full" role="search">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-500 transition-colors duration-300 group-focus-within:text-primary" />
      </div>

      <input
        ref={inputRef}
        type="text"
        id="search-input"
        aria-label={locale === "en" ? "Search portfolio items" : "Buscar en el portafolio"}
        aria-controls="search-results"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-950/40 backdrop-blur-md border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all duration-300 rounded-xl pl-12 pr-20 py-3 text-gray-200 placeholder-gray-500 font-sans shadow-[0_0_15px_rgba(21,209,217,0.03)]"
      />

      <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
        {value && (
          <button
            type="button"
            onClick={() => {
              onClear();
              inputRef.current?.focus();
            }}
            aria-label={locale === "en" ? "Clear search" : "Limpiar búsqueda"}
            className="p-1 rounded-md text-gray-400 hover:text-primary hover:bg-white/5 transition-all duration-150"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-gray-500">
          <span>{isMac ? "⌘" : "Ctrl"}</span>K
        </kbd>
      </div>
    </div>
  );
}
