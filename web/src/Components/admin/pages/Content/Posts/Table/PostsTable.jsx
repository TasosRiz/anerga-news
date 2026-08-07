import "./PostsTable.css";

import PostImage from "../../../../../common/Posts/Image/PostImage";
import { formatDate } from "../../../../../common/components/Utils/formatDate";

import {
    FaEye,
    FaPen,
    FaTrash,
} from "react-icons/fa";

// Πίνακας διαχείρισης δημοσιεύσεων.

// Εμφανίζει τα βασικά στοιχεία κάθε post
// Παρέχει ενέργειες προβολής, επεξεργασίας και διαγραφής.
const PostsTable = ({
    posts = [],
    onView,
    onEdit,
    onDelete,
}) => {
    // Ενημερωτικό μήνυμα όταν δεν υπάρχουν δημοσιεύσεις.
    if (posts.length === 0) {
        return (
            <div className="alert alert-info">
                Δεν υπάρχουν posts.
            </div>
        );
    }

    return (
        <div className="posts-table-wrapper scrollable-x">
            <table className="posts-table">
                {/* Επικεφαλίδες των στηλών του πίνακα. */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Εικόνα</th>
                        <th>Τίτλος</th>
                        <th>Κατηγορία</th>
                        <th>Κατάσταση</th>
                        <th>Ημερομηνία</th>
                        <th>Ενέργειες</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Δυναμική εμφάνιση των δημοσιεύσεων. */}
                    {posts.map((post) => {
                        // Χρησιμοποιεί την ημερομηνία δημοσίευσης
                        // και, αν δεν υπάρχει, την ημερομηνία δημιουργίας.
                        const postDate =
                            post.published_at || post.created_at || "";

                        // Ελέγχει αν η δημοσίευση είναι ενεργή.
                        const isActive = post.status === "active";

                        return (
                            <tr key={post.id}>
                                {/* Μορφοποιημένο αναγνωριστικό της δημοσίευσης. */}
                                <td className="table-id">
                                    #{String(post.id).padStart(3, "0")}
                                </td>

                                {/* Thumbnail εικόνας ή placeholder. */}
                                <td>
                                    <PostImage
                                        photo={post.photo}
                                        alt={post.title || "Εικόνα δημοσίευσης"}
                                        variant="thumb"
                                        showPlaceholder
                                    />
                                </td>

                                {/* Τίτλος δημοσίευσης. */}
                                <td className="table-title text-no-overflow">
                                    {post.title || "Χωρίς τίτλο"}
                                </td>

                                {/* Κατηγορία δημοσίευσης. */}
                                <td>
                                    <span className="post-category-badge">
                                        {post.category?.name || "Χωρίς κατηγορία"}
                                    </span>
                                </td>

                                {/* Κατάσταση δημοσίευσης. */}
                                <td>
                                    <span
                                        className={`table-status ${isActive ? "active" : "inactive"
                                            }`}
                                    >
                                        {isActive ? "Ενεργό" : "Ανενεργό"}
                                    </span>
                                </td>

                                {/* Μορφοποιημένη ημερομηνία στα ελληνικά. */}
                                <td>
                                    <time dateTime={postDate}>
                                        {formatDate(postDate)}
                                    </time>
                                </td>

                                {/* Ενέργειες διαχείρισης της δημοσίευσης. */}
                                <td>
                                    {/* View */}
                                    <div className="table-actions">
                                        <button
                                            type="button"
                                            className="btn-action btn-view"
                                            onClick={() => onView?.(post)}
                                        >
                                            <FaEye />
                                        </button>

                                        {/* Edit */}
                                        <button
                                            type="button"
                                            className="btn-action btn-edit"
                                            onClick={() => onEdit?.(post)}
                                        >
                                            <FaPen />
                                        </button>

                                        {/* Delete */}
                                        <button
                                            type="button"
                                            className="btn-action btn-delete"
                                            onClick={() => onDelete?.(post.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default PostsTable;