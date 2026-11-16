import api from "../lib/api";

export interface NotificationItem {
  _id: string;
  name: string;
  type: "lost" | "found";
  imageUrl?: string;
}

export interface Notification {
  _id: string;
  recipient: string;
  item: NotificationItem | null;
  matchedItem: NotificationItem | null;
  title: string;
  message: string;
  type: "potential_match";
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotificationsResponse {
  success: boolean;
  totalNotifications: number;
  notifications: Notification[];
}

interface UnreadCountResponse {
  success: boolean;
  unreadCount: number;
}

// Get all notifications
export const getNotifications = async (): Promise<Notification[]> => {
  const response = await api.get<NotificationsResponse>("/notifications");

  return response.data.notifications;
};

// Get unread notification count
export const getUnreadCount = async (): Promise<number> => {
  const response = await api.get<UnreadCountResponse>(
    "/notifications/unread-count",
  );

  return response.data.unreadCount;
};

// Mark one notification as read
export const markNotificationAsRead = async (
  id: string,
): Promise<void> => {
  await api.patch(`/notifications/${id}/read`);
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (): Promise<void> => {
  await api.patch("/notifications/read-all");
};

// Delete notification
export const deleteNotification = async (
  id: string,
): Promise<void> => {
  await api.delete(`/notifications/${id}`);
};