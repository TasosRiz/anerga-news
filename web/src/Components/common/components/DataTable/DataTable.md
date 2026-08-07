# DataTable Usage Guide

Το `DataTable` είναι ένα reusable component για την εμφάνιση δεδομένων σε μορφή πίνακα.

Δεν γνωρίζει τι είδους δεδομένα εμφανίζει.
Οι στήλες και τα δεδομένα δίνονται από το parent component μέσω props.

---

## Τοποθεσία

```text
import DataTable from "@/Components/common/components/DataTable/DataTable";
```

## Παράδειγμα χρήσης
```text
const NotificationsTable = ({
    notifications = [],
    onView,
    onEdit,
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
                    {notification.title}
                </span>
            ),
        },
        {
            key: "type",
            label: "Τύπος",
            render: (notification) => (
                <span
                    className={`notification-type ${notification.type}`}
                >
                    {notification.type}
                </span>
            ),
        },
        {
            key: "recipients",
            label: "Παραλήπτες",
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
            key: "date",
            label: "Ημερομηνία",
            width: "150px",
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
                    >
                        Προβολή
                    </button>

                    <button
                        type="button"
                        className="btn-action btn-edit"
                        onClick={() => onEdit?.(notification)}
                    >
                        Edit
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