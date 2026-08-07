import "./ViewPost.css";

// Image
import PostImage from "../../../../../../common/Posts/Image/PostImage";

// Date
import { formatDate } from "../../../../../../common/components/Utils/formatDate";


// Προβάλλει τα πλήρη στοιχεία του επιλεγμένου post.

// Χρησιμοποιείται μέσα στο SidePanel
// για την προβολή δημοσίευσης από το admin panel.
const ViewPost = ({ post }) => {

    // Δεν εμφανίζει περιεχόμενο όταν δεν υπάρχει επιλεγμένο post.
    if (!post) {
        return null;
    }

    // Χρησιμοποιεί την ημερομηνία δημοσίευσης
    // και, αν δεν υπάρχει, την ημερομηνία δημιουργίας.
    const postDate =
        post.published_at || post.created_at || "";

    // Ελέγχει αν η δημοσίευση είναι ενεργή.
    const isActive = post.status === "active";

    return (
        <div className="view-post">
            {/* Βασικά στοιχεία της δημοσίευσης. */}
            <div className="view-post-card">
                <div className="post-detail-row">
                    <span>ID</span>
                    <strong>#{String(post.id).padStart(4, "0")}</strong>
                </div>

                <div className="post-detail-row">
                    <span>Τίτλος</span>
                    <strong>{post.title}</strong>
                </div>

                <div className="post-detail-row">
                    <span>Κατηγορία</span>
                    <strong className="post-category-badge">{post.category?.name || "Χωρίς κατηγορία"}</strong>
                </div>

                <div className="post-detail-row">
                    <span>Κατάσταση</span>
                    <strong
                        className={`post-status-pill ${isActive ? "btn-active" : "btn-inactive"
                            }`}
                    >
                        {isActive ? "Ενεργό" : "Ανενεργό"}
                    </strong>
                </div>

                <div className="post-detail-row">
                    <span>Ημερομηνία</span>
                    <time dateTime={postDate}>
                        {formatDate(postDate)}
                    </time>
                </div>
            </div>

            {/* Πλήρες περιεχόμενο της δημοσίευσης. */}
            <div className="post-detail-body">
                <span>Περιεχόμενο</span>
                <p>{post.body || "Δεν υπάρχει περιεχόμενο."}</p>
            </div>

            {/* Κεντρική εικόνα της δημοσίευσης. */}
            <PostImage
                photo={post.photo}
                alt={post.title || "Εικόνα δημοσίευσης"}
                variant="hero"
                showPlaceholder
            />
        </div>
    );
};

export default ViewPost;