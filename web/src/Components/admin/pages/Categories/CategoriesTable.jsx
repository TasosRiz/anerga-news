

import { useCallback, useEffect, useState } from "react";

// Components
import SidePanel from "../../../common/components/SidePanel/SidePanel";
import CategoryEditForm from "../../../common/Categories/Forms/CategoryEditForm";
import AppStatus from "../../../common/components/Alerts/AppStatus";


// Notifications
import { toast } from "react-toastify";

// CSS
import "./CategoriesTable.css";

//  Επαναχρησιμοποιήσιμος πίνακας διαχείρισης κατηγοριών.
//
//  Χρησιμοποιείται για:
//  - κατηγορίες αιτημάτων
//  - κατηγορίες άρθρων
//
//  Τα API functions παρέχονται από το parent component.

const CategoriesTable = ({
    token,
    emptyText = "Δεν υπάρχουν κατηγορίες.",
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
}) => {
    // Λίστα κατηγοριών.
    const [categories, setCategories] =
        useState([]);

    // Κατάσταση φόρτωσης της λίστας.
    const [loading, setLoading] =
        useState(false);

    // Σφάλμα φόρτωσης της λίστας.
    const [error, setError] =
        useState("");

    // Κατηγορία που επεξεργάζεται ο χρήστης.
    const [selectedCategory, setSelectedCategory] =
        useState(null);

    // Ενεργό mode του SidePanel.
    const [panelMode, setPanelMode] =
        useState("");

    // Κατάσταση αποθήκευσης create ή update.
    const [savingCategory, setSavingCategory] =
        useState(false);

    // ID κατηγορίας που διαγράφεται.
    const [deletingCategoryId, setDeletingCategoryId] =
        useState(null);

    const panelIsOpen =
        panelMode === "create" ||
        panelMode === "edit";

    // Φορτώνει τις κατηγορίες από το αντίστοιχο API.
    //
    // UseCallback:
    // Κρατά σταθερή την ίδια function αίτημα ανάμεσα στα renders.
    // Η loadCategories δημιουργείται ξανά μόνο όταν αλλάξει
    // το token ή το fetchItems, ώστε να χρησιμοποιείται με ασφάλεια
    // ως dependency στο useEffect χωρίς περιττές επαναλήψεις.
    const loadCategories = useCallback(async () => {
        if (!token || !fetchItems) {
            setCategories([]);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data = await fetchItems(token);

            setCategories(
                Array.isArray(data)
                    ? data
                    : []
            );
        } catch (requestError) {
            setCategories([]);

            const message =
                requestError?.message ||
                "Σφάλμα φόρτωσης κατηγοριών.";

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [token, fetchItems]);

    // Φορτώνει ξανά τη λίστα όταν αλλάζει tab/API function.
    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    // Ανοίγει το SidePanel σε create mode.
    const handleCreateCategory = () => {
        setSelectedCategory(null);
        setPanelMode("create");
    };

    // Ανοίγει το SidePanel σε edit mode.
    const handleEditCategory = (category) => {
        if (!category) {
            return;
        }

        setSelectedCategory(category);
        setPanelMode("edit");
    };

    // Κλείνει το SidePanel και καθαρίζει την επιλογή.
    const handleClosePanel = () => {
        if (savingCategory) {
            return;
        }

        setSelectedCategory(null);
        setPanelMode("");
    };

    // Δημιουργεί νέα κατηγορία.
    const handleCreateSave = async (data) => {
        if (!createItem) {
            return;
        }

        try {
            setSavingCategory(true);

            const newCategory =
                await createItem(token, data);

            if (!newCategory?.id) {
                throw new Error(
                    "Η κατηγορία δημιουργήθηκε, αλλά δεν επιστράφηκαν έγκυρα δεδομένα."
                );
            }

            setCategories((previousCategories) => [
                newCategory,
                ...previousCategories,
            ]);

            handleClosePanel();

            toast.success(
                "Η κατηγορία δημιουργήθηκε."
            );
        } catch (requestError) {
            toast.error(
                requestError?.message ||
                "Σφάλμα δημιουργίας κατηγορίας."
            );
        } finally {
            setSavingCategory(false);
        }
    };

    // Ενημερώνει υπάρχουσα κατηγορία.
    const handleEditSave = async (id, data) => {
        if (!updateItem || !id) {
            return;
        }

        try {
            setSavingCategory(true);

            const updatedCategory =
                await updateItem(token, id, data);

            setCategories((previousCategories) =>
                previousCategories.map((category) =>
                    String(category.id) === String(id)
                        ? {
                            ...category,
                            ...updatedCategory,
                        }
                        : category
                )
            );

            handleClosePanel();

            toast.success(
                "Η κατηγορία ενημερώθηκε."
            );
        } catch (requestError) {
            toast.error(
                requestError?.message ||
                "Σφάλμα ενημέρωσης κατηγορίας."
            );
        } finally {
            setSavingCategory(false);
        }
    };

    // Διαγράφει μία κατηγορία.
    const handleDeleteCategory = async (id) => {
        if (!deleteItem || !id) {
            return;
        }

        const confirmed = window.confirm(
            "Θέλεις σίγουρα να διαγράψεις αυτή την κατηγορία;"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingCategoryId(id);

            await deleteItem(token, id);

            setCategories((previousCategories) =>
                previousCategories.filter(
                    (category) =>
                        String(category.id) !==
                        String(id)
                )
            );

            if (
                String(selectedCategory?.id) ===
                String(id)
            ) {
                handleClosePanel();
            }

            toast.success(
                "Η κατηγορία διαγράφηκε."
            );
        } catch (requestError) {
            toast.error(
                requestError?.message ||
                "Σφάλμα διαγραφής κατηγορίας."
            );
        } finally {
            setDeletingCategoryId(null);
        }
    };

    return (
        <div
            className={`with-side-panel ${panelIsOpen
                ? "has-panel"
                : ""
                }`}
            style={{
                "--side-panel-width": "380px",
            }}
        >
            <div className="categories-container">
                {/* Δημιουργία νέας κατηγορίας. */}
                <button
                    type="button"
                    className="btn-action btn-view"
                    onClick={handleCreateCategory}
                    disabled={savingCategory}
                >
                    + Νέα Κατηγορία
                </button>

                <div className="categories-page-layout scrollable-y">
                    {/* Κατάσταση φόρτωσης. */}
                    <AppStatus
                        loading={loading}
                        error={error}
                        empty={
                            !loading &&
                            !error &&
                            categories.length === 0
                        }
                        loadingMessage="Φόρτωση κατηγοριών..."
                        emptyMessage={emptyText}
                        center
                    />

                    {/* Πίνακας κατηγοριών. */}
                    {!loading &&
                        !error &&
                        categories.length > 0 && (
                            <div className="table-wrapper scrollable-x">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th width="60">
                                                ID
                                            </th>

                                            <th>
                                                Όνομα
                                            </th>

                                            <th width="120">
                                                Κατάσταση
                                            </th>

                                            <th width="180">
                                                Ενέργειες
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {categories.map(
                                            (category) => {
                                                const isActive =
                                                    Number(
                                                        category.status
                                                    ) === 1;

                                                const isDeleting =
                                                    String(
                                                        deletingCategoryId
                                                    ) ===
                                                    String(
                                                        category.id
                                                    );

                                                return (
                                                    <tr
                                                        key={
                                                            category.id
                                                        }
                                                    >
                                                        <td>
                                                            {
                                                                category.id
                                                            }
                                                        </td>

                                                        <td>
                                                            {category.name ||
                                                                "Χωρίς όνομα"}
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={`status-badge ${isActive
                                                                    ? "btn-active"
                                                                    : "status-blocked"
                                                                    }`}
                                                            >
                                                                {isActive
                                                                    ? "Ενεργή"
                                                                    : "Ανενεργή"}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <div className="action-group">
                                                                <button
                                                                    type="button"
                                                                    className="btn-action btn-edit"
                                                                    onClick={() =>
                                                                        handleEditCategory(
                                                                            category
                                                                        )
                                                                    }
                                                                >
                                                                    Επεξεργασία
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    className="btn-action btn-delete"
                                                                    disabled={
                                                                        isDeleting
                                                                    }
                                                                    onClick={() =>
                                                                        handleDeleteCategory(
                                                                            category.id
                                                                        )
                                                                    }
                                                                >
                                                                    {isDeleting
                                                                        ? "Διαγραφή..."
                                                                        : "Διαγραφή"}
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                </div>
            </div>

            {/* SidePanel δημιουργίας και επεξεργασίας. */}
            <SidePanel
                open={panelIsOpen}
                title={
                    panelMode === "create"
                        ? "Νέα Κατηγορία"
                        : "Επεξεργασία Κατηγορίας"
                }
                subtitle={
                    panelMode === "create"
                        ? "Δημιουργία νέας κατηγορίας"
                        : selectedCategory?.name || ""
                }
                onClose={handleClosePanel}
            >
                {panelMode === "create" && (
                    <CategoryEditForm
                        saving={savingCategory}
                        onSave={handleCreateSave}
                        onCancel={handleClosePanel}
                    />
                )}

                {panelMode === "edit" &&
                    selectedCategory && (
                        <CategoryEditForm
                            category={
                                selectedCategory
                            }
                            saving={
                                savingCategory
                            }
                            onSave={
                                handleEditSave
                            }
                            onCancel={
                                handleClosePanel
                            }
                        />
                    )}
            </SidePanel>
        </div>
    );
};

export default CategoriesTable;