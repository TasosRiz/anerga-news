import { useEffect, useState } from "react";

//Layout
import PagesLayout from "../pages-layout/pages-layout";

// Components
import Card from "../../../common/components/Card/Card";
import { useReportCountsCards } from "../../../common/Reports/hooks/userReportCountsCards";
// Reports Side Panel
import ReportSidePanel from "../../../common/Reports/Details/ReportSidePanel";
import { useReportsPanel } from "../../../common/Reports/hooks/useReportsPanel";
import { useReportsPanelHandlers } from "../../../common/Reports/hooks/useReportsPanelHandlers";

//Statistics-By Category
import ReportsByCategory from "./ByCategory/ReportsByCategory";
import ReportsOverTime from "./OverTime/ReportsOverTime";
import ReportsByLocation from "./ByLocation/ReportsByLocation";

import AdminReportsTable from "../Reports/AdminReportsTable";

// API
import { fetchReports } from "../../../common/Reports/api/reports";

// Token
import { useAuth } from "../../../common/Auth/provider/AuthProvider";

// CSS
import "./Stats.css";
import AppStatus from "../../../common/components/Alerts/AppStatus";


//  Σελίδα στατιστικών του admin.
//
//  Αναλαμβάνει:
//  - εμφάνιση συνοπτικών στατιστικών αιτημάτων
//  - εμφάνιση γραφημάτων ανά χρόνο, κατηγορία και τοποθεσία
//  - εμφάνιση των πιο πρόσφατων αιτημάτων
//  - προβολή και επεξεργασία αιτήματος μέσω SidePanel

const Stats = () => {
    // Token του συνδεδεμένου admin.
    const { token } = useAuth();

    // Όλες οι αιτήματα που χρησιμοποιούνται
    // για τα γραφήματα και τον πρόσφατο πίνακα.
    const [reports, setReports] = useState([]);

    // Κατάσταση φόρτωσης αιτημάτων.
    const [loadingReports, setLoadingReports] =
        useState(true);

    // Σφάλμα φόρτωσης αιτημάτων.
    const [reportsError, setReportsError] =
        useState("");

    // Συνοπτικές κάρτες στατιστικών.
    const {
        cards,
        loadingCounts,
        countsError,
    } = useReportCountsCards({
        token,
        isAdmin: true,
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

    // Συνδέει τον πίνακα αιτημάτων
    // με το κοινό SidePanel.
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


    // Φορτώνει όλες τις αιτήματα του admin.
    useEffect(() => {
        const loadReports = async () => {
            if (!token) {
                setReports([]);
                setLoadingReports(false);
                setReportsError(
                    "Δεν βρέθηκε admin token."
                );
                return;
            }

            try {
                setLoadingReports(true);
                setReportsError("");

                const data = await fetchReports(token);

                setReports(
                    Array.isArray(data)
                        ? data
                        : []
                );
            } catch (error) {
                setReports([]);

                setReportsError(
                    error?.message ||
                    "Σφάλμα φόρτωσης αιτημάτων."
                );
            } finally {
                setLoadingReports(false);
            }
        };

        loadReports();
    }, [token]);

    // Latest Reports
    // Οι πέντε πιο πρόσφατες αιτήματα.
    const latestReports = reports.slice(0, 5);

    // Ενημερώνει την αίτημα στη λίστα μετά το edit
    // και επιστρέφει το SidePanel σε view mode.
    const handleUpdatedReport = (
        updatedReport
    ) => {
        if (!updatedReport?.id) {
            return;
        }

        let mergedReport = updatedReport;

        setReports((previousReports) =>
            previousReports.map((report) => {
                if (
                    String(report.id) !==
                    String(updatedReport.id)
                ) {
                    return report;
                }

                mergedReport = {
                    ...report,
                    ...updatedReport,
                };

                return mergedReport;
            })
        );

        openView(mergedReport);
    };

    // Η λίστα είναι κενή μετά
    // την ολοκλήρωση της φόρτωσης.
    const reportsAreEmpty =
        !loadingReports &&
        !reportsError &&
        reports.length === 0;

    return (
        <PagesLayout
            title="Στατιστικά"
            showSearch={false}
            showNotification={false}
        >
            <div
                className={`with-side-panel ${panelIsOpen
                    ? "has-panel"
                    : ""
                    }`}
                style={{
                    "--side-panel-width": "620px",
                }}
            >
                <div className="stats-page-container">
                    {countsError && (
                        <div className="alert alert-danger">{countsError}</div>
                    )}

                    {reportsError && (
                        <div className="alert alert-danger">{reportsError}</div>
                    )}

                    {/* Συνοπτικά στατιστικά. */}
                    <section className="stats-section-top">
                        <div className="stats-section-header">
                            <h3>
                                Σύνοψη Αιτημάτων
                            </h3>

                            <p>
                                Βασικά στατιστικά στοιχεία για τις αιτήματα της εφαρμογής.
                            </p>
                        </div>

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

                    {/* Κοινή κατάσταση φόρτωσης για τα δεδομένα των γραφημάτων. */}
                    <AppStatus
                        loading={loadingReports}
                        error={reportsError}
                        empty={reportsAreEmpty}
                        loadingMessage="Φόρτωση δεδομένων αιτημάτων..."
                        emptyMessage="Δεν υπάρχουν διαθέσιμα δεδομένα αιτημάτων."
                        center
                    />

                    {!loadingReports &&
                        !reportsError &&
                        reports.length > 0 && (
                            <>
                                {/* Γραφήματα χρόνου και κατηγοριών. */}
                                <section className="stats-section-middle">
                                    <div className="stats-over-time">
                                        <ReportsOverTime
                                            reports={reports}
                                        />
                                    </div>

                                    <div className="stats-by-category">
                                        <ReportsByCategory
                                            reports={reports}
                                        />
                                    </div>
                                </section>

                                {/* Γράφημα τοποθεσίας και πρόσφατες αιτήματα. */}
                                <section className="stats-section-bottom">
                                    <div className="stats-by-location">
                                        <ReportsByLocation
                                            reports={reports}
                                        />
                                    </div>

                                    <div className="stats-latest-reports">
                                        <div className="latest-reports-header">
                                            <h3>
                                                Πρόσφατες Αιτήματα
                                            </h3>

                                            <p>
                                                Οι τελευταίες αιτήματα που έχουν καταχωρηθεί στο σύστημα.
                                            </p>
                                        </div>

                                        <AdminReportsTable
                                            reports={latestReports}
                                            showId
                                            showUser
                                            showEdit
                                            limit={5}
                                            onView={
                                                handleViewReport
                                            }
                                            onEdit={
                                                handleEditReport
                                            }
                                        />
                                    </div>
                                </section>
                            </>
                        )}


                </div>

                {/* Προβολή και επεξεργασία αιτήματος. */}
                <ReportSidePanel
                    open={panelIsOpen}
                    mode={panelMode}
                    report={selectedReport}

                    allowEdit

                    showUser
                    showStatus

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
        </PagesLayout >

    );
};

export default Stats;