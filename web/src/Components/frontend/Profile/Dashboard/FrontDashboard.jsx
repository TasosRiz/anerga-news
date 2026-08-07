//
//  Dashboard του συνδεδεμένου χρήστη.
//
//  Εμφανίζει:
//  - σύνοψη αιτημάτων
//  - πρόσφατες αιτήματα
//  - προβολή και επεξεργασία αιτήματος σε SidePanel
//

// Components
import Card from "../../../common/components/Card/Card";
import ReportsCards from "../Reports/ReportCards/ReportsCards";
import DashHeader from "../../../common/components/DashHeader/dash-header";
import AppStatus from "../../../common/components/Alerts/AppStatus";
import ReportSidePanel from "../../../common/Reports/Details/ReportSidePanel";

// Hooks
import { useAuth } from "../../../common/Auth/provider/AuthProvider";
import { useUserReports } from "../../../common/Reports/hooks/useUserReports";
import { useReportCountsCards } from "../../../common/Reports/hooks/userReportCountsCards";
import { useReportsPanel } from "../../../common/Reports/hooks/useReportsPanel";
import { useReportsPanelHandlers } from "../../../common/Reports/hooks/useReportsPanelHandlers";

// CSS
import "./FrontDashboard.css";
import NotificationsList from "../../../common/Notifications/List/NotificationsList";
import { useEffect, useState } from "react";
import { fetchUserNotifications } from "../../../common/Notifications/api/userNotificationsApi";

function FrontDashboard() {
    // Token του συνδεδεμένου χρήστη.
    const { token } = useAuth();

    // Διαχείριση της λίστας αιτημάτων.
    const {
        reports,
        loadingReports,
        reportsError,
        setReportsError,
        updateReportInList,
    } = useUserReports({
        token,
    });

    // State προβολής και επεξεργασίας του SidePanel.
    const {
        selectedReport,
        panelMode,
        panelIsOpen,

        openView,
        openEdit,
        closePanel,
        cancelEdit,
    } = useReportsPanel();

    // Συνδέει τις κάρτες
    // με το SidePanel αιτήματος.
    const {
        handleViewReport,
        handleEditReport,
        handleClosePanel,
        handleCancelEdit,
    } = useReportsPanelHandlers({
        reports,
        setPageError: setReportsError,

        openView,
        openEdit,
        closePanel,
        cancelEdit,
    });

    // Στατιστικές κάρτες αιτημάτων.
    const {
        cards,
        loadingCounts,
        countsError,
    } = useReportCountsCards({
        token,
        isAdmin: false,
    });

    // Ενημερώνει τη λίστα και επιστρέφει
    // στην προβολή της ενημερωμένης αιτήματος.
    const handleUpdatedReport = (
        updatedReport
    ) => {
        if (!updatedReport?.id) {
            return;
        }

        const currentReport = reports.find(
            (report) =>
                String(report.id) ===
                String(updatedReport.id)
        );

        const mergedReport = {
            ...(currentReport || {}),
            ...updatedReport,
        };

        updateReportInList(mergedReport);
        openView(mergedReport);
    };

    // Η λίστα είναι κενή μετά
    // την ολοκλήρωση της φόρτωσης.
    const reportsAreEmpty =
        !loadingReports &&
        !reportsError &&
        reports.length === 0;

    // NOTIFICATIONS
    const [notifications, setNotifications] = useState([]);
    const [loadingNotifications, setLoadingNotifications] = useState(true);
    const [notificationsError, setNotificationsError] = useState("");

    useEffect(() => {
        const loadNotifications = async () => {
            if (!token) {
                setLoadingNotifications(false);
                return;
            }

            try {
                setLoadingNotifications(true);
                setNotificationsError("");

                const data = await fetchUserNotifications(token);

                setNotifications(data);
            } catch (error) {
                setNotificationsError(
                    error.message ||
                    "Σφάλμα φόρτωσης ειδοποιήσεων."
                );
            } finally {
                setLoadingNotifications(false);
            }
        };

        loadNotifications();
    }, [token]);

    return (
        <div
            className={`with-side-panel ${panelIsOpen
                ? "has-panel"
                : ""
                }`}
            style={{
                "--side-panel-width": "620px",
            }}
        >
            <div className="front-dashboard-container">
                <DashHeader
                    title="Πίνακας Ελέγχου"
                    showSearch={false}
                    showNotification={false}
                />

                {/* Σύνοψη στατιστικών αιτημάτων. */}
                <section className="dashboard-top">
                    <h3>Σύνοψη Αιτημάτων</h3>

                    <AppStatus
                        loading={loadingCounts}
                        error={countsError}
                        loadingMessage="Φόρτωση στατιστικών..."
                    />

                    {!loadingCounts &&
                        !countsError &&
                        cards.length > 0 && (
                            <Card items={cards} />
                        )}
                </section>

                {/* Πρόσφατες αιτήματα χρήστη. */}
                <section className="dashboard-bottom">
                    <div className="dashboard-right box">
                        <h3>Πρόσφατες Αιτήματα</h3>

                        <AppStatus
                            loading={loadingReports}
                            error={reportsError}
                            empty={reportsAreEmpty}
                            loadingMessage="Φόρτωση αιτημάτων..."
                            emptyMessage="Δεν υπάρχουν αιτήματα."
                        />

                        {!loadingReports &&
                            !reportsError &&
                            reports.length > 0 && (
                                <ReportsCards
                                    reports={reports}
                                    showId={false}
                                    showUser={false}
                                    showEdit={false}
                                    limit={4}
                                    onView={handleViewReport}
                                />
                            )}
                    </div>

                    <div className="dashboard-notifications scrollable-y box">
                        <h3>Ειδοποιήσεις</h3>

                        <AppStatus
                            loading={loadingNotifications}
                            error={notificationsError}
                            empty={
                                !loadingNotifications &&
                                !notificationsError &&
                                notifications.length === 0
                            }
                            loadingMessage="Φόρτωση ειδοποιήσεων..."
                            emptyMessage="Δεν υπάρχουν ειδοποιήσεις."
                        />

                        {!loadingNotifications &&
                            !notificationsError &&
                            notifications.length > 0 && (
                                <div className="dashboard-notifications-list scrollable-y">
                                    <NotificationsList
                                        notifications={notifications}
                                    />
                                </div>
                            )}
                    </div>
                </section>

            </div>

            {/* Προβολή και επεξεργασία αιτήματος. */}
            <ReportSidePanel
                open={panelIsOpen}
                mode={panelMode}
                report={selectedReport}

                allowEdit

                showUser={false}
                showStatus={false}

                mediaUploadOnly
                mediaFolderSlug="reports"

                onClose={handleClosePanel}
                onEdit={handleEditReport}
                onCancelEdit={
                    handleCancelEdit
                }
                onUpdated={
                    handleUpdatedReport
                }
            />
        </div>
    );
}

export default FrontDashboard;