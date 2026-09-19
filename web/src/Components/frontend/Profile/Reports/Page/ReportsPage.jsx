//
//  Σελίδα διαχείρισης αιτημάτων του συνδεδεμένου χρήστη.
//
//  Αναλαμβάνει:
//  - την αναζήτηση και το φιλτράρισμα αιτημάτων
//  - τη διαχείριση του SidePanel
//  - την επιλογή αιτήματος για προβολή ή επεξεργασία
//
//  Η λίστα αιτημάτων διαχειρίζεται από το useUserReports.
//
//  Η δημιουργία, προβολή και επεξεργασία
//  διαχειρίζονται από το κοινό ReportSidePanel.
//

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

// Components
import DashHeader from "../../../../common/components/DashHeader/dash-header";
import AppStatus from "../../../../common/components/Alerts/AppStatus";
import ReportsFilter from "../../../../common/Reports/Filter/ReportsFilter";
import ReportSidePanel from "../../../../common/Reports/Details/ReportSidePanel";

import ReportsCards from "../ReportCards/ReportsCards";

// Hooks
import { useAuth } from "../../../../common/Auth/provider/AuthProvider";
import { useUserReports } from "../../../../common/Reports/hooks/useUserReports";
import { useReportsPanel } from "../../../../common/Reports/hooks/useReportsPanel";
import { useReportsPanelHandlers } from "../../../../common/Reports/hooks/useReportsPanelHandlers";

// CSS
import "../UserReport.css";

function ReportsPage() {
  // Token του συνδεδεμένου χρήστη.
  const { token } = useAuth();

  // Τιμή αναζήτησης αιτημάτων.
  const [searchValue, setSearchValue] =
    useState("");

  // Διαχείριση status φίλτρου μέσω query parameter.
  const [searchParams, setSearchParams] =
    useSearchParams();

  const statusFilter =
    searchParams.get("status") || "";

  // Διαχείριση της λίστας αιτημάτων.
  const {
    reports,
    loadingReports,
    reportsError,
    setReportsError,
    addReport,
    updateReportInList,
  } = useUserReports({
    token,
  });

  // State και modes του SidePanel.
  const {
    selectedReport,
    panelMode,
    panelIsOpen,

    openCreate,
    openView,
    openEdit,
    closePanel,
    cancelEdit,
  } = useReportsPanel();

  // Συνδέει τη λίστα αιτημάτων
  // με τις ενέργειες του SidePanel.
  const {
    handleCreateReport,
    handleViewReport,
    handleEditReport,
    handleClosePanel,
    handleCancelEdit,
  } = useReportsPanelHandlers({
    reports,
    setPageError: setReportsError,

    openCreate,
    openView,
    openEdit,
    closePanel,
    cancelEdit,
  });

  // Ενημερώνει ή αφαιρεί
  // το status query parameter.
  const handleStatusFilter = (status) => {
    if (status) {
      setSearchParams({ status });
      return;
    }

    setSearchParams({});
  };

  // Προσθέτει τη νέα αίτημα
  // και την εμφανίζει σε view mode.
  const handleCreatedReport = (newReport) => {
    if (!newReport?.id) {
      return;
    }

    addReport(newReport);
    openView(newReport);
  };

  // Ενημερώνει τη λίστα και επιστρέφει
  // στην προβολή της ενημερωμένης αιτήματος.
  const handleUpdatedReport = (
    updatedReport
  ) => {
    if (!updatedReport?.id) {
      return;
    }

    // Διατηρεί τυχόν nested δεδομένα
    // που δεν επέστρεψε το update request.
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

  // Κανονικοποιεί την τιμή αναζήτησης.
  const normalizedSearch = searchValue
    .trim()
    .toLocaleLowerCase("el-GR");

  // Φιλτράρει τις αιτήματα
  // βάσει status και αναζήτησης.
  const filteredReports = reports.filter(
    (report) => {
      const matchesStatus =
        !statusFilter ||
        report.status === statusFilter;

      const searchableContent = [
        report.title,
        report.description,
        report.address,
        report.city,
        report.category?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("el-GR");

      const matchesSearch =
        !normalizedSearch ||
        searchableContent.includes(
          normalizedSearch
        );

      return (
        matchesStatus &&
        matchesSearch
      );
    }
  );

  // Η λίστα είναι κενή μετά
  // την ολοκλήρωση της φόρτωσης.
  const reportsAreEmpty =
    !loadingReports &&
    !reportsError &&
    filteredReports.length === 0;

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
      <div className="user-reports-container">
        <DashHeader
          title="Τα γεγονότα μου"
          showSearch={false}
          searchPlaceholder="Αναζήτηση αιτήματος..."
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          showNotification={false}
        />

        {/* Κατάσταση φόρτωσης της λίστας. */}
        <AppStatus
          loading={loadingReports}
          error={reportsError}
          loadingMessage="Φόρτωση αιτημάτων..."
          center
        />

        {!loadingReports &&
          !reportsError && (
            <>
              <div className="user-reports-header">
                {/* Φίλτρα κατάστασης. */}
                <div className="reports-filter">
                  <ReportsFilter
                    statusFilter={
                      statusFilter
                    }
                    setStatusFilter={
                      handleStatusFilter
                    }
                  />
                </div>

                {/* Δημιουργία νέας αιτήματος. */}
                <div className="user-reports-actions">
                  <button
                    type="button"
                    className="btn-action btn-save"
                    onClick={
                      handleCreateReport
                    }
                  >
                    + Νέα Αίτημα
                  </button>
                </div>
              </div>

              {/* Κενή κατάσταση λίστας. */}
              <AppStatus
                empty={reportsAreEmpty}
                emptyMessage={
                  statusFilter ||
                    normalizedSearch
                    ? "Δεν υπάρχουν αιτήματα που να ταιριάζουν στα φίλτρα."
                    : "Δεν υπάρχουν αιτήματα."
                }
                center
              />

              {/* Κάρτες αιτημάτων. */}
              {filteredReports.length > 0 && (
                <ReportsCards
                  reports={
                    filteredReports
                  }
                  showId={false}
                  showUser={false}
                  showEdit
                  scrollAfter={5}
                  onView={
                    handleViewReport
                  }
                  onEdit={
                    handleEditReport
                  }
                />
              )}
            </>
          )}
      </div>

      {/* Δημιουργία, προβολή και επεξεργασία αιτήματος. */}
      <ReportSidePanel
        open={panelIsOpen}
        mode={panelMode}
        report={selectedReport}

        allowCreate
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
        onCreated={
          handleCreatedReport
        }
        onUpdated={
          handleUpdatedReport
        }
      />
    </div>
  );
}

export default ReportsPage;