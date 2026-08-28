import {
  createContext,
  useContext,
  useState,
} from "react";

const NotificationContext = createContext(null);

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (
    message,
    type = "info"
  ) => {
    const notification = {
      id: Date.now(),
      message,
      type,
    };

    setNotifications((previous) => [
      ...previous,
      notification,
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((previous) =>
      previous.filter(
        (notification) =>
          notification.id !== id
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(
    NotificationContext
  );

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider"
    );
  }

  return context;
}

export default NotificationContext;
export { NotificationProvider };