import './PostsHeader.css'

//  Επικεφαλίδα της σελίδας διαχείρισης δημοσιεύσεων.

//  Εμφανίζει τον τίτλο, μια σύντομη περιγραφή
//  και το button δημιουργίας νέου post.
const PostsHeader = ({
    onCreate
}) => {
    return (
        <div className="posts-header">
            {/* Τίτλος και περιγραφή της ενότητας. */}
            <div>
                <h2 className="section-title">Posts</h2>
                <p className="section-desc">
                    Διαχείριση δημοσιεύσεων και ενημερωτικού περιεχομένου.
                </p>
            </div>

            {/* Ανοίγει τη φόρμα δημιουργίας νέας δημοσίευσης. */}
            <button
                type="button"
                className="btn-action btn-create"
                onClick={onCreate}>
                + Νέο Post
            </button>
        </div>
    );
};

export default PostsHeader;