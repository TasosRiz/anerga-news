import { useEffect, useState } from "react";
import "./Notifications.css";

// Components
import SidePanel from "../../../../common/components/SidePanel/SidePanel";
import ConfirmDialog from "../../../../common/components/ConfirmDialog/ConfirmDialog"; //Delete
import AppStatus from "../../../../common/components/Alerts/AppStatus"; //Alerts

// Sections
import NotificationsHeader from "./Header/NotificationsHeader";
import NotificationsTable from "./Table/NotificationsTable";

// Actions
import ViewNotification from "./Actions/View/ViewNotification";
import NotificationForm from "../../../../common/Notifications/Forms/NotificationForm";


// Token
import { useAuth } from "../../../../common/Auth/provider/AuthProvider";
import { useNotificationsPanel } from "../../../../common/Notifications/hooks/useNotificationsPanel";

// Κεντρική σελίδα διαχείρισης ανακοινώσεων του admin panel.
//
// Αναλαμβάνει:
// - φόρτωση των posts και των κατηγοριών από το API
// - εμφάνιση συνοπτικών στατιστικών
// - φιλτράρισμα posts ανά κατηγορία
// - δημιουργία νέου post
// - προβολή και επεξεργασία υπάρχοντος post
// - διαγραφή post με ConfirmDialog
// - διαχείριση του κοινού SidePanel
//
// Χρησιμοποιεί κοινά components και hooks
// για filters, status messages, cards και post counts.

const Notifications = () => {
    // Παίρνει το token του συνδεδεμένου χρήστη από το AuthProvider.
    const { token } = useAuth();

    const {
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
    } = useNotificationsPanel(token);


    // Αν το panelMode δεν είναι null,
    // σημαίνει ότι το SidePanel είναι ανοιχτό.
    const panelOpen = panelMode !== null;

    return (
        <div
            className={`with-side-panel ${panelOpen ? "has-panel" : ""
                }`}
            style={{ "--side-panel-width": "420px" }}
        >
            <div className="main-page-content">
                {/* Header της σελίδας.*/}
                <NotificationsHeader
                    onCreate={handleCreateNotification}
                />

                {/* Εμφανίζεται μόνο όταν υπάρχει κάποιο error. */}
                <AppStatus
                    loading={loading}
                    error={error}
                    empty={
                        !loading &&
                        !error &&
                        notifications.length === 0
                    }
                    loadingMessage="Φόρτωση ειδοποιήσεων..."
                    emptyMessage="Δεν υπάρχουν ειδοποιήσεις."
                />


                {/* Όσο φορτώνουν τα δεδομένα εμφανίζουμε loading.
                     Μόλις ολοκληρωθεί το request εμφανίζουμε τον πίνακα. */}
                {!loading &&
                    !error &&
                    notifications.length > 0 && (
                        <NotificationsTable
                            notifications={notifications}
                            onView={handleViewNotification}
                            onEdit={handleEditNotification}
                            onDelete={handleDeleteNotification}
                        />
                    )}
            </div>

            {/* SidePanel */}
            <SidePanel
                // Ανοιχτό όταν υπάρχει κάποιο panel mode.
                open={panelOpen}

                // Ο τίτλος αλλάζει ανάλογα με την ενέργεια.
                title={
                    panelMode === "create"
                        ? "Νέα ειδοποίηση"
                        : panelMode === "edit"
                            ? "Επεξεργασία ειδοποίησης"
                            : "Λεπτομέρειες ειδοποίησης"
                }


                // Στο view/edit εμφανίζουμε ως subtitle
                // τον τίτλο της επιλεγμένης ειδοποίησης.
                subtitle={selectedNotification?.title}

                // Κλείσιμο του panel.
                onClose={handleClosePanel}
            >
                {/* VIEW MODE */}
                {panelMode === "view" &&
                    selectedNotification && (
                        <ViewNotification
                            notification={
                                selectedNotification
                            }
                        />
                    )}

                {/* CREATE MODE */}
                {panelMode === "create" && (
                    <NotificationForm
                        mode="create"
                        saving={saving}
                        onSave={handleSaveNotification}

                        // Κλείσιμο χωρίς αποθήκευση.
                        onCancel={handleClosePanel}
                    />
                )}
                {/* EDIT MODE */}
                {panelMode === "edit" &&
                    selectedNotification && (
                        <NotificationForm
                            mode="edit"

                            // Δίνουμε τα υπάρχοντα δεδομένα στη φόρμα
                            // ώστε να γεμίσουν τα fields.
                            notification={
                                selectedNotification
                            }
                            saving={saving}
                            // Αποθήκευση αλλαγών.
                            onSave={
                                handleUpdateNotification
                            }
                            // Κλείσιμο χωρίς αποθήκευση.
                            onCancel={handleClosePanel}
                        />
                    )}
            </SidePanel>

            {/* Confirm Delete */}
            <ConfirmDialog
                open={notificationToDelete !== null}
                title="Διαγραφή ειδοποίησης"
                message="Θέλεις σίγουρα να διαγράψεις αυτή την ειδοποίηση;"
                confirmText="Διαγραφή"
                loading={deleting}
                onConfirm={handleConfirmDeleteNotification}
                onCancel={handleCancelDeleteNotification}
            />
        </div>
    );
};

export default Notifications;