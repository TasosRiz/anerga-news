

import { Link } from "react-router-dom";

// Components
import ReportStatusBadge from "../../../../common/Reports/ReportStatusBadge";
import ReportImage from "../../../../common/Reports/Image/ReportImage";
import AppStatus from "../../../../common/components/Alerts/AppStatus";

// Date
import { formatDate } from "../../../../common/components/Utils/formatDate";

// CSS
import "./ReportsCards.css";

//  Reusable component προβολής αιτημάτων σε cards.
//
//  Υποστηρίζει:
//  - προβολή εικόνας
//  - τίτλο, κατηγορία, ημερομηνία και τοποθεσία
//  - εμφάνιση κατάστασης αιτήματος
//  - προαιρετικά στοιχεία χρήστη
//  - προαιρετική επεξεργασία
//  - πλοήγηση μέσω routes
//  - προβολή μέσω SidePanel με onView
const ReportsCards = ({
  reports = [],
  basePath = "",
  showId = true,
  showUser = false,
  showEdit = true,
  limit = null,
  scrollAfter = null,
  onView,
  onEdit,
}) => {
  // Μετατρέπει το limit σε αριθμό,
  // όταν έχει δοθεί από το parent.
  const normalizedLimit =
    limit !== null
      ? Number(limit)
      : null;

  // Περιορίζει το πλήθος αιτημάτων που εμφανίζονται.
  const visibleReports = Number.isFinite(normalizedLimit)
    ? reports.slice(0, normalizedLimit)
    : reports;

  // Εμφανίζει μήνυμα όταν δεν υπάρχουν αιτήματα.
  if (visibleReports.length === 0) {
    return (
      <AppStatus
        info="Δεν υπάρχουν διαθέσιμες αιτήματα."
      />
    );
  }

  // Προσθέτει scroll όταν έχει δοθεί όριο
  // και οι αιτήματα το ξεπερνούν.
  const shouldScroll =
    scrollAfter !== null &&
    Number.isFinite(Number(scrollAfter)) &&
    visibleReports.length > Number(scrollAfter);

  const listClassName = `reports-list ${shouldScroll ? "scrollable-y" : ""
    }`;


  return (

    <div className="reports-container mt-4">
      <div className={listClassName}>
        {visibleReports.map((report) => {
          // Τίτλος που χρησιμοποιείται και ως alt εικόνας.
          const reportTitle =
            report.title || "Χωρίς τίτλο";

          // Testing
          // console.log("Report:", report);
          // console.log("Report photo:", report.photo);


          return (
            <article
              key={report.id}
              className="report-item"
            >
              {/* Εικόνα αιτήματος ή placeholder. */}
              <ReportImage
                photo={report.photo}
                alt={reportTitle}
                variant="card"
                showPlaceholder
              />



              {/* Βασικές πληροφορίες αιτήματος. */}
              <div className="report-main-section">
                <h4 className="report-title">
                  {reportTitle}
                </h4>

                <span className="report-category">
                  {report.category?.name ||
                    "Χωρίς κατηγορία"}
                </span>

                <div className="report-info-list">
                  <span className="report-date">
                    📅 {formatDate(report.created_at)}
                  </span>

                  <span className="report-location">
                    📍{" "}
                    {report.address ||
                      "Δεν έχει δοθεί τοποθεσία"}
                  </span>
                </div>

                {showId && (
                  <span className="report-code">
                    #CC-
                    {String(report.id).padStart(5, "0")}
                  </span>
                )}

                {showUser && report.user && (
                  <p className="report-user">
                    {report.user.name || "Χωρίς όνομα"}
                    {report.user.email
                      ? ` · ${report.user.email}`
                      : ""}
                  </p>
                )}
              </div>

              {/* Κατάσταση και actions αιτήματος. */}
              <div className="report-side-section">
                <ReportStatusBadge
                  status={report.status}
                />

                {onView ? (
                  <button
                    type="button"
                    className="btn-action btn-view"
                    onClick={() => onView?.(report.id)}
                    aria-label={`Προβολή αιτήματος ${reportTitle}`}
                  >
                    Προβολή
                  </button>
                ) : (
                  <Link
                    to={`${basePath}/${report.id}`}
                    className="btn-action btn-view"
                    aria-label={`Προβολή αιτήματος ${reportTitle}`}
                  >
                    Προβολή
                  </Link>
                )}

                {showEdit && (
                  onEdit ? (
                    <button
                      type="button"
                      className="btn-action btn-edit"
                      onClick={() => onEdit?.(report)}
                      aria-label={`Επεξεργασία αιτήματος ${reportTitle}`}
                    >
                      Επεξεργασία
                    </button>
                  ) : (
                    <Link
                      to={`${basePath}/${report.id}/edit`}
                      className="btn-action btn-edit"
                      aria-label={`Επεξεργασία αιτήματος ${reportTitle}`}
                    >
                      Επεξεργασία
                    </Link>
                  )
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ReportsCards;