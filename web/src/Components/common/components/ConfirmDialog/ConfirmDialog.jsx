import "./ConfirmDialog.css";

// Κοινό modal επιβεβαίωσης ενεργειών.
//
// Χρησιμοποιείται κυρίως πριν από διαγραφές
// ή άλλες ενέργειες που χρειάζονται επιβεβαίωση.
//
// Υποστηρίζει:
// - custom τίτλο και μήνυμα
// - custom κείμενο confirm / cancel buttons
// - loading state
// - callbacks για confirm και cancel

const ConfirmDialog = ({
    open = false,
    title = "Επιβεβαίωση",
    message = "",
    confirmText = "Επιβεβαίωση",
    cancelText = "Ακύρωση",
    loadingText = "Παρακαλώ περιμένετε...",
    loading = false,
    onConfirm,
    onCancel,
}) => {
    if (!open) return null;

    return (
        <div className="confirm-dialog-overlay">
            <div className="confirm-dialog">
                <h3>{title}</h3>

                {message && (
                    <p>{message}</p>
                )}

                <div className="confirm-dialog-actions">
                    <button
                        type="button"
                        className="btn-action btn-back"
                        onClick={() => onCancel?.()}
                        disabled={loading}
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        className="btn-action btn-delete"
                        onClick={() => onConfirm?.()}
                        disabled={loading}
                    >
                        {loading
                            ? loadingText
                            : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;