import { Link } from "react-router-dom";

import PostImage from "../../../common/Posts/Image/PostImage";

import "./PostsContent.css";
import { formatDate } from "../../../common/components/Utils/formatDate";

// Εμφανίζει τις δημόσιες ανακοινώσεις σε μορφή καρτών.

// Κάθε κάρτα περιλαμβάνει κατηγορία, ημερομηνία, εικόνα,
// τίτλο, σύντομο περιεχόμενο και σύνδεσμο προς τη σελίδα λεπτομερειών.

const PostsContent = ({ posts = [] }) => {
    // Μορφοποιεί την ημερομηνία δημοσίευσης στα ελληνικά.
    // Αν δεν υπάρχει published_at, χρησιμοποιείται το created_at.


    return (
        <section className="front-posts-grid">
            {posts.map((post) => {
                // Χρησιμοποιεί την ημερομηνία δημοσίευσης και,
                // αν δεν υπάρχει, την ημερομηνία δημιουργίας.
                const postDate =
                    post.published_at || post.created_at || "";

                return (
                    <article
                        className="front-post-card"
                        key={post.id}
                    >
                        {/* Κατηγορία και ημερομηνία δημοσίευσης. */}
                        <div className="front-post-card-top">
                            <span className="front-post-category post-category-badge">
                                {post.category?.name || "Χωρίς κατηγορία"}
                            </span>

                            <time
                                className="front-post-date"
                                dateTime={postDate}
                            >
                                {formatDate(postDate)}
                            </time>
                        </div>

                        {/* Εικόνα της ανακοίνωσης ή placeholder αν δεν υπάρχει. */}
                        <PostImage
                            photo={post.photo}
                            alt={post.title || "Εικόνα ανακοίνωσης"}
                            variant="card"
                            showPlaceholder
                        />

                        {/* Τίτλος και σύντομο περιεχόμενο. */}
                        <h2 className="text-no-overflow">
                            {post.title || "Χωρίς τίτλο"}
                        </h2>

                        <p className="text-no-overflow">
                            {post.body || "Δεν υπάρχει διαθέσιμη περιγραφή."}
                        </p>

                        {/* Σύνδεσμος προς την πλήρη ανακοίνωση. */}
                        <Link
                            to={`/posts/${post.id}`}
                            className="front-post-link"
                            aria-label={`Διαβάστε περισσότερα για: ${post.title || "την ανακοίνωση"
                                }`}
                        >
                            Διαβάστε περισσότερα
                        </Link>
                    </article>
                );
            })}
        </section>
    );
};

export default PostsContent;