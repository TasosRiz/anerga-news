import { useEffect, useState } from "react";

// API
import {
    fetchNotifications,
    createNotification,
    updateNotification,
    deleteNotification,
} from "../api/NotificationsApi";


// Διαχειρίζεται όλη τη λογική του admin Notifications panel.
//
// Περιλαμβάνει:
// - φόρτωση ειδοποιήσεων
// - άνοιγμα create / view / edit mode
// - δημιουργία νέας ειδοποίησης
// - ενημέρωση υπάρχουσας ειδοποίησης
// - διαγραφή ειδοποίησης
// - loading / saving / error states
//
// Δεν περιέχει UI.
// Το Notifications.jsx χρησιμοποιεί το hook
// και αναλαμβάνει μόνο την εμφάνιση των δεδομένων.

export function useNotificationsPanel(token) {

    // Η λίστα με όλες τις ειδοποιήσεις που έρχονται από το backend.
    const [notifications, setNotifications] = useState([]);

    // Η ειδοποίηση που έχει επιλέξει ο admin
    // για προβολή ή επεξεργασία.
    const [selectedNotification, setSelectedNotification] = useState(null);

    // Καθορίζει τι εμφανίζεται στο SidePanel.
    // Πιθανές τιμές:
    // - create
    // - view
    // - edit
    // - null
    const [panelMode, setPanelMode] = useState(null);

    // Κατάσταση φόρτωσης της λίστας ειδοποιήσεων.
    const [loading, setLoading] = useState(true);

    // Κατάσταση αποθήκευσης create / update.
    const [saving, setSaving] = useState(false);

    // Μήνυμα σφάλματος που εμφανίζεται στο UI.
    const [error, setError] = useState("");


    // DELETE STATE

    // Αποθηκεύει το id της ειδοποίησης
    // που πρόκειται να διαγραφεί.
    //
    // Αν είναι null,
    // το ConfirmDialog παραμένει κλειστό.
    const [notificationToDelete, setNotificationToDelete] = useState(null);

    // Δείχνει αν βρίσκεται σε εξέλιξη request διαγραφής.
    const [deleting, setDeleting] = useState(false);


    // Load Notifications
    // Φέρνει όλες τις ειδοποιήσεις από το backend.
    const loadNotifications = async () => {

        // Αν δεν υπάρχει token,
        // δεν μπορούμε να κάνουμε authenticated request.
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            // Ενεργοποιούμε το loading state.
            setLoading(true);

            // Καθαρίζουμε προηγούμενο error.
            setError("");

            // Καλούμε το API και περιμένουμε τις ειδοποιήσεις.
            const data = await fetchNotifications(token);

            // Αποθηκεύουμε τα δεδομένα στο state.
            setNotifications(data);

        } catch (err) {

            // Αν αποτύχει το request,
            // αποθηκεύουμε το μήνυμα λάθους.
            setError(
                err.message ||
                "Σφάλμα φόρτωσης ειδοποιήσεων."
            );

        } finally {

            // Το loading σταματά
            // είτε το request πέτυχε είτε απέτυχε.
            setLoading(false);
        }
    };


    // Initialize
    // Κάθε φορά που αλλάζει το token,
    // φορτώνουμε ξανά τις ειδοποιήσεις.
    useEffect(() => {
        loadNotifications();
    }, [token]);


    // Create Mode
    // Ανοίγει το SidePanel
    // σε κατάσταση δημιουργίας νέας ειδοποίησης.
    const handleCreateNotification = () => {
        setSelectedNotification(null);
        setPanelMode("create");
    };


    // View Mode
    // Ανοίγει μία ειδοποίηση μόνο για προβολή.
    const handleViewNotification = (notification) => {
        setSelectedNotification(notification);
        setPanelMode("view");
    };


    // Edit Mode
    // Ανοίγει μία ειδοποίηση για επεξεργασία.
    const handleEditNotification = (notification) => {
        setSelectedNotification(notification);
        setPanelMode("edit");
    };


    // Close Panel
    // Καθαρίζει την επιλεγμένη ειδοποίηση
    // και κλείνει το SidePanel.
    const handleClosePanel = () => {
        setSelectedNotification(null);
        setPanelMode(null);
    };


    // Save Notification
    // Εκτελείται όταν γίνεται submit
    // η φόρμα δημιουργίας.
    const handleSaveNotification = async (formData) => {

        try {
            // Ενεργοποιούμε το saving state.
            setSaving(true);

            // Καθαρίζουμε προηγούμενο error.
            setError("");

            // Στέλνουμε τα δεδομένα
            // της νέας ειδοποίησης στο backend.
            await createNotification(
                token,
                formData
            );

            // Ξαναφορτώνουμε τη λίστα
            // ώστε να εμφανιστεί η νέα ειδοποίηση.
            await loadNotifications();

            // Κλείνουμε το SidePanel.
            handleClosePanel();

        } catch (err) {

            // Εμφανίζουμε error
            // αν αποτύχει η δημιουργία.
            setError(
                err.message ||
                "Σφάλμα δημιουργίας ειδοποίησης."
            );

        } finally {

            // Σταματάμε το saving state.
            setSaving(false);
        }
    };


    // Update Notification
    // Εκτελείται όταν γίνεται submit
    // η φόρμα επεξεργασίας.
    const handleUpdateNotification = async (formData) => {

        // Αν για κάποιο λόγο δεν υπάρχει id,
        // δεν μπορούμε να κάνουμε update.
        if (!selectedNotification?.id) {
            return;
        }

        try {
            // Ενεργοποιούμε το saving state.
            setSaving(true);

            // Καθαρίζουμε προηγούμενο error.
            setError("");

            // Στέλνουμε το update στο backend.
            await updateNotification(
                token,
                selectedNotification.id,
                formData
            );

            // Ανανεώνουμε τη λίστα.
            await loadNotifications();

            // Κλείνουμε το SidePanel.
            handleClosePanel();

        } catch (err) {

            // Εμφανίζουμε error
            // αν αποτύχει η ενημέρωση.
            setError(
                err.message ||
                "Σφάλμα ενημέρωσης ειδοποίησης."
            );

        } finally {

            // Σταματάμε το saving state.
            setSaving(false);
        }
    };


    // Handle Delete
    // Δεν διαγράφουμε αμέσως.
    //
    // Αποθηκεύουμε πρώτα το id
    // και ανοίγει το ConfirmDialog.
    const handleDeleteNotification = (id) => {
        setNotificationToDelete(id);
    };


    // Cancel Delete
    // Καθαρίζει το id και κλείνει το ConfirmDialog.
    const handleCancelDeleteNotification = () => {
        setNotificationToDelete(null);
    };


    // Confirm Delete
    // Εκτελείται όταν ο admin πατήσει "Διαγραφή"
    // μέσα στο ConfirmDialog.
    const handleConfirmDeleteNotification = async () => {

        // Αν δεν υπάρχει επιλεγμένη ειδοποίηση,
        // δεν υπάρχει κάτι για διαγραφή.
        if (!notificationToDelete) {
            return;
        }

        try {
            // Ενεργοποιούμε το deleting state.
            setDeleting(true);

            // Καθαρίζουμε προηγούμενο error.
            setError("");

            // Ζητάμε από το backend
            // να διαγράψει την ειδοποίηση.
            await deleteNotification(
                token,
                notificationToDelete
            );

            // Αφαιρούμε την ειδοποίηση
            // και από το local state.
            //
            // Έτσι δεν χρειάζεται νέο fetch.
            setNotifications((previousNotifications) =>
                previousNotifications.filter(
                    (notification) =>
                        notification.id !== notificationToDelete
                )
            );

            // Αν η ειδοποίηση που διαγράφηκε
            // ήταν ανοιχτή στο SidePanel,
            // κλείνουμε το panel.
            if (
                selectedNotification?.id ===
                notificationToDelete
            ) {
                handleClosePanel();
            }

            // Καθαρίζουμε το id
            // ώστε να κλείσει το ConfirmDialog.
            setNotificationToDelete(null);

        } catch (err) {

            // Εμφανίζουμε error
            // αν αποτύχει η διαγραφή.
            setError(
                err.message ||
                "Σφάλμα διαγραφής ειδοποίησης."
            );

        } finally {

            // Σταματάμε το deleting state.
            setDeleting(false);
        }
    };


    // Επιστρέφει όλο το state και τις handlers
    // που χρειάζεται το Notifications.jsx.
    return {
        notifications,
        selectedNotification,
        panelMode,

        loading,
        saving,
        error,

        notificationToDelete,
        deleting,

        handleCreateNotification,
        handleViewNotification,
        handleEditNotification,
        handleClosePanel,

        handleSaveNotification,
        handleUpdateNotification,

        handleDeleteNotification,
        handleCancelDeleteNotification,
        handleConfirmDeleteNotification,
    };
}