import { Navigate } from "react-router-dom";

import { useAuth } from "../provider/AuthProvider";

// Προστατεύει τα admin routes.
//
// Αν ο χρήστης δεν είναι συνδεδεμένος,
// μεταφέρεται στη σελίδα admin login.
//
// Αν είναι συνδεδεμένος αλλά δεν είναι admin,
// μεταφέρεται στην αρχική σελίδα.
function RequireAdmin({ children }) {
    const {
        isAuthenticated,
        isAdmin,
    } = useAuth();

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }

    if (!isAdmin) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return children;
}

export default RequireAdmin;