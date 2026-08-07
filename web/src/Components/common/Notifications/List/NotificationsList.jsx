import { formatDate } from "../../components/Utils/formatDate";
import "./NotificationsList.css";

// Κοινή λίστα ειδοποιήσεων.
//
// Αναλαμβάνει:
// - την εμφάνιση των notifications
// - την εμφάνιση read / unread κατάστασης
// - την προαιρετική εμφάνιση περιορισμένου αριθμού notifications
// - την εμφάνιση τύπου και ημερομηνίας
// - την εκτέλεση callback όταν επιλέγεται ειδοποίηση
const NotificationsList = ({
    notifications = [],
    limit = null,
    compact = false,
    onNotificationClick,
}) => {
    const visibleNotifications = limit
        ? notifications.slice(0, limit)
        : notifications;


    return (
        <section
            className={`notifications-list ${compact ? "compact" : ""
                }`}
        >
            {visibleNotifications.map((notification) => {
                const unread = !notification.pivot?.read_at;
                const type = notification.type || "info";

                return (
                    <button
                        key={notification.id}
                        type="button"
                        className={`notification-card ${unread ? "unread" : ""
                            }`}
                        onClick={() =>
                            onNotificationClick?.(notification)
                        }
                    >
                        <div className="notification-content">
                            <h3>{notification.title}</h3>

                            <p>{notification.message}</p>

                            <div className="notification-meta">
                                <span
                                    className={`notification-type ${type}`}
                                >
                                    {type}
                                </span>

                                <span className="notification-date">
                                    {notification.created_at
                                        ? formatDate(notification.created_at)
                                        : "-"}
                                </span>
                            </div>
                        </div>
                    </button>
                );
            })}
        </section>
    );
};

export default NotificationsList;