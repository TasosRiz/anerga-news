import { BiFolder, BiFolderPlus } from "react-icons/bi";
import "./MediaFolders.css";

// Reusable component φακέλων για τη Media Library.

// Εμφανίζει τους διαθέσιμους φακέλους εικόνων και επιτρέπει:
// - επιλογή ενεργού φακέλου
// - δημιουργία νέου φακέλου
// - μετονομασία φακέλου
// - διαγραφή άδειου φακέλου

// Το component δεν πραγματοποιεί API requests
// και δεν διαχειρίζεται δικό του state.

// Τα δεδομένα και οι functions διαχείρισης
// παρέχονται από το useMediaLibrary hook μέσω του Media.jsx.

// Δεν επιτρέπεται η διαγραφή φακέλου που περιέχει εικόνες.
// Το frontend απενεργοποιεί το κουμπί διαγραφής,
// αλλά ο τελικός έλεγχος πραγματοποιείται και στο Laravel backend.

const MediaFolders = ({
    folders = [],
    activeFolderId = "all",
    onSelectFolder,
    onCreateFolder,
    onRenameFolder,
    onDeleteFolder,
}) => {
    // Υπολογίζει το συνολικό πλήθος εικόνων
    // που υπάρχουν σε όλους τους φακέλους.
    const totalCount = folders.reduce(
        (sum, folder) => sum + Number(folder.media_count || 0),
        0
    );

    return (
        <div className="media-folders ">
            {/* Επιλογή προβολής όλων των εικόνων. */}
            <button
                type="button"
                className={`media-folder-card ${activeFolderId === "all"
                    ? "active"
                    : ""
                    }`}
                onClick={() => onSelectFolder("all")}
            >
                <span className="media-folder-icon">
                    <BiFolder />
                </span>

                <span className="media-folder-info">
                    <strong>Όλα</strong>
                    <small>{totalCount} αρχεία</small>
                </span>
            </button>

            {/* Εμφανίζει έναν φάκελο για κάθε εγγραφή του backend. */}
            {folders.map((folder) => {
                // Πλήθος εικόνων του συγκεκριμένου φακέλου.
                const mediaCount = Number(
                    folder.media_count || 0
                );

                // Ελέγχει αν ο φάκελος είναι ενεργός.
                const isActive =
                    String(activeFolderId) ===
                    String(folder.id);

                // Επιτρέπεται διαγραφή μόνο όταν
                // ο φάκελος δεν περιέχει εικόνες.
                const canDelete = mediaCount === 0;

                return (
                    <div
                        key={folder.id}
                        className={`media-folder-card ${isActive ? "active" : ""
                            }`}
                    >
                        {/* Επιλέγει τον φάκελο ως ενεργό. */}
                        <button
                            type="button"
                            className="media-folder-main"
                            onClick={() =>
                                onSelectFolder?.(folder.id)
                            }
                            aria-pressed={isActive}
                        >
                            <span className="media-folder-icon">
                                <BiFolder aria-hidden="true" />
                            </span>

                            <span className="media-folder-info">
                                <strong>
                                    {folder.name ||
                                        "Χωρίς όνομα"}
                                </strong>

                                <small>
                                    {mediaCount} αρχεία
                                </small>
                            </span>
                        </button>

                        {/* Actions διαχείρισης του φακέλου. */}
                        <div className="media-folder-actions">
                            {/* Edit */}
                            <button
                                type="button"
                                onClick={() =>
                                    onRenameFolder?.(folder)
                                }
                                title={`Μετονομασία φακέλου ${folder.name}`}
                                aria-label={`Μετονομασία φακέλου ${folder.name}`}
                            >
                                Επεξεργασία
                            </button>

                            {/* Delete */}
                            <button
                                type="button"
                                onClick={() =>
                                    onDeleteFolder?.(folder)
                                }
                                disabled={!canDelete}
                                title={
                                    canDelete
                                        ? `Διαγραφή φακέλου ${folder.name}`
                                        : "Ο φάκελος περιέχει εικόνες"
                                }
                                aria-label={`Διαγραφή φακέλου ${folder.name}`}
                            >
                                Διαγραφή
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* Create */}
            {/* Δημιουργεί νέο φάκελο εικόνων. */}
            <button
                type="button"
                className="media-folder-card create"
                onClick={onCreateFolder}
            >
                <span className="media-folder-main">
                    <span className="media-folder-icon">
                        <BiFolderPlus />
                    </span>

                    <span className="media-folder-info">
                        <strong>Νέος</strong>
                        <small>φάκελος</small>
                    </span>
                </span>
            </button>

        </div>
    );
};

export default MediaFolders;