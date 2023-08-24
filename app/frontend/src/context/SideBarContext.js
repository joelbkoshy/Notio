import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [sidebarItem, setSidebarItem] = useState('home');

  return (
    <SidebarContext.Provider value={{ sidebarItem, setSidebarItem }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
