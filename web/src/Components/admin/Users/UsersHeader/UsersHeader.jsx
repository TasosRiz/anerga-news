import { useEffect, useState } from "react";

// Components
import Card from "../../../common/components/Card/Card";
import AppStatus from "../../../common/components/Alerts/AppStatus";


// Icons
import {
    BiUser,
    BiUserCheck,
    BiUserPlus,
    BiShield,
} from "react-icons/bi";

// API
import { fetchUserStats } from "../../../common/Users/api/UsersApi";


//  Header της σελίδας χρηστών.
//
//  Αναλαμβάνει:
//  - φόρτωση στατιστικών χρηστών
//  - εμφάνιση loading και error states
//  - δημιουργία των summary cards

const UsersHeader = ({ token }) => {

    // Στατιστικά χρηστών που επιστρέφει το API.
    const [stats, setStats] = useState(null);

    // Κατάσταση φόρτωσης των στατιστικών.
    const [loadingStats, setLoadingStats] = useState(true);

    // Σφάλμα φόρτωσης των στατιστικών.
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            setLoadingStats(false);
            setError("Δεν βρέθηκε admin token.");
            return;
        }

        const loadStats = async () => {
            try {
                setLoadingStats(true);
                setError("");

                const data = await fetchUserStats(token);
                setStats(data);
            } catch (err) {
                console.error("User stats error:", err);
                setError(err.message || "Σφάλμα φόρτωσης στατιστικών χρηστών.");
            } finally {
                setLoadingStats(false);
            }
        };

        loadStats();
    }, [token]);

    // Cards στατιστικών και σύνδεσμοι προς τα αντίστοιχα filters.
    const userCards = [
        {
            title: "Σύνολο Χρηστών",
            value: stats?.total ?? 0,
            icon: <BiUser />,
            color: "#2563eb",
            bgColor: "#e0ecff",
            path: "/admin/dashboard/users",
        },
        {
            title: "Απλοί Χρήστες",
            value: stats?.users ?? 0,
            icon: <BiUserCheck />,
            color: "#059669",
            bgColor: "#dcfce7",
            path: "/admin/dashboard/users?role=user",
        },
        {
            title: "Νέοι Χρήστες",
            value: stats?.new ?? 0,
            icon: <BiUserPlus />,
            color: "#f59e0b",
            bgColor: "#fef3c7",
            path: "/admin/dashboard/users?created=30",

        },
        {
            title: "Διαχειριστές",
            value: stats?.admins ?? 0,
            icon: <BiShield />,
            color: "#dc2626",
            bgColor: "#fee2e2",
            path: "/admin/dashboard/users?role=admin",

        },
    ];

    return (
        <section className="users-header-section">
            <div className="header-container">
                <AppStatus
                    loading={loadingStats}
                    error={error}
                    loadingMessage="Φόρτωση στατιστικών χρηστών..."
                    center
                />

                {!loadingStats && !error && stats && (
                    <Card items={userCards} />
                )}
            </div>
        </section>
    );
};

export default UsersHeader;