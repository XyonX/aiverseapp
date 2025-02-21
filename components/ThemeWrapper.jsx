"use client";
import { useState, useEffect } from "react";

const ThemeWrapper = ({ children }) => {
  const [themeSettings, setThemeSettings] = useState({
    isDark: false,
    themeColor: "violet",
    isRtl: false,
  });

  // Initialize theme from localStorage
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("themeSettings"));
    if (savedSettings) {
      setThemeSettings(savedSettings);
      document.documentElement.classList.toggle("dark", savedSettings.isDark);
      document.documentElement.dir = savedSettings.isRtl ? "rtl" : "ltr";
    }
  }, []);

  // Save settings to localStorage and apply changes
  useEffect(() => {
    localStorage.setItem("themeSettings", JSON.stringify(themeSettings));
    document.documentElement.classList.toggle("dark", themeSettings.isDark);
    document.documentElement.dir = themeSettings.isRtl ? "rtl" : "ltr";
  }, [themeSettings]);

  const toggleDarkMode = () => {
    setThemeSettings((prev) => ({ ...prev, isDark: !prev.isDark }));
  };

  return children({
    themeSettings,
    toggleDarkMode,
    setThemeColor: (color) =>
      setThemeSettings((prev) => ({ ...prev, themeColor: color })),
    toggleRtl: () =>
      setThemeSettings((prev) => ({ ...prev, isRtl: !prev.isRtl })),
  });
};

// Updated SidebarMenu component
const SidebarMenu = ({ themeSettings, toggleDarkMode }) => {
  return (
    <div className="sidebar-menu w-full lg:w-[75px] shadow lg:flex lg:flex-col flex flex-row justify-between items-center fixed lg:relative z-40 bottom-0 bg-white dark:bg-zinc-600">
      {/* ... other sidebar content ... */}

      <div className="w-20 my-5 lg:w-auto">
        <ul className="lg:block">
          <li className="hidden text-center light-dark-mode nav-item lg:block">
            <a
              href="#"
              className={`hidden dark:block dark:text-${themeSettings.themeColor}-100/80`}
              onClick={(e) => {
                e.preventDefault();
                toggleDarkMode();
              }}
            >
              <i className="text-2xl ri-sun-line"></i>
            </a>
            <a
              href="#"
              className={`block text-gray-500 dark:hidden`}
              onClick={(e) => {
                e.preventDefault();
                toggleDarkMode();
              }}
            >
              <i className="text-2xl ri-moon-clear-line"></i>
            </a>
          </li>
          {/* ... rest of the sidebar ... */}
        </ul>
      </div>
    </div>
  );
};

// Updated StyleSwitcher component
const StyleSwitcher = ({ themeSettings, setThemeColor, toggleRtl }) => {
  const [isSwitcherVisible, setIsSwitcherVisible] = useState(false);

  return (
    <div className="group" data-theme-color={themeSettings.themeColor}>
      {/* Switcher panel */}
      <div
        className={`fixed transition-all duration-300 ease-linear top-[50%] switcher z-50 ${
          isSwitcherVisible ? "visible" : "invisible"
        }`}
      >
        <div className="w-48 p-4 bg-white shadow-md dark:bg-zinc-700">
          {/* Theme color picker */}
          <div>
            <h3 className="mb-2 font-medium text-gray-900 text-14 dark:text-gray-100">
              Select your color
            </h3>
            <ul className="flex gap-3">
              {["violet", "green", "red"].map((color) => (
                <li key={color}>
                  <a
                    href="#"
                    className={`h-10 w-10 bg-${color}-500 block rounded-full ${
                      themeSettings.themeColor === color
                        ? "ring-2 ring-offset-2"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setThemeColor(color);
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* RTL/LTR Toggle */}
          <div className="mt-5 mb-2">
            <h3 className="mb-3 font-medium text-gray-900 text-14 dark:text-gray-100">
              RTL / LTR
            </h3>
            <button
              className="z-50 px-3 py-3 my-2 font-medium text-white transition-all duration-300 ease-linear bg-${themeSettings.themeColor}-500 hover:bg-${themeSettings.themeColor}-700 text-14 rounded"
              onClick={(e) => {
                e.preventDefault();
                toggleRtl();
              }}
            >
              {themeSettings.isRtl ? "LTR" : "RTL"}
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setIsSwitcherVisible(!isSwitcherVisible);
        }}
        className="fixed z-50 flex-col gap-3 px-4 py-3 ltr:right-0 rtl:left-0 font-normal text-white bg-${themeSettings.themeColor}-500 top-[44%] text-14 ltr:rounded-l rtl:rounded-r hidden lg:block"
      >
        <i className="text-xl mdi mdi-cog mdi-spin"></i>
      </a>
    </div>
  );
};

// Usage in your layout.js
const Layout = ({ children }) => {
  return (
    <ThemeWrapper>
      {({ themeSettings, toggleDarkMode, setThemeColor, toggleRtl }) => (
        <div className="dark:bg-zinc-800 min-h-screen">
          <SidebarMenu
            themeSettings={themeSettings}
            toggleDarkMode={toggleDarkMode}
          />
          <StyleSwitcher
            themeSettings={themeSettings}
            setThemeColor={setThemeColor}
            toggleRtl={toggleRtl}
          />
          {children}
        </div>
      )}
    </ThemeWrapper>
  );
};
