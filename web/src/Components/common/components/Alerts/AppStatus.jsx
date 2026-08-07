import "./AppStatus.css";

/*Δες MD*/

//  Κοινό component εμφάνισης καταστάσεων της εφαρμογής.

//  Χρησιμοποιείται για μηνύματα φόρτωσης, σφάλματος,
//  επιτυχίας, κενών αποτελεσμάτων και γενικών πληροφοριών.

//  Εμφανίζει μόνο την πρώτη ενεργή κατάσταση,
//  με σειρά προτεραιότητας: loading, error, success, empty, info.

const AppStatus = ({
    loading = false,
    error = "",
    success = "",
    empty = false,
    info = "",

    loadingMessage = "Φόρτωση...",
    errorMessage = "",
    successMessage = "",
    emptyMessage = "Δεν υπάρχουν δεδομένα.",
    infoMessage = "",

    center = false,
}) => {
    // Δημιουργεί τις CSS κλάσεις ανάλογα με τον τύπο του μηνύματος.
    const getClassName = (variant) =>
        `app-status app-status-${variant}${center ? " center" : ""}`;


    // Εμφανίζει μήνυμα κατά τη διάρκεια φόρτωσης δεδομένων.
    if (loading) {
        return (
            <div
                className={getClassName("info")}
                role="status"
                aria-live="polite"
            >
                {loadingMessage}
            </div>
        );
    }

    // Εμφανίζει μήνυμα σφάλματος.
    if (error) {
        return (
            <div
                className={getClassName("error")}
                role="alert"
            >
                {errorMessage || error}
            </div>
        );
    }

    // Εμφανίζει μήνυμα επιτυχούς ολοκλήρωσης μιας ενέργειας.
    if (success) {
        return (
            <div
                className={getClassName("success")}
                role="status"
                aria-live="polite"
            >
                {successMessage || success}
            </div>
        );
    }


    // Empty
    // Εμφανίζει μήνυμα όταν δεν υπάρχουν διαθέσιμα δεδομένα.
    if (empty) {
        return (
            <div
                className={getClassName("info")}
                role="status"
            >
                {emptyMessage}
            </div>
        );
    }


    // Info
    // Εμφανίζει γενικό ενημερωτικό μήνυμα.
    if (info) {
        return (
            <div
                className={getClassName("info")}
                role="status"
                aria-live="polite"
            >
                {infoMessage || info}
            </div>
        );
    }

    // Δεν εμφανίζει τίποτα όταν δεν υπάρχει ενεργή κατάσταση.
    return null;
};

export default AppStatus;