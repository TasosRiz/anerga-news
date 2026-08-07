// Components
import ReportStatusBadge from "../ReportStatusBadge"; //Status
import ReportViewMap from "../../components/Map/ViewMap"; //Map
import ReportImage from "../Image/ReportImage"; //Image

// Css
import './ReportDetailsLayout.css'

//  Το component δέχεται ένα report object και εμφανίζει οργανωμένα:
//  - τίτλο αιτήματος
//  - κατηγορία
//  - κατάσταση
//  - ημερομηνία δημιουργίας
//  - περιγραφή
//  - φωτογραφία αιτήματος
//  - τοποθεσία στον χάρτη
//  - γεωγραφικές συντεταγμένες
//
//  Μέσω των props μπορεί να χρησιμοποιηθεί τόσο στο user περιβάλλον
//  όσο και στο admin panel:
//  - showUser: εμφάνιση στοιχείων χρήστη

const ReportDetailsLayout = ({
    report,
    showUser = false,
}) => {
    // Αν δεν υπάρχει report, δεν εμφανίζεται το layout.
    if (!report) {
        return null;
    }

    // Ελέγχει αν υπάρχουν έγκυρες συντεταγμένες.
    // Ο έλεγχος δεν βασίζεται σε truthy τιμές,
    // επειδή το 0 μπορεί να είναι έγκυρη συντεταγμένη.
    // const hasCoordinates =
    //     report.lat !== null &&
    //     report.lat !== undefined &&
    //     report.lng !== null &&
    //     report.lng !== undefined;


    return (


        <div className="report-page">
            <div className="report-card">
                <div className="report-layout">
                    <div className="report-main">

                        {/* Τίτλος αιτήματος. */}
                        <div className="report-section">
                            <span className="report-label">Τίτλος</span>
                            <h2 className="report-title">{report.title}</h2>
                        </div>

                        {/* Βασικά στοιχεία αιτήματος. */}
                        <div className="report-meta-grid ">
                            <div className="report-meta-item">
                                <span className="report-label">Κατηγορία</span>
                                <p>{report.category?.name || "— χωρίς κατηγορία —"}</p>
                            </div>

                            {/* Status */}
                            <div className="report-meta-item">
                                <span className="report-label">Κατάσταση</span>
                                <ReportStatusBadge status={report.status} />
                            </div>

                            {/* Date */}
                            <div className="report-meta-item">
                                <span className="report-label">Ημερομηνία</span>
                                <p>{new Date(report.created_at).toLocaleDateString("el-GR")}</p>
                            </div>
                        </div>

                        {/* Προαιρετική εμφάνιση στοιχείων χρήστη για admin προβολή */}
                        {showUser && (
                            <div className="report-meta-grid cols-2">
                                <div className="report-meta-item">
                                    <span className="report-label">Χρήστης</span>
                                    <p>{report.user?.name || "— άγνωστος χρήστης —"}</p>
                                </div>

                                <div className="report-meta-item">
                                    <span className="report-label">Email</span>
                                    <p>{report.user?.email || "—"}</p>
                                </div>
                            </div>
                        )}


                        {/* Περιγραφή αιτήματος. */}
                        <div className="report-section">
                            <span className="report-label">Περιγραφή</span>
                            <p className="report-desc-text">
                                {report.description || "— χωρίς περιγραφή —"}
                            </p>
                        </div>

                        {/* Φωτογραφία αιτήματος από τη Media Library. */}
                        <div className="report-section">
                            <span className="report-label ">Φωτογραφία</span>

                            <ReportImage
                                photo={report.photo}
                                type="media"
                                alt={report.title || "Φωτογραφία αιτήματος"}
                                variant="hero"
                                showPlaceholder
                            />
                        </div>
                    </div>

                    {/* Τοποθεσία αιτήματος και χάρτης. */}
                    <aside className="report-side">
                        <span className="report-label">Τοποθεσία</span>

                        <div className="report-map-card">
                            {report.lat && report.lng ? (
                                <ReportViewMap lat={report.lat} lng={report.lng} />
                            ) : (
                                <p>Δεν υπάρχει τοποθεσία</p>
                            )}
                        </div>

                        {/* Εμφανίζει τις συντεταγμένες μόνο όταν υπάρχουν. */}
                        {/* {hasCoordinates && (
                            <div className="report-coordinates">
                                <p>Lat: {report.lat}</p>
                                <p>Lng: {report.lng}</p>
                            </div>
                        )} */}
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ReportDetailsLayout;