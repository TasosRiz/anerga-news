import './ReportsFilter.css'


// Φίλτρα κατάστασης για τη λίστα αιτημάτων.

// Κάθε επιλογή ενημερώνει το ενεργό status filter
// στο parent component.

import "./ReportsFilter.css";

import {
    reportStatusOptions,
} from "../hooks/reportStatusConfig";

const ReportsFilter = ({
    statusFilter = "",
    setStatusFilter,
}) => {
    return (
        <div className="reports-toolbar">
            <div className="reports-filters">
                {reportStatusOptions.map((filter) => {

                    // Ελέγχει αν το συγκεκριμένο φίλτρο είναι ενεργό.
                    const isActive =
                        statusFilter === filter.status;

                    return (
                        <button
                            key={filter.status || "all"}
                            type="button"
                            className={`reports-filter-btn btn-action ${isActive ? "active" : ""
                                }`}
                            onClick={() =>
                                setStatusFilter?.(
                                    filter.status
                                )
                            }
                            aria-pressed={isActive}
                        >
                            {filter.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ReportsFilter;