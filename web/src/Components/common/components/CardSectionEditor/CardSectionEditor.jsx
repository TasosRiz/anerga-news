import { Fragment, useEffect, useState } from "react";
import { fetchMedia, getImageUrl } from "../../../../common/Media/api/MediaApi";
import MediaSelector from "../../../../common/Media/MediaSelector/MediaSelector";
import './CardSectionEditor.css'
/*
|--------------------------------------------------------------------------
| Card Section Editor
|--------------------------------------------------------------------------
| Κοινό reusable component για sections που περιέχουν 3 editable cards,
| όπως τα Audience και How It Works.
|
| Το component αναλαμβάνει:
| - την εμφάνιση του section title και των cards σε table μορφή
| - το άνοιγμα/κλείσιμο του editor κάθε card
| - την αλλαγή title και text των cards
| - την επιλογή εικόνας από τη Media Library μέσω MediaSelector
| - το preview της επιλεγμένης εικόνας
|
| Τα πραγματικά δεδομένα και το submit request παραμένουν στο parent
| component μέσω των props formData, setFormData και onSubmit.
*/

const cardFields = [
    {
        key: 1,
        titleField: "card_1_title",
        textField: "card_1_text",
        imageField: "card_1_image",
        label: "Card 1",
    },
    {
        key: 2,
        titleField: "card_2_title",
        textField: "card_2_text",
        imageField: "card_2_image",
        label: "Card 2",
    },
    {
        key: 3,
        titleField: "card_3_title",
        textField: "card_3_text",
        imageField: "card_3_image",
        label: "Card 3",
    },
];

const CardSectionEditor = ({
    authToken,
    formData,
    setFormData,
    tableTitle,
    onSubmit,
    saving,
    children,
}) => {
    const [media, setMedia] = useState([]);
    const [activeImageField, setActiveImageField] = useState(null);
    const [showMediaSelector, setShowMediaSelector] = useState(false);
    const [openRow, setOpenRow] = useState(null);

    // Φορτώνει τις διαθέσιμες εικόνες της Media Library,
    // ώστε να μπορούν να επιλεγούν για οποιοδήποτε card.
    useEffect(() => {
        if (!authToken) return;

        const loadMedia = async () => {
            try {
                const data = await fetchMedia(authToken);
                setMedia(data);
            } catch (error) {
                console.log("Fetch media error:", error);
            }
        };

        loadMedia();
    }, [authToken]);

    // Ενημερώνει δυναμικά το αντίστοιχο field του parent formData
    // χρησιμοποιώντας το name του input.
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /*
     Media Selection Flow
     Αποθηκεύουμε ποιο image field επεξεργάζεται ο admin,
     ανοίγουμε τον MediaSelector και, όταν επιλεγεί εικόνα,
     γράφουμε το path της στο αντίστοιχο card_x_image field.
    */
    const openMedia = (fieldName) => {
        setActiveImageField(fieldName);
        setShowMediaSelector(true);
    };

    const selectMedia = (path) => {
        if (!activeImageField) return;

        setFormData((prev) => ({
            ...prev,
            [activeImageField]: path,
        }));

        setShowMediaSelector(false);
        setActiveImageField(null);
    };

    const closeMedia = () => {
        setShowMediaSelector(false);
        setActiveImageField(null);
    };

    return (
        <form onSubmit={onSubmit} className="card-section-editor form-wrapper">
            <div className="form-card">
                <h3>{tableTitle}</h3>

                <div className="form-row">
                    <label>Title</label>
                    <input
                        type="text"
                        name="section_title"
                        value={formData.section_title}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                {children}
            </div>

            <div className="form-card">
                <div className="table-header-row">
                    <h3>{tableTitle}</h3>
                </div>

                <div className="cards-table-wrapper">
                    <table className="cards-table">
                        <thead>
                            <tr>
                                <th>Card</th>
                                <th>Title</th>
                                <th>Text Preview</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cardFields.map((card) => (
                                <Fragment key={card.key}>
                                    <tr>
                                        <td>{card.label}</td>

                                        <td>{formData[card.titleField] || "-"}</td>

                                        <td>
                                            {formData[card.textField]
                                                ? `${formData[card.textField].slice(0, 60)}${formData[card.textField].length > 60
                                                    ? "..."
                                                    : ""
                                                }`
                                                : "-"}
                                        </td>

                                        <td>
                                            {formData[card.imageField] ? (
                                                <img
                                                    src={getImageUrl(
                                                        formData[card.imageField]
                                                    )}
                                                    alt={card.label}
                                                    className="table-image-preview"
                                                />
                                            ) : (
                                                <span>No image</span>
                                            )}
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="btn-action btn-edit btn-sm"
                                                onClick={() =>
                                                    setOpenRow(
                                                        openRow === card.key
                                                            ? null
                                                            : card.key
                                                    )
                                                }
                                            >
                                                {openRow === card.key
                                                    ? "Close"
                                                    : "Edit"}
                                            </button>
                                        </td>
                                    </tr>

                                    {openRow === card.key && (
                                        <tr className="editor-row">
                                            <td colSpan="5">
                                                <div className="inline-card-editor">
                                                    <div className="inline-card-editor-fields">
                                                        <div className="form-row">
                                                            <label>Title</label>
                                                            <input
                                                                type="text"
                                                                name={card.titleField}
                                                                value={
                                                                    formData[
                                                                    card.titleField
                                                                    ]
                                                                }
                                                                onChange={handleChange}
                                                                className="form-control"
                                                            />
                                                        </div>

                                                        <div className="form-row">
                                                            <label>Text</label>
                                                            <textarea
                                                                name={card.textField}
                                                                value={
                                                                    formData[
                                                                    card.textField
                                                                    ]
                                                                }
                                                                onChange={handleChange}
                                                                className="form-control"
                                                                rows="5"
                                                            />
                                                        </div>

                                                        <div className="form-row">
                                                            <label>Image Path</label>
                                                            <input
                                                                type="text"
                                                                value={
                                                                    formData[
                                                                    card.imageField
                                                                    ]
                                                                }
                                                                readOnly
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="inline-card-editor-side">
                                                        {formData[card.imageField] && (
                                                            <div className="image-preview">
                                                                <img
                                                                    src={getImageUrl(
                                                                        formData[
                                                                        card.imageField
                                                                        ]
                                                                    )}
                                                                    alt={card.label}
                                                                />
                                                            </div>
                                                        )}

                                                        <div className="image-action-row">
                                                            <button
                                                                type="button"
                                                                className="select-media-btn"
                                                                onClick={() =>
                                                                    openMedia(
                                                                        card.imageField
                                                                    )
                                                                }
                                                            >
                                                                Επιλογή από Media
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {showMediaSelector &&
                                                    activeImageField ===
                                                    card.imageField && (
                                                        <MediaSelector
                                                            media={media}
                                                            onSelect={selectMedia}
                                                            onClose={closeMedia}
                                                        />
                                                    )}
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="form-actions">
                <button
                    type="submit"
                    className="btn-action btn-save "
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Update Section"}
                </button>
            </div>
        </form>
    );
};

export default CardSectionEditor;