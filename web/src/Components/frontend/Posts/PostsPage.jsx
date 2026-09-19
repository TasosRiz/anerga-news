// CSS
import "./PostsPage.css";
import { useEffect, useMemo, useState } from "react";

// API
import { fetchPublicPosts } from "../../common/Posts/api/PostsApi";

// Content
import PostsHeader from "./Header/PostsHeader";
import PostsContent from "./Content/PostsContent";

// Components
import SelectFilter from "../../common/components/Filters/SelectFilter";
import AppStatus from "../../common/components/Alerts/AppStatus";
import Hero from "../Home/Hero/Hero";
import PostSlider from "./Content/PostSlider";


//  Δημόσια σελίδα προβολής ανακοινώσεων.

//  Φορτώνει τις διαθέσιμες δημοσιεύσεις από το API.
//  Διαχειρίζεται τις καταστάσεις φόρτωσης και σφάλματος.
//  Επιτρέπει το φιλτράρισμα των αποτελεσμάτων ανά κατηγορία.
const PostsPage = () => {
    // Αποθηκεύει τις δημοσιεύσεις που επιστρέφονται από το API.
    const [posts, setPosts] = useState([]);

    // Καταστάσεις φόρτωσης και εμφάνισης σφάλματος.
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // Filter
    // Αποθηκεύει την κατηγορία που έχει επιλέξει ο χρήστης.
    const [selectedCategoryId, setSelectedCategoryId] = useState("");


    //  Δημιουργεί τις διαθέσιμες επιλογές κατηγοριών
    //  από τις κατηγορίες των δημοσιεύσεων.

    //  Το Map απομακρύνει τις διπλότυπες κατηγορίες
    //  με βάση το μοναδικό id τους.
    const categoryOptions = useMemo(() => {
        return [
            ...new Map(
                posts
                    .filter((post) => post.category)
                    .map((post) => [
                        post.category.id,
                        {
                            value: String(post.category.id),
                            label: post.category.name,
                        },
                    ])
            ).values(),
        ];
    }, [posts]);

    // Filter
    // Φιλτράρει τις δημοσιεύσεις σύμφωνα με την επιλεγμένη κατηγορία.
    // Όταν δεν έχει επιλεγεί κατηγορία, εμφανίζονται όλες.
    const filteredPosts = useMemo(() => {
        if (!selectedCategoryId) {
            return posts;
        }

        return posts.filter(
            (post) =>
                String(post.category_id) === String(selectedCategoryId)
        );
    }, [posts, selectedCategoryId]);

    // Load Posts
    // Φορτώνει τις δημόσιες δημοσιεύσεις όταν ανοίγει η σελίδα.
    // Ενημερώνει αντίστοιχα τα loading και error states.
    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await fetchPublicPosts();

                // Προστασία σε περίπτωση που το API δεν επιστρέψει array.
                setPosts(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(
                    err?.message ||
                    "Παρουσιάστηκε σφάλμα κατά τη φόρτωση των δημοσιεύσεων."
                );
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    // Δηλώνει αν υπάρχουν δημοσιεύσεις αλλά καμία δεν ταιριάζει στο φίλτρο.
    const hasNoFilteredPosts =
        !loading &&
        !error &&
        posts.length > 0 &&
        filteredPosts.length === 0;

    return (
        <main className="front-posts-page">
            <Hero />
            <PostSlider
                posts={posts}
                title="Trending Εβδομάδας"
            />


            {/* Header */}
            <PostsHeader />

            {/* Εμφανίζει κοινά μηνύματα κατάστασης*/}
            <AppStatus
                loading={loading}
                error={error}
                empty={!loading && !error && posts.length === 0}
                loadingMessage="Φόρτωση δημοσιεύσεων..."
                emptyMessage="Δεν υπάρχουν διαθέσιμες δημοσιεύσεις."
                center
            />

            {/* Filter */}
            {/* Το φίλτρο εμφανίζεται μόνο όταν η φόρτωση ολοκληρωθεί
                επιτυχώς και υπάρχουν διαθέσιμες δημοσιεύσεις. */}
            {!loading && !error && posts.length > 0 && (
                <div className="front-posts-filters">
                    <SelectFilter
                        label="Κατηγορία"
                        value={selectedCategoryId}
                        onChange={setSelectedCategoryId}
                        placeholder="Όλες οι κατηγορίες"
                        options={categoryOptions}
                    />
                </div>
            )}

            {/* Μήνυμα όταν το ενεργό φίλτρο δεν επιστρέφει αποτελέσματα. */}
            <AppStatus
                empty={hasNoFilteredPosts}
                emptyMessage="Δεν υπάρχουν δημοσιεύσεις σε αυτή την κατηγορία."
                center
            />

            {/* Εμφάνιση των δημοσιεύσεων που αντιστοιχούν στο φίλτρο. */}
            {!loading && !error && filteredPosts.length > 0 && (
                <PostsContent posts={filteredPosts} />
            )}



        </main>
    );
};

export default PostsPage;