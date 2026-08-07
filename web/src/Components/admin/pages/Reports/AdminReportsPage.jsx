import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Layout
import PagesLayout from "../pages-layout/pages-layout";

// Components
import AppStatus from "../../../common/components/Alerts/AppStatus";
import Card from "../../../common/components/Card/Card";
import ReportsFilter from "../../../common/Reports/Filter/ReportsFilter";
import AdminReportsTable from "./AdminReportsTable";
import ReportSidePanel from "../../../common/Reports/Details/ReportSidePanel";

// API
import { fetchReports } from "../../../common/Reports/api/reports";

// Hooks
import { useAuth } from "../../../common/Auth/provider/AuthProvider";
import { useReportCountsCards } from "../../../common/Reports/hooks/userReportCountsCards";
import { useReportsPanel } from "../../../common/Reports/hooks/useReportsPanel";
import { useReportsPanelHandlers } from "../../../common/Reports/hooks/useReportsPanelHandlers";

// CSS
import "./AdminReportsPage.css";
import { useDeleteReport } from "../../../common/Reports/hooks/useDeleteReport";

// Confirm
import ConfirmDialog from "../../../common/components/ConfirmDialog/ConfirmDialog";



//  Σελίδα διαχείρισης αιτημάτων από την πλευρά του admin.
//
//  Αναλαμβάνει:
//  - τη φόρτωση όλων των αιτημάτων
//  - την εμφάνιση στατιστικών
//  - το φιλτράρισμα ανά κατάσταση
//  - την επιλογή αιτήματος
//  - την ενημέρωση της λίστας μετά από edit
//
//  Η προβολή και η επεξεργασία της επιλεγμένης αιτήματος
//  διαχειρίζονται από το ReportSidePanel.
//

function AdminReportsPage() {
  // Token του συνδεδεμένου admin.
  const { token } = useAuth();

  // Λίστα όλων των αιτημάτων.
  const [reports, setReports] = useState([]);

  // Κατάσταση φόρτωσης αιτημάτων.
  const [loading, setLoading] = useState(true);

  // Σφάλμα φόρτωσης της σελίδας.
  const [error, setError] = useState("");

  // Φίλτρο κατάστασης μέσω query parameter.
  const [searchParams, setSearchParams] =
    useSearchParams();

  const statusFilter =
    searchParams.get("status") || "";

  // State και modes του SidePanel.
  const {
    selectedReport,
    panelMode,
    panelIsOpen,

    openView,
    openEdit,
    closePanel,
    cancelEdit,
  } = useReportsPanel();

  // Συνδέει τη λίστα αιτημάτων
  // με τις ενέργειες του SidePanel.
  const {
    handleViewReport,
    handleEditReport,
    handleClosePanel,
    handleCancelEdit,
  } = useReportsPanelHandlers({
    reports,
    setPageError: setError,

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
    isAdmin: true,
  });

  // Delete Report
  const {
    reportToDelete,
    deletingReport,
    openDeleteConfirm,
    cancelDelete,
    confirmDelete,
  } = useDeleteReport({
    token,

    onDeleted: (id) => {
      setReports((previousReports) =>
        previousReports.filter(
          (report) => report.id !== id
        )
      );

      if (selectedReport?.id === id) {
        handleClosePanel();
      }
    },

    onError: setError,
  });

  // Φορτώνει όλες τις αιτήματα χρηστών.
  const loadReports = async () => {
    if (!token) {
      setReports([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await fetchReports(token);

      setReports(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      setReports([]);

      setError(
        err?.message ||
        "Σφάλμα φόρτωσης αιτημάτων."
      );
    } finally {
      setLoading(false);
    }
  };

  // Φορτώνει τις αιτήματα όταν υπάρχει token.
  useEffect(() => {
    loadReports();
  }, [token]);

  // Ενημερώνει το status query parameter.
  const handleStatusFilter = (status) => {
    if (status) {
      setSearchParams({ status });
      return;
    }

    setSearchParams({});
  };

  // Ενημερώνει τη λίστα και το επιλεγμένο report
  // μετά από επιτυχημένη αποθήκευση στο SidePanel.
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

    setReports((previousReports) =>
      previousReports.map((report) =>
        String(report.id) ===
          String(mergedReport.id)
          ? mergedReport
          : report
      )
    );

    openView(mergedReport);
  };

  // Φιλτράρει τις αιτήματα βάσει κατάστασης.
  const filteredReports = statusFilter
    ? reports.filter(
      (report) =>
        report.status === statusFilter
    )
    : reports;

  const hasReports =
    !loading &&
    !error &&
    filteredReports.length > 0;

  const reportsAreEmpty =
    !loading &&
    !error &&
    filteredReports.length === 0;

  return (
    <PagesLayout
      title="Αιτήματα Χρηστών"
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
        <div className="admin-reports-container">
          {/* Φόρτωση και σφάλμα κύριας λίστας. */}
          <AppStatus
            loading={loading}
            error={error}
            loadingMessage="Φόρτωση αιτημάτων..."
            center
          />

          {/* Στατιστικές κάρτες. */}
          {!loading && !error && (
            <div className="reports-header">
              <AppStatus
                loading={loadingCounts}
                error={countsError}
                loadingMessage="Φόρτωση στατιστικών..."
                center
              />

              {!loadingCounts &&
                !countsError &&
                cards.length > 0 && (
                  <Card items={cards} />
                )}
            </div>
          )}

          {/* Φίλτρα κατάστασης. */}
          {!loading && !error && (
            <div className="admin-reports-toolbar">
              <ReportsFilter
                statusFilter={
                  statusFilter
                }
                setStatusFilter={
                  handleStatusFilter
                }
              />
            </div>
          )}

          {/* Κενή κατάσταση. */}
          <AppStatus
            empty={reportsAreEmpty}
            emptyMessage={
              statusFilter
                ? "Δεν υπάρχουν αιτήματα με αυτή την κατάσταση."
                : "Δεν υπάρχουν αιτήματα."
            }
            center
          />

          {/* Πίνακας αιτημάτων. */}
          {hasReports && (
            <AdminReportsTable
              reports={filteredReports}
              showId
              showUser

              showEdit
              onEdit={handleEditReport}

              showDelete
              onDelete={openDeleteConfirm}


              onView={handleViewReport}
              onDelete={openDeleteConfirm}
            />
          )}
        </div>

        <ConfirmDialog
          open={reportToDelete !== null}
          title="Διαγραφή Αιτήματος"
          message="Θέλεις σίγουρα να διαγράψεις αυτή την αίτημα;"
          confirmText="Διαγραφή"
          loading={deletingReport}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />

        {/* Προβολή και επεξεργασία αιτήματος. */}
        <ReportSidePanel
          open={panelIsOpen}
          mode={panelMode}
          report={selectedReport}

          allowEdit

          showUser
          showStatus

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
    </PagesLayout>
  );
}

export default AdminReportsPage;