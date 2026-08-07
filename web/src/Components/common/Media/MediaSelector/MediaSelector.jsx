import { useMemo, useRef, useState } from "react";

// API
import { getImageUrl, uploadMedia } from "../api/MediaApi";
import "./MediaSelector.css";

// Toolbar
import MediaUploadBar from "../UploadBar/MediaUploadBar";
import { useAuth } from "../../Auth/provider/AuthProvider";
import ShowImage from "../ShowImage/ShowImage";

// Component επιλογής εικόνας από τη Media Library.

// Επιτρέπει:
// - φιλτράρισμα εικόνων ανά φάκελο
// - επιλογή υπάρχουσας εικόνας
// - upload νέας εικόνας


const MediaSelector = ({
    media = [],
    folders = [],
    uploadOnly = false,
    targetFolderSlug = "general",
    onSelect,
    onClose,
    onUploaded,
}) => {
    // Παίρνει το token από τον AuthProvider.
    const { token } = useAuth();

    // Φάκελος που χρησιμοποιείται για το φιλτράρισμα των εικόνων.
    const [selectedFolderId, setSelectedFolderId] = useState("all");

    // Αρχείο που έχει επιλεγεί για upload.
    const [selectedFile, setSelectedFile] = useState(null);

    // Καταστάσεις upload.
    const [uploading, setUploading] = useState(false);

    // Μήνυμα σφάλματος upload.
    const [uploadError, setUploadError] =
        useState("")

    // Αίτημα στο input αρχείου.
    // Χρησιμοποιείται για τον καθαρισμό του μετά το upload.
    const fileInputRef = useRef(null);

    // Αν έχει επιλεγεί "all", εμφανίζονται όλες οι εικόνες.
    const filteredMedia = useMemo(() => {
        if (selectedFolderId === "all") return media;

        return media.filter(
            (item) =>
                String(item.media_folder_id || "") ===
                String(selectedFolderId)
        );
    }, [media, selectedFolderId]);



    // Ανεβάζει το επιλεγμένο αρχείο στη Media Library.
    // Αν δεν έχει επιλεγεί συγκεκριμένος φάκελος,
    //   χρησιμοποιείται ο φάκελος general.
    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadError("Επίλεξε πρώτα μία εικόνα.");
            return;
        }

        if (!token) {
            setUploadError(
                "Δεν υπάρχει ενεργή σύνδεση χρήστη."
            );
            return;
        }

        const targetFolder = folders.find(
            (folder) =>
                folder.slug === targetFolderSlug
        );

        if (!targetFolder?.id) {
            setUploadError(
                `Δεν βρέθηκε ο φάκελος ${targetFolderSlug}.`
            );
            return;
        }

        try {
            setUploading(true);
            setUploadError("");

            const uploadFolderId = uploadOnly
                ? targetFolder.id
                : selectedFolderId !== "all"
                    ? selectedFolderId
                    : targetFolder.id;

            const uploadedMedia = await uploadMedia(
                token,
                selectedFile,
                uploadFolderId
            );

            setSelectedFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            onUploaded?.(uploadedMedia);
        } catch (error) {
            setUploadError(
                error?.message ||
                "Παρουσιάστηκε σφάλμα κατά το ανέβασμα της εικόνας."
            );
        } finally {
            setUploading(false);
        }
    };

    //Αναλογως τις διαστασεις
    const getImageOrientation = (e) => {
        const img = e.currentTarget;

        if (img.naturalWidth > img.naturalHeight) {
            img.classList.add("is-landscape");
        } else if (img.naturalHeight > img.naturalWidth) {
            img.classList.add("is-portrait");
        } else {
            img.classList.add("is-square");
        }
    };

    return (
        <div className="media-selector-wrapper">
            {/* Header και button κλεισίματος. */}
            <div className="media-selector-header">
                <h3>
                    {uploadOnly
                        ? "Ανέβασμα φωτογραφίας"
                        : "Επιλογή φωτογραφίας"}
                </h3>

                {!uploadOnly && (
                    <p>
                        {filteredMedia.length} διαθέσιμες εικόνες
                    </p>
                )}

                <button
                    type="button"
                    className="close-media-btn"
                    onClick={() => onClose?.()}
                >
                    Κλείσιμο
                </button>
            </div>



            {/* Φίλτρο φακέλων μόνο στη Media Library. */}
            {!uploadOnly && (
                <div className="media-selector-filter">
                    <label htmlFor="media-folder-filter">
                        Φάκελος
                    </label>

                    <select
                        id="media-folder-filter"
                        value={selectedFolderId}
                        onChange={(event) =>
                            setSelectedFolderId(
                                event.target.value
                            )
                        }
                    >
                        <option value="all">
                            Όλοι οι φάκελοι
                        </option>

                        {folders.map((folder) => (
                            <option
                                key={folder.id}
                                value={String(folder.id)}
                            >
                                {folder.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Επιλογή αρχείου και upload νέας εικόνας. */}
            <MediaUploadBar
                inputId="media-selector-file-input"
                fileInputRef={fileInputRef}
                selectedFile={selectedFile}
                uploading={uploading}
                onFileChange={(event) =>
                    setSelectedFile(
                        event.target.files?.[0] || null
                    )
                }
                onUpload={handleUpload}
                chooseLabel="Νέα εικόνα"
                uploadLabel="Upload"
                size="sm"
            />

            {/* Μήνυμα σφάλματος upload. */}
            {uploadError && (
                <div
                    className="media-selector-error"
                    role="alert"
                >
                    {uploadError}
                </div>
            )}

            {/* Λίστα διαθέσιμων εικόνων. */} {/* Υπάρχουσες εικόνες μόνο όταν δεν είναι upload-only. */}
            {!uploadOnly && (
                <div className="media-selector-grid">
                    {filteredMedia.length > 0 ? (
                        filteredMedia.map((item) => (
                            <button
                                type="button"
                                key={item.id}
                                className="media-selector-item"
                                onClick={() => onSelect?.(item.path)}
                                aria-label={`Επιλογή εικόνας ${item.file_name || ""
                                    }`}
                            >
                                <ShowImage
                                    src={item.path}
                                    alt={
                                        item.file_name ||
                                        "Εικόνα Media Library"
                                    }
                                    type="media"
                                    variant="thumb"
                                    showPlaceholder
                                    className="media-selector-image"
                                />

                                <p>
                                    {item.file_name || "Χωρίς όνομα"}
                                </p>
                            </button>
                        ))
                    ) : (
                        <p className="media-selector-empty">
                            Δεν υπάρχουν εικόνες σε αυτόν τον φάκελο.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MediaSelector;