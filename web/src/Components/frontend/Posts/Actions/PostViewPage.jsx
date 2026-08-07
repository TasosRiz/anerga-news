import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// CSS
import "./PostsViewPage.css";

// API
import { fetchPublicPostById } from "../../../common/Posts/api/PostsApi";

// Media-Image
import PostImage from "../../../common/Posts/Image/PostImage";
import AppStatus from "../../../common/components/Alerts/AppStatus";

// Date
import { formatDate } from "../../../common/components/Utils/formatDate";

// Σελίδα προβολής μίας δημόσιας ανακοίνωσης.

// Διαβάζει το id από το URL.
// Φορτώνει τη δημοσίευση από το API
// Εμφανίζει τα πλήρη στοιχεία της.
const PostsViewPage = () => {
    // Παίρνει το id της ανακοίνωσης από το URL.
    const { id } = useParams();

    // Δεδομένα ανακοίνωσης και καταστάσεις φόρτωσης.
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Helpers
    // Επιστρέφει το όνομα της κατηγορίας.
    // Υποστηρίζει τόσο string όσο και object μορφή από το API.
    const categoryName =
        typeof post?.category === "string"
            ? post.category
            : post?.category?.name || "Χωρίς κατηγορία";


    //  Φορτώνει τη συγκεκριμένη ανακοίνωση
    //  κάθε φορά που αλλάζει το id του route.
    useEffect(() => {
        if (!id) return;

        const loadPost = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");
                setPost(null);

                const data = await fetchPublicPostById(id);
                setPost(data || null);
            } catch (err) {
                setError(
                    err?.message ||
                    "Παρουσιάστηκε σφάλμα κατά τη φόρτωση της δημοσίευσης."
                );
            } finally {
                setLoading(false);
            }
        };

        loadPost();
    }, [id]);

    const postDate = post?.published_at || post?.created_at || "";

    return (
        <main className="front-post-view-page">
            <div className="front-post-view-container">
                {/* Επιστροφή στη λίστα ανακοινώσεων. */}
                <Link to="/posts" className="front-post-back-link">
                    ← Πίσω στις ανακοινώσεις
                </Link>

                {/* Καταστάσεις φόρτωσης, σφάλματος και μη εύρεσης. */}
                <AppStatus
                    loading={loading}
                    error={error}
                    empty={!loading && !error && !post}
                    loadingMessage="Φόρτωση δημοσίευσης..."
                    emptyMessage="Η δημοσίευση δεν βρέθηκε."
                    center
                />


                {/*  Pροβολή της ανακοίνωσης. */}
                {!loading && !error && post && (
                    <article className="front-post-view-card">

                        {/* Cagegory-Date */}
                        <div className="front-post-view-meta">
                            <span className="front-post-view-category">
                                {categoryName}
                            </span>

                            <span className="front-post-view-date">
                                {formatDate(post.published_at || post.created_at)}
                            </span>
                        </div>

                        {/* Title */}
                        <h1>
                            {post.title || "Χωρίς τίτλο"}
                        </h1>

                        {/* Κεντρική εικόνα της ανακοίνωσης. */}
                        <PostImage
                            photo={post.photo}
                            alt={post.title}
                            variant="hero"
                        />

                        {/* Περιεχόμενο της ανακοίνωσης. */}
                        <div className="front-post-view-body">
                            {post.body || "Δεν υπάρχει διαθέσιμο περιεχόμενο."}
                        </div>
                    </article>
                )}

            </div>
        </main>
    );
};

export default PostsViewPage;