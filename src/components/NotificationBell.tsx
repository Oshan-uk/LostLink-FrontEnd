import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Package,
  LoaderCircle,
  X,
  ArrowUpRight,
} from "lucide-react";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  type Notification,
} from "../services/notification.service";

function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      const data = await getNotifications();

      setNotifications(data);
      setUnreadCount(
        data.filter((notification) => !notification.isRead).length,
      );
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch and automatic refresh
  useEffect(() => {
    void fetchNotifications();

    const interval = window.setInterval(() => {
      void fetchNotifications();
    }, 30000);

    return () => window.clearInterval(interval);
  }, [fetchNotifications]);

  // Mark one notification as read
  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);

      setNotifications((previous) =>
        previous.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification,
        ),
      );

      setUnreadCount((previous) => Math.max(0, previous - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;

    try {
      setIsUpdating(true);

      await markAllNotificationsAsRead();

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );

      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete notification
  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);

      setNotifications((previous) =>
        previous.filter((notification) => notification._id !== id),
      );

      const deletedNotification = notifications.find(
        (notification) => notification._id === id,
      );

      if (deletedNotification && !deletedNotification.isRead) {
        setUnreadCount((previous) => Math.max(0, previous - 1));
      }
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  // Open matching report
  const handleOpenNotification = async (notification: Notification) => {
    if (!notification.isRead) {
      await handleMarkAsRead(notification._id);
    }

    setIsOpen(false);

    const matchedItemId = notification.item?._id;

    if (matchedItemId) {
      navigate(`/items/${matchedItemId}`);
    }
  };

  const formatDate = (date: string) => {
    const notificationDate = new Date(date);

    return notificationDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="sk-btn sk-btn-steel relative flex h-11 w-11 items-center justify-center rounded-xl"
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-extrabold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div className="sk-metal absolute right-0 top-14 z-50 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-300/40 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-400/30 px-4 py-4">
              <div>
                <h3 className="sk-emboss text-base font-extrabold">
                  Notifications
                </h3>

                <p className="sk-emboss-soft mt-1 text-xs font-semibold">
                  {unreadCount} unread notifications
                </p>
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllAsRead}
                    disabled={isUpdating}
                    title="Mark all as read"
                    className="sk-btn flex h-9 w-9 items-center justify-center rounded-lg"
                  >
                    {isUpdating ? (
                      <LoaderCircle size={16} className="animate-spin" />
                    ) : (
                      <CheckCheck size={17} />
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="sk-btn flex h-9 w-9 items-center justify-center rounded-lg"
                  aria-label="Close"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="max-h-100 overflow-y-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <LoaderCircle
                    size={28}
                    className="animate-spin text-cyan-600"
                  />

                  <p className="sk-emboss-soft mt-3 text-sm">
                    Loading notifications...
                  </p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="sk-well flex h-16 w-16 items-center justify-center rounded-2xl">
                    <Bell size={28} className="sk-emboss-soft" />
                  </div>

                  <h4 className="sk-emboss mt-4 font-bold">
                    No notifications yet
                  </h4>

                  <p className="sk-emboss-soft mt-2 text-xs">
                    We'll notify you when a potential item match is found.
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`border-b border-slate-400/20 p-4 transition-colors ${
                      notification.isRead ? "" : "bg-cyan-500/5"
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className="sk-well flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                        <Package size={19} className="text-cyan-700" />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="sk-emboss text-sm font-extrabold">
                            {notification.title}
                          </h4>

                          {!notification.isRead && (
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                          )}
                        </div>

                        <p className="sk-emboss-soft mt-1 text-xs leading-relaxed">
                          {notification.message}
                        </p>

                        <p className="sk-emboss-soft mt-2 text-[10px] font-semibold">
                          {formatDate(notification.createdAt)}
                        </p>

                        {/* Actions */}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              void handleOpenNotification(notification)
                            }
                            className="sk-btn sk-btn-steel flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold"
                          >
                            View Match
                            <ArrowUpRight size={13} />
                          </button>

                          {!notification.isRead && (
                            <button
                              type="button"
                              onClick={() =>
                                void handleMarkAsRead(notification._id)
                              }
                              title="Mark as read"
                              className="sk-btn flex h-8 w-8 items-center justify-center rounded-lg"
                            >
                              <Check size={15} />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => void handleDelete(notification._id)}
                            title="Delete notification"
                            className="sk-btn flex h-8 w-8 items-center justify-center rounded-lg text-red-500"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="border-t border-slate-400/30 px-4 py-3 text-center">
                <p className="sk-emboss-soft text-[10px] font-bold tracking-wider">
                  LOSTLINK • RECONNECT WHAT MATTERS
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationBell;
