import React, { createContext, useState, useEffect, useRef } from "react";

// Create context
export const NotificationContext = createContext();

// Provider
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const intervalRef = useRef(null);

  // Function to add new notification
  const addNotification = (message) => {
    setNotifications(prev => [
      ...prev,
      { id: Date.now(), message, read: false }
    ]);
  };

  // Function to mark all as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  // Function to stop notifications
  const stopNotifications = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Simulate real-time notifications every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      addNotification("You have a new message!");
    }, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAllAsRead,
      stopNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
