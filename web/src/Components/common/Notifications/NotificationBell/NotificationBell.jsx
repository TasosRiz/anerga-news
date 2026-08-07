import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// CSS
import "./NotificationBell.css";

// Sections
import NotificationsList from "../List/NotificationsList";

// Hook
import { useUserNotifications } from "../hooks/useUserNotifications";

// Bell ειδοποιήσεων για τον συνδεδεμένο χρήστη.
//
// Αναλαμβάνει:
// - τη φόρτωση των ειδοποιήσεων
// - τη φόρτωση του unread count
// - το άνοιγμα και κλείσιμο του dropdown
// - το mark μιας ειδοποίησης ως read
// - το mark όλων των ειδοποιήσεων ως read
// - την πλοήγηση ανάλογα με το source_type
//
// Χρησιμοποιεί το κοινό NotificationsList
// για την εμφάνιση των τελευταίων ειδοποιήσεων.

const NotificationBell = ({ token }) => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleToggle = () => {
        setOpen((previousOpen) => !previousOpen);
    };

    const {
        notifications,
        unreadCount,
        loading,
        markOneAsRead,
        markAllAsRead,
    } = useUserNotifications(token);

    const handleNotificationClick = async (notification) => {
        try {
            // Αν είναι unread,
            // το hook αναλαμβάνει το mark as read
            // και το refresh των δεδομένων.
            await markOneAsRead(notification);

            setOpen(false);

            // Notification που αφορά report.
            if (notification.source_type === "report") {
                navigate("/profile/reports");
                return;
            }

            // Notification που αφορά post.
            if (
                notification.source_type === "post" &&
                notification.source_id
            ) {
                navigate(
                    `/posts/${notification.source_id}`
                );
            }
        } catch (error) {
            console.error(
                "Notification click error:",
                error
            );
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllAsRead();
        } catch (error) {
            console.error(
                "Mark all notifications error:",
                error
            );
        }
    };
    return (
        <div className="notification-bell">
            <button
                type="button"
                className="notification-bell-button"
                onClick={handleToggle}
            >
                🔔

                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="notification-dropdown">
                    <div className="notification-dropdown-header">
                        <strong>Ειδοποιήσεις</strong>

                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={handleMarkAllAsRead}
                            >
                                Όλες ως διαβασμένες
                            </button>
                        )}
                    </div>

                    <div className="notification-dropdown-body">
                        {loading ? (
                            <div className="notification-empty">
                                Φόρτωση...
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="notification-empty">
                                Δεν υπάρχουν ειδοποιήσεις.
                            </div>
                        ) : (
                            <NotificationsList
                                notifications={notifications}
                                limit={5}
                                compact
                                onNotificationClick={handleNotificationClick}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;