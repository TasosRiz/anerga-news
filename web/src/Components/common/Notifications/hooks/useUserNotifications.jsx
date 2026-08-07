import { useEffect, useState } from "react";

// API
import {
    fetchUserNotifications,
    fetchUnreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../api/userNotificationsApi";


// Διαχειρίζεται τη λογική των ειδοποιήσεων
// του συνδεδεμένου χρήστη.
//
// Αναλαμβάνει:
// - τη φόρτωση των notifications
// - τη φόρτωση του unread count
// - το mark μιας notification ως read
// - το mark όλων των notifications ως read
// - loading state

export function useUserNotifications(token) {

    // Λίστα ειδοποιήσεων του χρήστη.
    const [notifications, setNotifications] = useState([]);

    // Πλήθος μη διαβασμένων ειδοποιήσεων.
    const [unreadCount, setUnreadCount] = useState(0);

    // Κατάσταση φόρτωσης.
    const [loading, setLoading] = useState(false);


    // Load Notifications
    // Φορτώνει παράλληλα:
    // - τις ειδοποιήσεις
    // - το unread count
    const loadNotifications = async () => {
        if (!token) {
            setNotifications([]);
            setUnreadCount(0);
            return;
        }

        try {
            setLoading(true);

            const [items, count] = await Promise.all([
                fetchUserNotifications(token),
                fetchUnreadNotificationsCount(token),
            ]);

            setNotifications(items);
            setUnreadCount(count);

        } catch (error) {

            console.error(
                "Notifications error:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    // Initialize
    // Κάθε φορά που αλλάζει το token,
    // φορτώνουμε ξανά τις notifications.
    useEffect(() => {
        loadNotifications();
    }, [token]);


    // Mark One As Read
    // Μαρκάρει μία ειδοποίηση ως διαβασμένη
    // και ανανεώνει τα δεδομένα.
    const markOneAsRead = async (notification) => {

        // Αν είναι ήδη read,
        // δεν χρειάζεται νέο request.
        const isUnread =
            !notification?.pivot?.read_at;

        if (!isUnread) {
            return;
        }

        await markNotificationAsRead(
            token,
            notification.id
        );

        await loadNotifications();
    };


    // Mark All As Read
    // Μαρκάρει όλες τις ειδοποιήσεις ως διαβασμένες
    // και ανανεώνει τη λίστα και το unread count.
    const markAllAsRead = async () => {
        await markAllNotificationsAsRead(token);

        await loadNotifications();
    };


    return {
        notifications,
        unreadCount,
        loading,

        loadNotifications,
        markOneAsRead,
        markAllAsRead,
    };
}