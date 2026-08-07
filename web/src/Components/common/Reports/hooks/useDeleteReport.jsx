import { useState } from "react";
import { deleteReport } from "../api/reports";

export const useDeleteReport = ({
    token,
    onDeleted,
    onError,
}) => {
    const [reportToDelete, setReportToDelete] = useState(null);
    const [deletingReport, setDeletingReport] = useState(false);

    const openDeleteConfirm = (id) => {
        setReportToDelete(id);
    };

    const cancelDelete = () => {
        setReportToDelete(null);
    };

    const confirmDelete = async () => {
        if (!reportToDelete) return;

        try {
            setDeletingReport(true);

            await deleteReport(token, reportToDelete);

            onDeleted?.(reportToDelete);

            setReportToDelete(null);
        } catch (error) {
            onError?.(
                error?.message ||
                "Σφάλμα διαγραφής αιτήματος."
            );
        } finally {
            setDeletingReport(false);
        }
    };

    return {
        reportToDelete,
        deletingReport,

        openDeleteConfirm,
        cancelDelete,
        confirmDelete,
    };
};