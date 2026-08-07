import { useEffect, useMemo, useState } from "react";
import "./Posts.css";

// Components
import PostsHeader from "./Header/PostsHeader";
import PostsTable from "./Table/PostsTable";
import SidePanel from "../../../../common/components/SidePanel/SidePanel";

// API
import { fetchPostCategories } from "../../../../common/Categories/api/postCategories";
import { createPost, deletePost, fetchPosts, updatePost } from "../../../../common/Posts/api/PostsApi";
import { useAuth } from "../../../../common/Auth/provider/AuthProvider";

// View-Create-Edit
import ViewPost from "./Actions/View/ViewPost";
import PostForm from "../../../../common/Posts/Forms/PostForm";
import Card from "../../../../common/components/Card/Card";
import SelectFilter from "../../../../common/components/Filters/SelectFilter";
import AppStatus from "../../../../common/components/Alerts/AppStatus";

// Hooks
import { usePostCountsCards } from "../../../../common/Posts/hooks/usePostCountsCards";
import ConfirmDialog from "../../../../common/components/ConfirmDialog/ConfirmDialog";

//  Κεντρική σελίδα διαχείρισης ανακοινώσεων του admin panel.

//  Φορτώνει τις δημοσιεύσεις και τις κατηγορίες από το API.
//  Εμφανίζει συνοπτικά στατιστικά.
// Επιτρέπει στον διαχειριστή να προβάλλει, δημιουργεί, επεξεργάζεται και να διαγράφει posts.

//  Οι φόρμες και οι λεπτομέρειες εμφανίζονται σε κοινό SidePanel.

const Posts = () => {
    // Παίρνει το token του συνδεδεμένου χρήστη από το AuthProvider.
    const { token } = useAuth();

    // Δημοσιεύσεις και βασικές καταστάσεις φόρτωσης.
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Post-Categories
    const [categories, setCategories] = useState([]);
    // Επιλεγμένη κατηγορία του φίλτρου.
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    // Επιλεγμένο post και κατάσταση του SidePanel.
    const [selectedPost, setSelectedPost] = useState(null);
    const [panelMode, setPanelMode] = useState("");
    const [savingPost, setSavingPost] = useState(false);

    // Confirm Delete
    const [postToDelete, setPostToDelete] = useState(null);
    const [deletingPost, setDeletingPost] = useState(false);


    // Header
    //  Φορτώνει τα στατιστικά των posts που εμφανίζονται
    //  στις κάρτες της σελίδας.
    const { cards, loadingCounts, countsError } = usePostCountsCards({
        token,
        isAdmin: true,
    });


    //  Μετατρέπει τις κατηγορίες στη μορφή που απαιτεί
    //  το κοινό SelectFilter component.
    const categoryOptions = useMemo(
        () =>
            categories.map((category) => ({
                value: String(category.id),
                label: category.name,
            })),
        [categories]
    );

    //  Φιλτράρει τα posts σύμφωνα με την επιλεγμένη κατηγορία.
    //  Όταν δεν υπάρχει επιλογή, επιστρέφονται όλα τα posts.
    const filteredPosts = useMemo(() => {
        if (!selectedCategoryId) {
            return posts;
        }

        return posts.filter(
            (post) =>
                String(post.category_id) === String(selectedCategoryId)
        );
    }, [posts, selectedCategoryId]);



    // LoadPosts
    // Φορτώνει παράλληλα τις δημοσιεύσεις και τις κατηγορίες
    // όταν είναι διαθέσιμο το token του admin.
    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const loadData = async () => {
            try {
                setLoading(true);
                setError("");

                const [postsData, categoriesData] = await Promise.all([
                    fetchPosts(token), //Post
                    fetchPostCategories(token), //Categories
                ]);

                setPosts(Array.isArray(postsData) ? postsData : []);
                setCategories(
                    Array.isArray(categoriesData) ? categoriesData : []
                );
            } catch (err) {
                setError(
                    err?.message ||
                    "Παρουσιάστηκε σφάλμα κατά τη φόρτωση των posts."
                );
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [token]);

    // View
    // Ανοίγει το SidePanel σε λειτουργία προβολής.
    const handleViewPost = (post) => {
        setSelectedPost(post);
        setPanelMode("view");
    };

    // Create
    // Ανοίγει κενή φόρμα δημιουργίας νέου post.
    const handleCreatePost = () => {
        setSelectedPost(null);
        setPanelMode("create");
    };

    // Edit
    // Ανοίγει τη φόρμα επεξεργασίας του επιλεγμένου post.
    const handleEditPost = (post) => {
        setSelectedPost(post);
        setPanelMode("edit");
    };

    // SavenewPost
    //  Δημιουργεί νέο post και το προσθέτει στην αρχή
    //  της τοπικής λίστας χωρίς νέο fetch.
    const handleSaveNewPost = async (data) => {
        try {
            setSavingPost(true);

            const newPost = await createPost(token, data);

            setPosts((prevPosts) => [newPost, ...prevPosts]);

            setSelectedPost(newPost);
            setPanelMode("view");
        } catch (err) {
            window.alert(
                err?.message ||
                "Παρουσιάστηκε σφάλμα κατά τη δημιουργία του post."
            );
        } finally {
            setSavingPost(false);
        }
    }

    // SaveEditedPost
    // Ενημερώνει το επιλεγμένο post και αντικαθιστά
    // τα παλιά δεδομένα στην τοπική λίστα.
    const handleSaveEditedPost = async (data) => {
        if (!selectedPost) return;

        try {
            setSavingPost(true);

            const updatedPost = await updatePost(token, selectedPost.id, data);

            setPosts((previousPosts) =>
                previousPosts.map((post) =>
                    post.id === selectedPost.id
                        ? { ...post, ...updatedPost }
                        : post
                )
            );

            setSelectedPost((previousPost) => ({
                ...previousPost,
                ...updatedPost,
            }));

            setPanelMode("view");
        } catch (err) {
            window.alert(
                err?.message ||
                "Παρουσιάστηκε σφάλμα κατά την ενημέρωση του post."
            );
        } finally {
            setSavingPost(false);
        }
    };

    // Delete
    //  Διαγράφει το post μετά από επιβεβαίωση
    //  και το αφαιρεί από την τοπική λίστα.
    const handleConfirmDeletePost = async () => {
        if (!postToDelete) return;

        try {
            setDeletingPost(true);

            await deletePost(token, postToDelete);

            setPosts((previousPosts) =>
                previousPosts.filter(
                    (post) => post.id !== postToDelete
                )
            );

            if (selectedPost?.id === postToDelete) {
                handleClosePanel();
            }

            setPostToDelete(null);
        } catch (err) {
            window.alert(
                err?.message ||
                "Παρουσιάστηκε σφάλμα κατά τη διαγραφή του post."
            );
        } finally {
            setDeletingPost(false);
        }
    };

    const handleDeletePost = (id) => {
        setPostToDelete(id);
    };

    // Close SidePanel
    // Καθαρίζει την επιλογή και κλείνει το SidePanel.
    const handleClosePanel = () => {
        setSelectedPost(null);
        setPanelMode("");
    };


    //  Το SidePanel ανοίγει κατά τη δημιουργία ή όταν
    //  υπάρχει επιλεγμένο post για προβολή ή επεξεργασία.
    const panelIsOpen =
        panelMode === "create" ||
        panelMode === "edit" ||
        panelMode === "view";

    const hasNoFilteredPosts =
        !loading &&
        !error &&
        posts.length > 0 &&
        filteredPosts.length === 0;


    return (
        <div
            className={`with-side-panel ${panelIsOpen ? "has-panel" : ""}`}
            style={{ "--side-panel-width": "380px" }}
        >
            <div className="posts-page box">
                {/* Επικεφαλίδα και button δημιουργίας νέου post. */}
                <PostsHeader onCreate={handleCreatePost} />

                {/* Βασικές καταστάσεις φόρτωσης και σφάλματος. */}
                <AppStatus
                    loading={loading}
                    error={error}
                    loadingMessage="Φόρτωση posts..."
                    center
                />

                {/* Κάρτες με συνοπτικά στατιστικά των posts. */}
                <div className="content-posts-header">
                    <AppStatus
                        loading={loadingCounts}
                        error={countsError}
                        loadingMessage="Φόρτωση στατιστικών..."
                        center
                    />

                    {!loadingCounts &&
                        !countsError &&
                        cards.length > 0 && (
                            <Card items={cards} />
                        )}
                </div>

                {/* Το φίλτρο κατηγορίας εμφανίζεται μόνο όταν
                    υπάρχουν posts και διαθέσιμες κατηγορίες. */}
                {!loading && !error && categories.length > 0 && posts.length > 0 && (
                    <div className="posts-filters">
                        <SelectFilter
                            label="Κατηγορία"
                            value={selectedCategoryId}
                            onChange={setSelectedCategoryId}
                            placeholder="Όλες οι κατηγορίες"
                            options={categoryOptions}
                        />
                    </div>
                )}

                {/* Μήνυμα όταν δεν υπάρχουν καθόλου posts. */}
                <AppStatus
                    empty={!loading && !error && posts.length === 0}
                    emptyMessage="Δεν υπάρχουν posts."
                    center
                />

                {/* Μήνυμα όταν δεν υπάρχουν καθόλου posts. */}
                <AppStatus
                    empty={
                        !loading &&
                        !error &&
                        posts.length > 0 &&
                        filteredPosts.length === 0
                    }
                    emptyMessage="Δεν υπάρχουν posts σε αυτή την κατηγορία."
                    center
                />

                {/* Πίνακας των φιλτραρισμένων posts. */}
                {!loading && !error && filteredPosts.length > 0 && (
                    <PostsTable
                        posts={filteredPosts}
                        onView={handleViewPost}
                        onEdit={handleEditPost}
                        onDelete={handleDeletePost}
                    />
                )}

            </div>

            {/* Κοινό SidePanel για δημιουργία, επεξεργασία
                 και προβολή λεπτομερειών ενός post. */}
            <SidePanel
                open={panelIsOpen}
                title={
                    panelMode === "create"
                        ? "Νέο Post"
                        : panelMode === "edit"
                            ? "Επεξεργασία Post"
                            : "Λεπτομέρειες Post"
                }
                subtitle={panelMode === "create" ? "Δημιουργία νέας δημοσίευσης" : selectedPost?.title}
                onClose={handleClosePanel}
            >
                {/* Create */}
                {/* Φόρμα δημιουργίας νέου post. */}
                {panelMode === "create" && (
                    <PostForm
                        categories={categories}
                        saving={savingPost}
                        onSave={handleSaveNewPost}
                    />
                )}

                {/* Edit */}
                {/* Φόρμα επεξεργασίας υπάρχοντος post. */}
                {panelMode === "edit" && (
                    <PostForm
                        post={selectedPost}
                        categories={categories}
                        saving={savingPost}
                        onSave={handleSaveEditedPost}
                    />
                )}

                {/* View */}
                {/* Προβολή λεπτομερειών του επιλεγμένου post. */}
                {panelMode === "view" && (
                    <ViewPost post={selectedPost} />
                )}



            </SidePanel>

            <ConfirmDialog
                open={postToDelete !== null}
                title="Διαγραφή Post"
                message="Θέλεις σίγουρα να διαγράψεις αυτό το post;"
                confirmText="Διαγραφή"
                loading={deletingPost}
                onConfirm={handleConfirmDeletePost}
                onCancel={() => setPostToDelete(null)}
            />
        </div >
    );
};

export default Posts;