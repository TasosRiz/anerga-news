import { useEffect, useState } from "react";

// Icons
import {
    BiClipboard,
    BiPlusCircle,
    BiLoaderCircle,
    BiCheckCircle,
} from "react-icons/bi";

// API
import {
    fetchReportCounts,
    fetchUserReportCounts,
} from "../api/reports";


//  Custom hook για τη φόρτωση των στατιστικών αιτημάτων
//  και τη δημιουργία των cards του dashboard.

//  Υποστηρίζει:
//  - στατιστικά διαχειριστή
//  - στατιστικά συνδεδεμένου χρήστη
//  - κατάσταση φόρτωσης
//  - διαχείριση σφαλμάτων
//  - διαφορετικά routes ανάλογα με τον ρόλο
export const useReportCountsCards = ({ token, isAdmin = false }) => {
    // Στατιστικά αιτημάτων που επιστρέφει το API.
    const [counts, setCounts] = useState(null);

    // Κατάσταση φόρτωσης των στατιστικών.
    const [loadingCounts, setLoadingCounts] = useState(true);

    // Μήνυμα σφάλματος φόρτωσης.
    const [countsError, setCountsError] = useState("");

    // Βασικό route ανάλογα με τον ρόλο του χρήστη.
    const basePath = isAdmin
        ? "/admin/dashboard/reports"
        : "/profile/reports";

    // Φορτώνει τα στατιστικά αιτημάτων.
    useEffect(() => {
        if (!token) {
            setCounts(null);
            setLoadingCounts(false);
            return;
        }

        const loadCounts = async () => {
            try {
                setLoadingCounts(true);
                setCountsError("");

                const data = isAdmin
                    ? await fetchReportCounts(token)
                    : await fetchUserReportCounts(token);

                setCounts(data || {});
            } catch (err) {
                setCountsError(
                    err?.message ||
                    "Σφάλμα φόρτωσης στατιστικών αιτημάτων."
                );
            } finally {
                setLoadingCounts(false);
            }
        };

        loadCounts();
    }, [token, isAdmin]);

    // Cards στατιστικών που εμφανίζονται στο dashboard.
    const cards = [
        {
            title: "Σύνολο Αιτημάτων",
            value: counts?.total ?? 0,
            icon: <BiClipboard />,
            color: "#526D82",
            bgColor: "#eaf0f4",
            path: basePath,
        },
        {
            title: "Νέες Αιτήματα",
            value: counts?.new ?? 0,
            icon: <BiPlusCircle />,
            color: "#3498DB",
            bgColor: "#e0f2fe",
            path: `${basePath}?status=new`,
        },
        {
            title: "Σε εξέλιξη",
            value: counts?.in_progress ?? 0,
            icon: <BiLoaderCircle />,
            color: "#F39C12",
            bgColor: "#fef3c7",
            path: `${basePath}?status=in_progress`,
        },
        {
            title: "Ολοκληρωμένες",
            value: counts?.solved ?? 0,
            icon: <BiCheckCircle />,
            color: "#9527ae",
            bgColor: "#c690da",
            path: `${basePath}?status=resolved`,
        },
    ];

    return {
        counts,
        cards,
        loadingCounts,
        countsError,
    };
};