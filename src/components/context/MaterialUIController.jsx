import React, { createContext, useContext, useState } from "react";

// Create the context
const MaterialUIControllerContext = createContext();

// Create the provider
export const MaterialUIControllerProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [miniSidenav, setMiniSidenav] = useState(false);
  const [openConfigurator, setOpenConfigurator] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const value = {
    darkMode,
    toggleDarkMode,
    miniSidenav,
    setMiniSidenav,
    openConfigurator,
    setOpenConfigurator,
  };

  return (
    <MaterialUIControllerContext.Provider value={value}>
      {children}
    </MaterialUIControllerContext.Provider>
  );
};

// Create the hook
export const useMaterialUIController = () => {
  const context = useContext(MaterialUIControllerContext);
  if (!context) {
    throw new Error(
      "useMaterialUIController must be used within a MaterialUIControllerProvider"
    );
  }
  return context;
};