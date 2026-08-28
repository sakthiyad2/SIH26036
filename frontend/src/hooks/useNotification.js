import {
  useNotification as useNotificationContext,
} from "../context/NotificationContext";

function useNotification() {
  return useNotificationContext();
}

export default useNotification;