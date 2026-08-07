import DataTable from "../../../../../common/components/DataTable/DataTable";
import { formatDate } from "../../../../../common/components/Utils/formatDate";

// Icons
import {
    FaEye,
    FaPen,
    FaTrash,
} from "react-icons/fa";

// Πίνακας διαχείρισης ειδοποιήσεων του admin.
//
// Εμφανίζει:
// - βασικά στοιχεία της ειδοποίησης
// - τύπο και κατάσταση
// - αριθμό παραληπτών
// - πόσοι χρήστες την έχουν διαβάσει
// - ημερομηνία δημιουργίας
// - actions για προβολή, επεξεργασία και διαγραφή
//
// Χρησιμοποιεί το κοινό DataTable component.

const NotificationsTable = ({
    notifications = [],
    onView,
    onEdit,
    onDelete,
}) => {
    const columns = [
        {
            key: "id",
            label: "ID",
            width: "80px",
            render: (notification) => (
                <span className="table-id">
                    #{String(notification.id).padStart(4, "0")}
                </span>
            ),
        },

        {
            key: "title",
            label: "Τίτλος",
            render: (notification) => (
                <span className="table-title">
                    {notification.title || "Χωρίς τίτλο"}
                </span>
            ),
        },

        {
            key: "type",
            label: "Τύπος",
            render: (notification) => (
                <span
                    className={`notification-type ${notification.type || "info"
                        }`}
                >
                    {notification.type || "info"}
                </span>
            ),
        },

        {
            key: "recipients",
            label: "Παραλήπτες",
            render: (notification) => (
                <span>
                    {notification.users?.length || 0} χρήστες
                </span>
            ),
        },

        {
            key: "status",
            label: "Κατάσταση",
            width: "130px",
            render: (notification) => (
                <span
                    className={`table-status ${notification.status}`}
                >
                    {notification.status === "active"
                        ? "Active"
                        : "Inactive"}
                </span>
            ),
        },

        {
            key: "read",
            label: "Ανάγνωση",
            width: "150px",
            render: (notification) => {
                const users = notification.users || [];

                const readCount = users.filter(
                    (user) => user.pivot?.read_at
                ).length;

                return (
                    <span>
                        {readCount} / {users.length}
                    </span>
                );
            },
        },
        {
            key: "created_at",
            label: "Ημερομηνία",
            width: "150px",
            render: (notification) => (
                <span>
                    {notification.created_at
                        ? formatDate(notification.created_at)
                        : "-"}
                </span>
            ),
        },
        {
            key: "actions",
            label: "Ενέργειες",
            width: "180px",
            render: (notification) => (
                <div className="table-actions">
                    <button
                        type="button"
                        className="btn-action btn-view"
                        onClick={() => onView?.(notification)}
                        title="Προβολή"
                    >
                        <FaEye />
                    </button>

                    <button
                        type="button"
                        className="btn-action btn-edit"
                        onClick={() => onEdit?.(notification)}
                        title="Επεξεργασία"
                    >
                        <FaPen />
                    </button>

                    <button
                        type="button"
                        className="btn-action btn-delete"
                        onClick={() => onDelete?.(notification.id)}
                        title="Διαγραφή"
                    >
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            items={notifications}
            emptyMessage="Δεν υπάρχουν ειδοποιήσεις."
        />
    );
};

export default NotificationsTable;