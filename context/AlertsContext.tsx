import React, { createContext, useContext, useState } from "react";

const AlertsContext = createContext<{ unreadCount: number; setUnreadCount: (n: number) => void }>({
  unreadCount: 0,
  setUnreadCount: () => {},
});

export const AlertsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  return (
    <AlertsContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => useContext(AlertsContext);