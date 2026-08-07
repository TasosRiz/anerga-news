/*
 Κεντρικός provider αυθεντικοποίησης της εφαρμογής.

 Αποθηκεύει και διαχειρίζεται το token και τα στοιχεία του χρήστη.
 Παρέχει τις λειτουργίες login, logout και καθαρισμού του authentication.

 Ελέγχει αν ο χρήστης είναι συνδεδεμένος ή διαχειριστής
 και διαθέτει όλα τα παραπάνω στα components μέσω του useAuth hook.
  */


import {
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";

import { logoutUser } from "../api/auth";

const AuthContext = createContext(null);

// Διαβάζει με ασφάλεια τα αποθηκευμένα στοιχεία του χρήστη
// από το localStorage κατά την αρχικοποίηση της εφαρμογής.
const getStoredUser = () => {
    try {
        const storedUser = localStorage.getItem("user");

        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Failed to read stored user:", error);
        localStorage.removeItem("user");

        return null;
    }
};

// Διαβάζει το αποθηκευμένο token από το localStorage.
const getStoredToken = () => {
    return localStorage.getItem("token") || "";
};

// Κεντρικό state για το token και τα στοιχεία του χρήστη.
// Οι αρχικές τιμές προέρχονται από το localStorage.
export function AuthProvider({ children }) {
    const [token, setToken] = useState(getStoredToken);
    const [user, setUser] = useState(getStoredUser);

    // Υπολογίζει αν υπάρχει ενεργή σύνδεση χρήστη.
    const isAuthenticated = Boolean(token);

    // Ελέγχει αν ο συνδεδεμένος χρήστης ειναι admin.
    const isAdmin = user?.role?.toLowerCase() === "admin";

    // Αποθηκεύει το νέο token και τον χρήστη
    // στο React state και στο localStorage.
    const login = (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);

        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    // Καθαρίζει πλήρως τα δεδομένα αυθεντικοποίησης
    // από το state και το localStorage.
    const clearAuth = () => {
        setToken("");
        setUser(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("authInfo");
        localStorage.removeItem("adminInfo");
    };

    // Εκτελεί logout στον server και
    // καθαρίζει τα τοπικά δεδομένα σύνδεσης, ανεξάρτητα από το αποτέλεσμα.
    const logout = async () => {
        try {
            if (token) {
                await logoutUser(token);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            clearAuth();
        }
    };


    // Δημιουργεί το κοινό αντικείμενο που θα είναι διαθέσιμο
    // σε όλα τα components μέσω του AuthContext.
    // Το useMemo αποφεύγει περιττή δημιουργία νέου αντικειμένου
    // όταν δεν έχουν αλλάξει οι βασικές τιμές authentication.
    const value = useMemo(
        () => ({
            token,
            user,
            isAuthenticated,
            isAdmin,
            login,
            logout,
            clearAuth,
            setUser,
        }),
        [token, user, isAuthenticated, isAdmin]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook για εύκολη πρόσβαση στο AuthContext
// από οποιοδήποτε component της εφαρμογής.
export function useAuth() {
    const context = useContext(AuthContext);


    // Προστασία από λανθασμένη χρήση του hook
    // εκτός του AuthProvider.
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider.");
    }

    return context;
}