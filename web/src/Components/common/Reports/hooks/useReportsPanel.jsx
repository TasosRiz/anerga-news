import { useState } from "react";


// Custom hook για τη διαχείριση του SidePanel αιτημάτων.

// Αναλαμβάνει:
// - την επιλεγμένη αίτημα
// - το mode του panel
// - το άνοιγμα για create, view και edit
// - το κλείσιμο του panel
// - την επιστροφή από edit σε view
export const useReportsPanel = () => {
    // Αίτημα που εμφανίζεται ή επεξεργάζεται στο SidePanel.
    const [selectedReport, setSelectedReport] =
        useState(null);

    // Διαθέσιμα modes: "", "create", "view", "edit".
    const [panelMode, setPanelMode] = useState("");

    // Το panel θεωρείται ανοιχτό όταν υπάρχει ενεργό mode.
    const panelIsOpen = Boolean(panelMode);

    // Create
    // Ανοίγει το panel για δημιουργία νέας αιτήματος.
    const openCreate = () => {
        setSelectedReport(null);
        setPanelMode("create");
    };

    // View
    // Ανοίγει το panel για προβολή αιτήματος.
    const openView = (report) => {
        setSelectedReport(report);
        setPanelMode("view");
    };

    // Edit
    // Ανοίγει το panel για επεξεργασία αιτήματος.
    const openEdit = (report) => {
        setSelectedReport(report);
        setPanelMode("edit");
    };

    // Close
    // Κλείνει το panel και καθαρίζει την επιλεγμένη αίτημα.
    const closePanel = () => {
        setSelectedReport(null);
        setPanelMode("");
    };

    // Επιστρέφει από το edit mode στο view mode.
    const cancelEdit = () => {
        if (!selectedReport) {
            closePanel();
            return;
        }

        setPanelMode("view");
    };

    return {
        selectedReport,
        setSelectedReport,

        panelMode,
        panelIsOpen,

        openCreate,
        openView,
        openEdit,
        closePanel,
        cancelEdit,
    };
};
