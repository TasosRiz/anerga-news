import { useState } from "react";
import { fetchReportById } from "../api/reports";


//  Custom hook για τη διαχείριση του SidePanel λεπτομερειών αιτήματος.

//  Αναλαμβάνει:
//  - τη φόρτωση μίας αιτήματος βάσει id
//  - την κατάσταση φόρτωσης
//  - τη διαχείριση σφαλμάτων
//  - το άνοιγμα και το κλείσιμο του SidePanel
export const useReportDetailsPanel = (token) => {
    // Η αίτημα που εμφανίζεται στο SidePanel.
    const [selectedReport, setSelectedReport] = useState(null);

    // Κατάσταση φόρτωσης λεπτομερειών.
    const [loadingDetails, setLoadingDetails] = useState(false);

    // Μήνυμα σφάλματος φόρτωσης.
    const [detailsError, setDetailsError] = useState("");

    // Φορτώνει μία αίτημα και ανοίγει το SidePanel.
    const openReportDetails = async (id) => {
        if (!token) {
            setDetailsError("Δεν βρέθηκε token.");
            return;
        }

        if (!id) {
            setDetailsError("Δεν βρέθηκε η αίτημα.");
            return;
        }

        try {
            setLoadingDetails(true);
            setDetailsError("");
            setSelectedReport(null);

            const data = await fetchReportById(token, id);

            setSelectedReport(data);
        } catch (err) {
            setDetailsError(
                err?.message ||
                "Σφάλμα φόρτωσης αιτήματος."
            );
        } finally {
            setLoadingDetails(false);
        }
    };

    // Κλείνει το SidePanel και καθαρίζει την κατάστασή του.
    const closeReportDetails = () => {
        setSelectedReport(null);
        setDetailsError("");
    };

    return {
        selectedReport,
        loadingDetails,
        detailsError,
        openReportDetails,
        closeReportDetails,
    };
};