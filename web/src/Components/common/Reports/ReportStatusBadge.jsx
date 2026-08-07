import { reportStatusConfig } from "../constants/statusConfig";

const statusConfig = {
    new: {
        label: "Νέα",
        className: "status-new",
    },
    in_progress: {
        label: "Σε εξέλιξη",
        className: "status-in-progress",
    },
    resolved: {
        label: "Ολοκληρωμένη",
        className: "status-resolved",
    },
};

const ReportStatusBadge = ({ status }) => {
    const config = statusConfig[status] || {
        label: status || "Άγνωστο",
        className: "status-unknown ",
    };

    return (
        <span className={`btn-action status-badge ${config.className}`}>
            {config.label}
        </span>
    );
};

export default ReportStatusBadge;