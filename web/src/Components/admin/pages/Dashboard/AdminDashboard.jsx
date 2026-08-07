

import { useEffect, useState } from "react";

// Layout
import PagesLayout from "../pages-layout/pages-layout.jsx";

// Components
import AdminReportsTable from "../Reports/AdminReportsTable.jsx";
import ReportSidePanel from "../../../common/Reports/Details/ReportSidePanel.jsx";
import UserProfile from "../../../common/Users/UserProfile/UserProfile.jsx";

// API
import { fetchReports } from "../../../common/Reports/api/reports.js";

// Hooks
import { useAuth } from "../../../common/Auth/provider/AuthProvider.jsx";
import { useReportsPanel } from "../../../common/Reports/hooks/useReportsPanel.jsx";
import { useReportsPanelHandlers } from "../../../common/Reports/hooks/useReportsPanelHandlers.jsx";

// CSS
import "./AdminDashboard.css";

//  Κεντρικό dashboard του admin.
//
//  Εμφανίζει:
//  - τις πιο πρόσφατες νέες αιτήματα
//  - τα στοιχεία του συνδεδεμένου admin
//  - προβολή και επεξεργασία αιτήματος σε SidePanel
const AdminDashboard = () => {
  // Token και στοιχεία του συνδεδεμένου admin.
  const { token, user } = useAuth();

  // Λίστα όλων των αιτημάτων.
  const [reports, setReports] = useState([]);

  // Κατάσταση φόρτωσης αιτημάτων.
  const [loadingReports, setLoadingReports] =
    useState(true);

  // Σφάλμα φόρτωσης ή επιλογής αιτήματος.
  const [reportsError, setReportsError] =
    useState("");

  // State και modes του κοινού ReportSidePanel.
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
  // με τις ενέργειες του SidePanel.
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

  // Φορτώνει τις αιτήματα του admin.
  useEffect(() => {
    const loadReports = async () => {
      if (!token) {
        setReports([]);
        setLoadingReports(false);
        return;
      }

      try {
        setLoadingReports(true);
        setReportsError("");

        const data =
          await fetchReports(token);

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

  // Ενημερώνει τη λίστα μετά από edit
  // και επιστρέφει σε view mode.
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

  // Κρατά μόνο τις πέντε πρώτες νέες αιτήματα.
  const newReports = reports
    .filter(
      (report) =>
        report.status === "new"
    )
    .slice(0, 5);

  return (
    <PagesLayout
      title="Πίνακας Ελέγχου"
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
        <div className="admin-dashboard-container">
          <div className="dashboard-bottom">
            <div className="left-section">
              <h3>Νέες Αιτήματα</h3>

              {reportsError && (
                <div className="alert alert-danger">
                  {reportsError}
                </div>
              )}

              {loadingReports ? (
                <p>Loading...</p>
              ) : (
                <AdminReportsTable
                  reports={newReports}
                  showId
                  showUser
                  showEdit
                  onView={
                    handleViewReport
                  }
                  onEdit={
                    handleEditReport
                  }
                />
              )}
            </div>

            <div className="right-section box">
              <UserProfile
                user={user}
                subtitle="Admin"
              />
            </div>
          </div>
        </div>

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
};

export default AdminDashboard;