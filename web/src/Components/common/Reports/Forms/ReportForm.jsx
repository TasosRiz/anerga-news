import { Link } from "react-router-dom";

// Map
import MapPicker from "../../components/Map/MapPicker";
import "leaflet/dist/leaflet.css";


// Config-Status
import { reportStatusOptions } from "../../constants/statusConfig";

// Image
import ReportImage from "../Image/ReportImage";

// Token
import { useAuth } from "../../Auth/provider/AuthProvider";

// Media
import MediaSelector from "../../Media/MediaSelector/MediaSelector";
import { useMediaSelector } from "../../Media/hooks/MediaSelector/useMediaSelector";

// CSS
import "./ReportForm.css";
import AppStatus from "../../components/Alerts/AppStatus";

// Επαναχρησιμοποιήσιμη φόρμα δημιουργίας και επεξεργασίας αιτήματος.
// Υποστηρίζει:
// - βασικά στοιχεία αιτήματος
// - κατηγορία και κατάσταση
// - στοιχεία διεύθυνσης
// - επιλογή τοποθεσίας στον χάρτη
// - επιλογή ή upload εικόνας μέσω της Media Library
const ReportForm = ({
    title = "",
    setTitle,

    description = "",
    setDescription,

    // Location
    address = "",
    setAddress,
    city = "",
    setCity,
    postalCode = "",
    setPostalCode,
    onAddressSearch,

    // Category
    category = "",
    setCategory,
    categories = [],
    showCategory = false,
    categoriesLoading = false,

    // Map
    latitude = "",
    setLatitude,
    longitude = "",
    setLongitude,
    showMap = true,

    // Photo
    currentPhoto = "",
    photo = "",
    setPhoto,
    showPhoto = false,

    // Όταν είναι true, εμφανίζεται μόνο upload εικόνας
    // χωρίς folders και υπάρχουσες εικόνες.
    mediaUploadOnly = true,
    mediaFolderSlug = "reports", //Folder

    // Status
    status = "",
    setStatus,
    showStatus = false,

    // Form state
    loading = false,
    error = "",

    // Actions
    backPath = "",
    onCancel,
    submitText = "Αποθήκευση",
    loadingText = "Αποθήκευση...",
    onSubmit,


}) => {
    // Παίρνει το token από τον AuthProvider.
    const { token } = useAuth();

    // Διαχειρίζεται τη φόρτωση της Media Library,
    // την επιλογή εικόνας και το αποτέλεσμα του upload.
    const {
        media,
        folders,
        loadingMedia,
        mediaError,
        showMediaSelector,
        openMediaSelector,
        closeMediaSelector,
        selectMedia,
        handleUploadedMedia,
    } = useMediaSelector({
        token,

        // Η επιλεγμένη εικόνα αποθηκεύεται
        // στη φόρμα ως string path.
        onSelect: setPhoto,
    });

    // Η νέα επιλογή εικόνας έχει προτεραιότητα
    // έναντι της ήδη αποθηκευμένης εικόνας.
    const displayedPhoto = photo || currentPhoto;

    // Όλες οι φωτογραφίες reports προέρχονται
    // από τη Media Library.
    const displayedPhotoType = "media";

    // Αφαιρεί μόνο τη νέα επιλογή.
    // Στο edit επανεμφανίζεται η υπάρχουσα εικόνα.
    const handleRemoveSelectedPhoto = () => {
        setPhoto?.("");
    };

    return (
        <div className="report-card">
            <AppStatus
                error={error}
                center={false}
            />

            <div className="report-layout">
                <div className="report-main">
                    <form
                        onSubmit={onSubmit}
                        className="report-form"
                        noValidate
                    >
                        {/* Επιλογή ή upload φωτογραφίας αιτήματος. */}
                        {showPhoto && (
                            <div className="form-group">
                                <label>Φωτογραφία</label>

                                <ReportImage
                                    photo={displayedPhoto}
                                    type={displayedPhotoType}
                                    alt={
                                        title ||
                                        "Προεπισκόπηση αιτήματος"
                                    }
                                    variant="preview"
                                    showPlaceholder
                                />

                                <div className="report-form-image-actions">
                                    <button
                                        type="button"
                                        onClick={openMediaSelector}
                                        disabled={loadingMedia}
                                    >
                                        {loadingMedia
                                            ? "Φόρτωση εικόνων..."
                                            : "Επιλογή εικόνας"}
                                    </button>

                                    {photo && (
                                        <button
                                            type="button"
                                            onClick={
                                                handleRemoveSelectedPhoto
                                            }
                                        >
                                            Αφαίρεση επιλογής
                                        </button>
                                    )}
                                </div>

                                {/* Σφάλμα φόρτωσης ή upload εικόνας. */}
                                <AppStatus
                                    error={mediaError}
                                    center={false}
                                />

                                {/* Media selector για upload ή επιλογή εικόνας. */}
                                {showMediaSelector && (
                                    <MediaSelector
                                        media={media}
                                        folders={folders}
                                        uploadOnly={mediaUploadOnly}
                                        targetFolderSlug={mediaFolderSlug}
                                        onSelect={selectMedia}
                                        onUploaded={handleUploadedMedia}
                                        onClose={closeMediaSelector}
                                    />
                                )}
                            </div>
                        )}

                        {/* Επιλογή κατηγορίας αιτήματος. */}
                        {showCategory && (
                            <div className="form-group">
                                <label htmlFor="report-category">
                                    Κατηγορία
                                </label>

                                <select
                                    id="report-category"
                                    value={category}
                                    onChange={(event) =>
                                        setCategory(
                                            event.target.value
                                        )
                                    }
                                    disabled={categoriesLoading}
                                    required
                                >
                                    <option value="">
                                        {categoriesLoading
                                            ? "Φόρτωση κατηγοριών..."
                                            : "Επίλεξε κατηγορία"}
                                    </option>

                                    {categories.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}


                        {/* Τίτλος αιτήματος. */}
                        <div className="form-group">
                            <label htmlFor="report-title">
                                Τίτλος
                            </label>

                            <input
                                id="report-title"
                                type="text"
                                value={title}
                                onChange={(event) =>
                                    setTitle(
                                        event.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        {/* Στοιχεία διεύθυνσης. */}
                        <div className="form-group location-container">
                            <div className="address-details-row">
                                <label htmlFor="report-address">
                                    Οδός και αριθμός
                                </label>

                                <input
                                    id="report-address"
                                    type="text"
                                    value={address}
                                    onChange={(event) =>
                                        setAddress(
                                            event.target.value
                                        )
                                    }
                                    placeholder="π.χ. Σταδίου 15"
                                    required
                                />
                            </div>

                            <div className="address-details-row">
                                <label htmlFor="report-city">
                                    Πόλη
                                </label>

                                <input
                                    id="report-city"
                                    type="text"
                                    value={city}
                                    onChange={(event) =>
                                        setCity(
                                            event.target.value
                                        )
                                    }
                                    placeholder="π.χ. Αθήνα"
                                    required
                                />
                            </div>

                            <div className="address-details-row">
                                <label htmlFor="report-postal-code">
                                    Τ.Κ.
                                </label>

                                <input
                                    id="report-postal-code"
                                    type="text"
                                    value={postalCode}
                                    onChange={(event) => {
                                        // Κρατά μόνο αριθμούς
                                        // και μορφοποιεί τον Τ.Κ. ως 123 45.
                                        const digits =
                                            event.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 5);

                                        const formatted =
                                            digits.length > 3
                                                ? `${digits.slice(
                                                    0,
                                                    3
                                                )} ${digits.slice(3)}`
                                                : digits;

                                        setPostalCode(formatted);
                                    }}
                                    placeholder="π.χ. 422 00"
                                    inputMode="numeric"
                                    pattern="[0-9]{3}\s?[0-9]{2}"
                                    maxLength={6}
                                    required
                                />
                            </div>
                        </div>

                        {/* Αναζητά τη διεύθυνση και ενημερώνει τον χάρτη. */}
                        <button
                            type="button"
                            className="location-search-button"
                            onClick={onAddressSearch}
                            disabled={loading}
                        >
                            Εύρεση στον χάρτη
                        </button>

                        {/* Περιγραφή αιτήματος. */}
                        <div className="form-group">
                            <label htmlFor="report-description">
                                Περιγραφή
                            </label>

                            <textarea
                                id="report-description"
                                className="desc-input"
                                value={description}
                                onChange={(event) =>
                                    setDescription(
                                        event.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        {/* Αλλαγή κατάστασης μόνο όπου επιτρέπεται. */}
                        {showStatus && (
                            <div className="form-group">
                                <label htmlFor="report-status">
                                    Κατάσταση
                                </label>

                                <select
                                    id="report-status"
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(
                                            event.target.value
                                        )
                                    }
                                    required
                                >
                                    <option value="">
                                        Επίλεξε κατάσταση
                                    </option>

                                    {reportStatusOptions.map(
                                        (option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        )}


                        {/* Ενέργειες ακύρωσης και αποθήκευσης. */}
                        <div className="form-actions">
                            {onCancel ? (
                                <button
                                    type="button"
                                    className="back-button"
                                    onClick={onCancel}
                                    disabled={loading}
                                >
                                    Ακύρωση
                                </button>
                            ) : (
                                <Link
                                    to={backPath}
                                    className="back-button"
                                >
                                    Πίσω
                                </Link>
                            )}

                            <button
                                type="submit"
                                className="btn primary"
                                disabled={
                                    loading ||
                                    categoriesLoading ||
                                    loadingMedia
                                }
                            >
                                {loading
                                    ? loadingText
                                    : submitText}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Χάρτης επιλογής τοποθεσίας. */}
                {showMap && (
                    <aside className="report-side">
                        <span className="report-label">
                            Τοποθεσία
                        </span>

                        <div className="report-map-card">
                            <MapPicker
                                lat={latitude}
                                lng={longitude}
                                setLat={setLatitude}
                                setLng={setLongitude}
                                setAddress={setAddress}
                                setCity={setCity}
                                setPostalCode={setPostalCode}
                            />
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
};

export default ReportForm;