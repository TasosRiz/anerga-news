//
//  Custom hook διαχείρισης των αιτημάτων
//  του συνδεδεμένου χρήστη.
//
//  Αναλαμβάνει:
//  - τη φόρτωση των αιτημάτων
//  - τις καταστάσεις loading και error
//  - την προσθήκη νέας αιτήματος στη λίστα
//  - την ενημέρωση υπάρχουσας αιτήματος
//

import {
    useCallback,
    useEffect,
    useState,
} from "react";

// API
import {
    fetchUserReports,
} from "../api/reports";

export const useUserReports = ({
    token,
    autoLoad = true,
}) => {
    // Αιτήματα του συνδεδεμένου χρήστη.
    const [reports, setReports] = useState([]);

    // Κατάσταση φόρτωσης αιτημάτων.
    const [loadingReports, setLoadingReports] =
        useState(false);

    // Σφάλμα φόρτωσης ή διαχείρισης της λίστας.
    const [reportsError, setReportsError] =
        useState("");

    // Φορτώνει τις αιτήματα του χρήστη.
    const loadReports = useCallback(async () => {
        if (!token) {
            setReports([]);
            setReportsError("");
            setLoadingReports(false);
            return;
        }

        try {
            setLoadingReports(true);
            setReportsError("");

            const data =
                await fetchUserReports(token);

            const normalizedReports = Array.isArray(data)
                ? data
                : [];

            setReports(normalizedReports);

            // Επιστρέφει τη νέα λίστα ώστε το parent
            // να μπορεί να βρει το πλήρες report.
            return normalizedReports;
        } catch (error) {
            setReports([]);

            setReportsError(
                error?.message ||
                "Σφάλμα φόρτωσης αιτημάτων."
            );
        } finally {
            setLoadingReports(false);
        }
    }, [token]);

    // Φορτώνει αυτόματα τις αιτήματα
    // όταν αλλάζει το token.
    useEffect(() => {
        if (!autoLoad) {
            return;
        }

        loadReports();
    }, [autoLoad, loadReports]);

    // Προσθέτει μία νέα αίτημα
    // στην αρχή της λίστας.
    const addReport = useCallback((newReport) => {
        if (!newReport?.id) {
            return;
        }

        setReports((previousReports) => [
            newReport,
            ...previousReports,
        ]);
    }, []);

    // Ενημερώνει μία υπάρχουσα αίτημα
    // χωρίς νέο API request.
    const updateReportInList = useCallback(
        (updatedReport) => {
            if (!updatedReport?.id) {
                return;
            }

            setReports((previousReports) =>
                previousReports.map((report) =>
                    String(report.id) ===
                        String(updatedReport.id)
                        ? {
                            ...report,
                            ...updatedReport,
                        }
                        : report
                )
            );
        },
        []
    );

    return {
        reports,

        loadingReports,

        reportsError,
        setReportsError,

        loadReports,
        addReport,
        updateReportInList,
    };
};