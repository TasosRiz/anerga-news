//
//  Συνδέει τη λίστα αιτημάτων με το state του SidePanel.
//
//  Αναλαμβάνει:
//  - άνοιγμα create mode
//  - εύρεση και προβολή αιτήματος
//  - μετάβαση σε edit mode
//  - κλείσιμο του panel
//  - επιστροφή από edit σε view
//

export const useReportsPanelHandlers = ({
    reports = [],
    setPageError,

    openCreate,
    openView,
    openEdit,
    closePanel,
    cancelEdit,
}) => {
    // Ανοίγει το create mode.
    const handleCreateReport = () => {
        setPageError?.("");
        openCreate?.();
    };

    // Βρίσκει την αίτημα από τη λίστα
    // και ανοίγει το view mode.
    const handleViewReport = (reportId) => {
        const report = reports.find(
            (item) =>
                String(item.id) ===
                String(reportId)
        );

        if (!report) {
            setPageError?.(
                "Δεν βρέθηκε η αίτημα."
            );
            return;
        }

        setPageError?.("");
        openView?.(report);
    };

    // Ανοίγει την επιλεγμένη αίτημα σε edit mode.
    const handleEditReport = (report) => {
        if (!report) {
            setPageError?.(
                "Δεν βρέθηκε η αίτημα."
            );
            return;
        }

        setPageError?.("");
        openEdit?.(report);
    };

    // Κλείνει το SidePanel.
    const handleClosePanel = () => {
        closePanel?.();
    };

    // Επιστρέφει από το edit στο view mode.
    const handleCancelEdit = () => {
        cancelEdit?.();
    };

    return {
        handleCreateReport,
        handleViewReport,
        handleEditReport,
        handleClosePanel,
        handleCancelEdit,
    };
};