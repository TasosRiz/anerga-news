import ReportStatusBadge from "../../../common/Reports/ReportStatusBadge";
import "./AdminReportsTable.css";

// Icons
import {
    FaEye,
    FaPen,
    FaTrash,
} from "react-icons/fa";

//  Πίνακας εμφάνισης αιτημάτων για το admin περιβάλλον.

//  Αναλαμβάνει:
//  - την εμφάνιση βασικών στοιχείων κάθε αιτήματος
//  - την προαιρετική εμφάνιση ID και χρήστη
//  - τον περιορισμό του αριθμού αποτελεσμάτων
//  - το άνοιγμα της αιτήματος μέσω callback ή route
//
const AdminReportsTable = ({
    reports = [],

    showId = true,
    showUser = true,

    showEdit = false,
    onEdit,

    showDelete = false,
    onDelete,


    onView,
    limit = null,
}) => {
    // Περιορίζει τα reports όταν έχει δοθεί limit.
    const visibleReports = limit ? reports.slice(0, limit) : reports;

    // Δεν εμφανίζει table όταν δεν υπάρχουν reports.
    if (visibleReports.length === 0) {
        return (
            <div className="alert alert-info mb-0">
                Δεν υπάρχει ακόμα καμία αίτημα.
            </div>
        );
    }

    return (
        <div className="admin-reports-table-wrapper scrollable-x scrollable-y">
            <table className="admin-reports-table ">
                <thead>
                    <tr>
                        {showId && <th>#</th>}
                        <th>Τίτλος</th>
                        <th>Κατηγορία</th>

                        {showUser && <th>Χρήστης</th>}

                        <th>Τοποθεσία</th>
                        <th>Κατάσταση</th>
                        <th>Ημερομηνία</th>
                        <th>Ενέργειες</th>
                    </tr>
                </thead>

                <tbody>
                    {visibleReports.map((report) => (
                        <tr key={report.id}>
                            {/* Κωδικός αιτήματος. */}
                            {showId && (
                                <td
                                    data-label="#"
                                    className="report-table-id"
                                >
                                    #CC-
                                    {String(report.id).padStart(
                                        5,
                                        "0"
                                    )}
                                </td>
                            )}


                            {/* Τίτλος αιτήματος. */}
                            <td
                                data-label="Τίτλος"
                                className="report-table-title"
                            >
                                {report.title || "Χωρίς τίτλο"}
                            </td>

                            {/* Κατηγορία αιτήματος. */}
                            <td data-label="Κατηγορία">
                                {report.category?.name ||
                                    "Χωρίς Κατηγορία"}
                            </td>

                            {/* Χρήστης που δημιούργησε την αίτημα. */}
                            {showUser && (
                                <td data-label="Χρήστης">
                                    {report.user?.name || "—"}
                                </td>
                            )}

                            {/* Τοποθεσία αιτήματος. */}
                            <td
                                data-label="Τοποθεσία"
                                className="report-table-location"
                            >
                                {report.address ||
                                    "Δεν έχει δοθεί τοποθεσία"}
                            </td>

                            {/* Κατάσταση αιτήματος. */}
                            <td data-label="Κατάσταση">
                                <ReportStatusBadge
                                    status={report.status}
                                />
                            </td>

                            {/* Ημερομηνία δημιουργίας. */}
                            <td
                                data-label="Ημερομηνία"
                                className="report-table-date"
                            >
                                {report.created_at
                                    ? new Date(
                                        report.created_at
                                    ).toLocaleDateString(
                                        "el-GR"
                                    )
                                    : "—"}
                            </td>

                            {/* Άνοιγμα της αιτήματος στο SidePanel. */}
                            <td data-label="Ενέργειες">
                                <div className="report-table-actions">
                                    <button
                                        type="button"
                                        className="btn-action btn-view"
                                        onClick={() => onView?.(report.id)}
                                    >
                                        <FaEye />
                                    </button>

                                    {showEdit && (
                                        <button
                                            type="button"
                                            className="btn-action btn-edit"
                                            onClick={() => onEdit?.(report)}
                                        >
                                            <FaPen />
                                        </button>
                                    )}

                                    {showDelete && (
                                        <button
                                            type="button"
                                            className="btn-action btn-delete"
                                            onClick={() => onDelete?.(report.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminReportsTable;