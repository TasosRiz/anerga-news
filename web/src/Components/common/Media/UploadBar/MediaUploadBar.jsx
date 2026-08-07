import "./MediaUploadBar.css";

// Κοινό component επιλογής και upload εικόνας.

// Εμφανίζει:
// - file input
// - όνομα επιλεγμένου αρχείου
// - button επιλογής εικόνας
// - button upload
// - κατάσταση φόρτωσης
const MediaUploadBar = ({
    fileInputRef,
    selectedFile,
    uploading = false,
    onFileChange,
    onUpload,
    inputId = "media-file-input",
    chooseLabel = "Επιλογή εικόνας",
    uploadLabel = "Upload Image",
    uploadingLabel = "Uploading...",
    size = "md",
}) => {
    return (
        <div className="media-upload-bar">
            {/* Επιλογή εικόνας από τη συσκευή. */}
            <div className="media-file-picker">
                <input
                    ref={fileInputRef}
                    type="file"
                    id={inputId}
                    onChange={onFileChange}
                    className="media-input"
                    accept="image/*"
                />

                <label
                    htmlFor={inputId}
                    className={`btn-action btn-back btn-${size}`}
                >
                    {chooseLabel}
                </label>

                {/* Εμφανίζει το όνομα του επιλεγμένου αρχείου. */}
                <span className="media-selected-file">
                    {selectedFile
                        ? selectedFile.name
                        : "Δεν επιλέχθηκε αρχείο"}
                </span>
            </div>


            {/* Εκτελεί το upload της επιλεγμένης εικόνας. */}
            <button
                type="button"
                onClick={onUpload}
                className={`btn-action btn-save btn-${size} media-upload-btn`}
                disabled={uploading || !selectedFile}
            >
                {uploading ? uploadingLabel : uploadLabel}
            </button>
        </div>
    );
};

export default MediaUploadBar;