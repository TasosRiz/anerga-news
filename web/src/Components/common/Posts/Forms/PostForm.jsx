import { useState, useEffect } from "react";
import "./PostForm.css";

// Media
import MediaSelector from "../../Media/MediaSelector/MediaSelector";

// Image
import PostImage from "../Image/PostImage";

// Hooks
import { useAuth } from "../../Auth/provider/AuthProvider";
import { useMediaSelector } from "../../Media/hooks/MediaSelector/useMediaSelector";
import FormCheckbox from "../../Notifications/FormCheckbox/FormCheckbox";

//  Κοινή φόρμα δημιουργίας και επεξεργασίας δημοσίευσης.

//  Διαχειρίζεται
//  -τα βασικά πεδία του post
//  -την επιλογή εικόνας από τη Media Library
//  -την υποβολή των δεδομένων στο parent component μέσω της function onSave.

// Κοινές αρχικές τιμές της φόρμας.
const initialFormState = {
    title: "",
    category_id: "",
    photo: "",
    status: "active",
    published_at: "",
    body: "",
    notify_users: true,
};

const PostForm = ({
    post = null,
    categories = [],
    saving = false,
    onSave }) => {

    // Παίρνει το token του συνδεδεμένου χρήστη από το AuthProvider.
    const { token } = useAuth();

    // Αποθηκεύει τις τιμές των πεδίων της φόρμας.
    const [form, setForm] = useState({
        title: "",
        category_id: "",
        photo: "",
        status: "active",
        published_at: "",
        body: "",
        notify_users: true,
    });

    // Διαχείριση Media Library.
    // Το hook αναλαμβάνει φόρτωση media/folders,
    // άνοιγμα και κλείσιμο του selector,
    // επιλογή ή upload εικόνας.
    const {
        media,
        folders,
        loadingMedia,
        mediaError,
        showMediaSelector,
        openMediaSelector,
        closeMediaSelector,
        selectMedia,
        handleUploadedMedia,
    } = useMediaSelector({
        token,

        // Αποθηκεύει το path της επιλεγμένης εικόνας
        // στο πεδίο photo της φόρμας.
        onSelect: (path) => {
            setForm((previousForm) => ({
                ...previousForm,
                photo: path,
            }));
        },
    });

    // Αφαιρεί την εικόνα μόνο από τη φόρμα.
    // Δεν διαγράφει το αρχείο από τη Media Library.
    const handleRemoveImage = () => {
        setForm((previousForm) => ({
            ...previousForm,
            photo: "",
        }));
    };



    // Edit
    //  Όταν υπάρχει επιλεγμένο post, γεμίζει τη φόρμα
    //  με τα δεδομένα του για επεξεργασία.
    //
    //  Αν δεν υπάρχει post, επαναφέρει τη φόρμα
    //  στις αρχικές τιμές για δημιουργία νέας δημοσίευσης.
    useEffect(() => {
        if (!post) {
            setForm(initialFormState); // Arxikes Times
            return;
        }

        setForm({
            title: post.title || "",
            category_id: post.category_id
                ? String(post.category_id)
                : "",
            photo: post.photo || "",
            status: post.status || "active",
            published_at: post.published_at
                ? post.published_at.slice(0, 10)
                : "",
            body: post.body || "",
        });
    }, [post]);

    // Update
    // Ενημερώνει το αντίστοιχο πεδίο της φόρμας.
    const handleChange = (event) => {
        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: type === "checkbox"
                ? checked
                : value,
        }));
    };

    // Submit
    //  Προετοιμάζει τα δεδομένα της φόρμας
    //  και τα στέλνει στο parent component για αποθήκευση.
    const handleSubmit = (e) => {
        e.preventDefault();

        onSave?.({
            title: form.title.trim(),
            category_id: form.category_id
                ? Number(form.category_id)
                : null,
            photo: form.photo || null,
            status: form.status,
            published_at: form.published_at || null,
            body: form.body.trim(),
            notify_users: form.notify_users,
        });
    };


    return (
        <form className="post-form" onSubmit={handleSubmit}>

            {/* Επιλογή και προεπισκόπηση εικόνας δημοσίευσης. */}
            <div className="form-group">
                <label className="label-text">Εικόνα</label>

                {form.photo && (
                    <PostImage
                        photo={form.photo}
                        alt="Post preview"
                        variant="preview"
                    />
                )}

                <div className="post-form-image-actions">
                    {/* Ανοίγει τη Media Library για επιλογή ή upload εικόνας. */}
                    <button
                        type="button"
                        className="btn-action btn-back btn-sm"
                        onClick={openMediaSelector}
                        disabled={loadingMedia}
                    >
                        {loadingMedia
                            ? "Φόρτωση εικόνων..."
                            : "Επιλογή εικόνας"}
                    </button>

                    {/* Αφαιρεί την εικόνα από το post χωρίς να τη διαγράφει από τη Media Library. */}
                    {form.photo && (
                        <button
                            type="button"
                            className="btn-action btn-delete btn-sm"
                            onClick={handleRemoveImage}
                        >
                            Αφαίρεση
                        </button>
                    )}
                </div>



                {/* Μήνυμα σφάλματος της Media Library. */}
                {mediaError && (
                    <p className="form-error" role="alert">
                        {mediaError}
                    </p>
                )}

                {/* Modal επιλογής ή upload εικόνας από τη Media Library. */}
                {showMediaSelector && (
                    <MediaSelector
                        media={media}
                        folders={folders}
                        onSelect={selectMedia}
                        onUploaded={handleUploadedMedia}
                        onClose={closeMediaSelector}
                    />
                )}
            </div>

            {/* Τίτλος δημοσίευσης. */}
            <div className="form-group">
                <label className="label-text">Τίτλος</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="π.χ. Νέα δράση καθαριότητας"
                    required
                />
            </div>

            {/* Κατηγορία δημοσίευσης. */}
            <div className="form-group">
                <label className="label-text">Κατηγορία</label>
                <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                // required
                >
                    <option value="">Επίλεξε κατηγορία</option>

                    {categories
                        .filter(
                            (category) =>
                                Number(category.status) === 1
                        )
                        .map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                </select>
            </div>

            {/* Κατάσταση δημοσίευσης. */}
            <div className="form-group">
                <label className="label-text">Κατάσταση</label>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    required
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* Ειδοποιηση */}
            {/* REUSEABLE ΧΩΡΙΣ  FormCheckbox */}
            <FormCheckbox
                name="notify_users"
                checked={form.notify_users}
                onChange={handleChange}
                label="Αποστολή ειδοποίησης στους χρήστες"
                helpText={
                    form.status === "active"
                        ? "Οι χρήστες θα ειδοποιηθούν για τη δημοσίευση."
                        : "Η ειδοποίηση είναι διαθέσιμη μόνο για ενεργές δημοσιεύσεις."
                }
                disabled={form.status !== "active"}
            />

            {/* Προαιρετική ημερομηνία δημοσίευσης. */}
            <div className="form-group">
                <label className="label-text">Ημερομηνία δημοσίευσης</label>
                <input
                    type="date"
                    name="published_at"
                    value={form.published_at}
                    onChange={handleChange}
                />
            </div>

            {/* Κύριο περιεχόμενο της δημοσίευσης. */}
            <div className="form-group">
                <label className="label-text">Περιεχόμενο</label>
                <textarea
                    name="body"
                    value={form.body}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Γράψε το περιεχόμενο του post..."
                />
            </div>

            {/* Button υποβολής της φόρμας. */}
            <div className="post-form-actions">
                <button
                    type="submit"
                    className="btn-action btn-save"
                    disabled={saving || loadingMedia}
                >
                    {saving ? "Αποθήκευση..." : "Αποθήκευση"}
                </button>
            </div>
        </form>
    );
};

export default PostForm;