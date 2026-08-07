import "./ViewNotification.css";

import { formatDate } from "../../../../../../common/components/Utils/formatDate";

//   Προβάλλει τα πλήρη στοιχεία της επιλεγμένης ειδοποίησης.

//   Χρησιμοποιείται μέσα στο SidePanel
//   για την προβολή ειδοποίησης από το admin panel.

// Εμφανίζει:
// - id και τίτλο
// - τύπο ειδοποίησης
// - αριθμό παραληπτών
// - αριθμό χρηστών που την έχουν διαβάσει
// - κατάσταση
// - ημερομηνία δημιουργίας
// - πλήρες μήνυμα
const ViewNotification = ({ notification }) => {
    if (!notification) {
        return (
            <div className="view-notification-empty">
                Δεν έχει επιλεγεί ειδοποίηση.
            </div>
        );
    }

    const isActive = notification.status === "active";

    const notificationDate = notification.created_at || null;

    return (
        <div className="view-notification">
            <div className="view-notification-card">
                <div className="notification-detail-row">
                    <span>ID</span>

                    <strong>
                        #{String(notification.id).padStart(4, "0")}
                    </strong>
                </div>

                <div className="notification-detail-row">
                    <span>Τίτλος</span>

                    <strong>
                        {notification.title || "Χωρίς τίτλο"}
                    </strong>
                </div>

                <div className="notification-detail-row">
                    <span>Τύπος</span>

                    <strong
                        className={`notification-type ${notification.type}`}
                    >
                        {notification.type || "info"}
                    </strong>
                </div>

                <div className="notification-detail-row">
                    <span>Παραλήπτες</span>

                    <strong>
                        {notification.users?.length || 0} χρήστες
                    </strong>
                </div>

                <div className="notification-detail-row">
                    <span>Κατάσταση</span>

                    <strong
                        className={`notification-status-pill ${isActive ? "active" : "inactive"
                            }`}
                    >
                        {isActive ? "Ενεργή" : "Ανενεργή"}
                    </strong>
                </div>

                <div className="notification-detail-row">
                    <span>Ημερομηνία</span>

                    {notificationDate ? (
                        <time dateTime={notificationDate}>
                            {formatDate(notificationDate)}
                        </time>
                    ) : (
                        <strong>Δεν υπάρχει ημερομηνία</strong>
                    )}
                </div>

                <div className="notification-detail-row">
                    <span>Ανάγνωση</span>

                    <strong>
                        {
                            (notification.users || []).filter(
                                (user) => user.pivot?.read_at
                            ).length
                        }
                        {" / "}
                        {notification.users?.length || 0}
                    </strong>
                </div>
            </div>

            <div className="notification-detail-body">
                <span>Μήνυμα</span>

                <p>
                    {notification.message ||
                        "Δεν υπάρχει περιεχόμενο."}
                </p>
            </div>
        </div>


    );
};

export default ViewNotification;