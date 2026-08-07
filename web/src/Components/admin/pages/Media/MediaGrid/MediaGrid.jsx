import { getImageUrl } from "../../../../common/Media/api/MediaApi";
import "./MediaGrid.css";

// Image
import ShowImage from '../../../../common/Media/ShowImage/ShowImage'

// Reusable component προβολής εικόνων της Media Library.

// Παίρνει τις εικόνες και τους διαθέσιμους φακέλους από το parent.
// Δεν πραγματοποιεί API requests και δεν διαχειρίζεται δικό του state.

// Props:
// media: Λίστα εικόνων που θα εμφανιστούν στο grid.
// folders: Λίστα διαθέσιμων φακέλων για μεταφορά εικόνας.
// onDelete: Καλείται όταν ο admin ζητά διαγραφή εικόνας.
// onMove: Καλείται όταν ο admin μεταφέρει εικόνα σε άλλο φάκελο.

// Εμφανίζει τις εικόνες της Media Library
// και τα διαθέσιμα actions για κάθε εικόνα.
const MediaGrid = ({
    media = [],
    folders = [],
    onDelete,
    onMove,
}) => {
    return (
        <div className="media-card box  ">
            {media.length > 0 ? (
                media.map((item) => {

                    // Όνομα που εμφανίζεται στο UI
                    // και χρησιμοποιείται ως alt text.
                    const imageName =
                        item.file_name || "Χωρίς όνομα";


                    return (
                        <article className="media-item" key={item.id}>

                            {/* Προβολή εικόνας ή placeholder. */}
                            <div className="media-image-wrapper">
                                <ShowImage
                                    src={item.path}
                                    alt={imageName}
                                    type="media"
                                    showPlaceholder
                                    className="media-image"
                                />
                            </div>


                            {/* Πληροφορίες και actions εικόνας. */}
                            <div className="media-info">
                                <p className="media-name">
                                    {imageName}
                                </p>

                                {/* Επιλογή φακέλου μεταφοράς. */}
                                <select
                                    className="media-folder-select"
                                    value={item.media_folder_id || ""}
                                    onChange={(e) =>
                                        onMove(
                                            item.id,
                                            e.target.value
                                        )
                                    }
                                    aria-label={`Μεταφορά εικόνας ${imageName} σε φάκελο`}
                                >
                                    <option value="">Χωρίς φάκελο</option>

                                    {folders.map((folder) => (
                                        <option key={folder.id} value={folder.id}>
                                            {folder.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Delete */}
                                {/* Διαγραφή εικόνας. */}
                                <button
                                    type="button"
                                    className="btn-action btn-delete btn-sm media-delete-btn"
                                    onClick={() =>
                                        onDelete?.(item.id)
                                    }
                                    aria-label={`Διαγραφή εικόνας ${imageName}`}
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    );
                })
            ) : (
                <p className="media-empty">
                    Δεν υπάρχουν εικόνες.
                </p>
            )}
        </div >
    );
};

export default MediaGrid;