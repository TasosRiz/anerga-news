import { useEffect, useState } from "react";
// ΒΛΕΠΕ MD

// Components
import SidePanel from "../../components/SidePanel/SidePanel";
import ReportDetailsLayout from "./ReportDetailsLayout";
import ReportForm from "../Forms/ReportForm";

// API
import { apiUrl } from "../../Auth/api/auth";
import { fetchActiveCategories } from "../../Categories/api/reportsCategories";
import {
    createReport,
    updateReport,
} from "../api/reports";

// Hooks
import { useAuth } from "../../Auth/provider/AuthProvider";
import { useReportForm } from "../hooks/useReportForm";
import { useAddressSearch } from "../hooks/useAddressSearch";

//  Επαναχρησιμοποιήσιμο SidePanel αιτήματος.
//
//  Υποστηρίζει προαιρετικά:
//  - δημιουργία αιτήματος
//  - προβολή αιτήματος
//  - επεξεργασία αιτήματος
//
//  Το parent component παραμένει υπεύθυνο για:
//  - το ενεργό mode
//  - την επιλεγμένη αίτημα
//  - το άνοιγμα και κλείσιμο του panel
//  - την ενημέρωση της λίστας μετά από create ή edit

const ReportSidePanel = ({
    open = false,
    mode = "view",
    report = null,

    loading = false,
    error = "",

    allowCreate = false,
    allowEdit = false,

    showUser = false,
    showStatus = true,

    mediaUploadOnly = false,
    mediaFolderSlug = "reports",

    onClose,
    onEdit,
    onCancelEdit,
    onCreated,
    onUpdated,
}) => {
    // Token του συνδεδεμένου χρήστη.
    const { token } = useAuth();

    // Ενεργές κατηγορίες αιτημάτων.
    const [categories, setCategories] = useState([]);

    // Κατάσταση φόρτωσης κατηγοριών.
    const [categoriesLoading, setCategoriesLoading] =
        useState(false);

    // Σφάλμα φόρτωσης κατηγοριών.
    const [categoriesError, setCategoriesError] =
        useState("");

    // Κατάσταση αποθήκευσης create ή update.
    const [savingReport, setSavingReport] =
        useState(false);

    // Σφάλμα φόρμας ή API request.
    const [formError, setFormError] =
        useState("");

    // State και λειτουργίες της φόρμας αιτήματος.
    const {
        title,
        setTitle,

        description,
        setDescription,

        category,
        setCategory,

        status,
        setStatus,

        address,
        setAddress,

        city,
        setCity,

        postalCode,
        setPostalCode,

        latitude,
        setLatitude,

        longitude,
        setLongitude,

        photo,
        setPhoto,

        resetForm,
        fillForm,
        validateForm,
        buildCreateFormData,
        buildUpdateFormData,
    } = useReportForm();

    // Αναζήτηση διεύθυνσης και ενημέρωση χάρτη.
    const { handleAddressSearch } = useAddressSearch({
        address,
        city,
        postalCode,

        setAddress,
        setCity,
        setPostalCode,

        setLatitude,
        setLongitude,

        setError: setFormError,
    });

    // Καθορίζει ποιο περιεχόμενο επιτρέπεται
    // να εμφανιστεί βάσει mode και permissions.
    const isCreateMode =
        mode === "create" && allowCreate;

    const isViewMode =
        mode === "view" && Boolean(report);

    const isEditMode =
        mode === "edit" &&
        allowEdit &&
        Boolean(report);

    // Καθαρίζει ή συμπληρώνει τη φόρμα
    // όταν αλλάζει το mode ή η αίτημα.
    useEffect(() => {
        setFormError("");
        setCategoriesError("");

        if (!open) {
            resetForm();
            return;
        }

        if (isCreateMode) {
            resetForm();
            return;
        }

        if (isEditMode) {
            fillForm(report);
            return;
        }

        if (isViewMode) {
            resetForm();
        }
    }, [
        open,
        mode,
        report?.id,
        allowCreate,
        allowEdit,
    ]);

    // Φορτώνει τις κατηγορίες μόνο όταν
    // εμφανίζεται φόρμα create ή edit.
    useEffect(() => {
        if (
            !token ||
            !open ||
            (!isCreateMode && !isEditMode)
        ) {
            return;
        }

        let isActive = true;

        const loadCategories = async () => {
            try {
                setCategoriesLoading(true);
                setCategoriesError("");

                const data =
                    await fetchActiveCategories(token);

                if (!isActive) {
                    return;
                }

                setCategories(
                    Array.isArray(data)
                        ? data
                        : []
                );
            } catch (requestError) {
                if (!isActive) {
                    return;
                }

                setCategories([]);

                setCategoriesError(
                    requestError?.message ||
                    "Σφάλμα φόρτωσης κατηγοριών."
                );
            } finally {
                if (isActive) {
                    setCategoriesLoading(false);
                }
            }
        };

        loadCategories();

        return () => {
            isActive = false;
        };
    }, [
        token,
        open,
        isCreateMode,
        isEditMode,
    ]);


    // Δημιουργεί νέα αίτημα.
    const handleCreateSubmit = async (event) => {
        event.preventDefault();
        setFormError("");

        if (!allowCreate) {
            setFormError(
                "Δεν επιτρέπεται η δημιουργία αιτήματος."
            );
            return;
        }

        if (!token) {
            setFormError(
                "Δεν υπάρχει ενεργή σύνδεση χρήστη."
            );
            return;
        }

        const validationError = validateForm();

        if (validationError) {
            setFormError(validationError);
            return;
        }

        try {
            setSavingReport(true);

            const formData =
                buildCreateFormData();

            const newReport = await createReport(
                token,
                formData
            );

            if (!newReport?.id) {
                throw new Error(
                    "Η αίτημα δημιουργήθηκε, αλλά δεν επιστράφηκαν έγκυρα δεδομένα."
                );
            }

            resetForm();
            setFormError("");

            // Ενημερώνει το parent για τη νέα αίτημα.
            onCreated?.(newReport);
        } catch (requestError) {
            setFormError(
                requestError?.message ||
                "Σφάλμα δημιουργίας αιτήματος."
            );
        } finally {
            setSavingReport(false);
        }
    };

    // Ενημερώνει την επιλεγμένη αίτημα.
    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        setFormError("");

        if (!allowEdit) {
            setFormError(
                "Δεν επιτρέπεται η επεξεργασία αιτήματος."
            );
            return;
        }

        if (!token) {
            setFormError(
                "Δεν υπάρχει ενεργή σύνδεση χρήστη."
            );
            return;
        }

        if (!report?.id) {
            setFormError(
                "Δεν βρέθηκε η αίτημα."
            );
            return;
        }

        const validationError = validateForm({
            requireStatus: true,
        });

        if (validationError) {
            setFormError(validationError);
            return;
        }

        try {
            setSavingReport(true);

            const formData =
                buildUpdateFormData();

            const updatedReport = await updateReport(
                token,
                report.id,
                formData
            );

            if (!updatedReport?.id) {
                throw new Error(
                    "Η αίτημα ενημερώθηκε, αλλά δεν επιστράφηκαν έγκυρα δεδομένα."
                );
            }

            setPhoto("");
            setFormError("");

            onUpdated?.(updatedReport);
        } catch (requestError) {
            setFormError(
                requestError?.message ||
                "Σφάλμα ενημέρωσης αιτήματος."
            );
        } finally {
            setSavingReport(false);
        }
    };

    // Κλείνει το panel και καθαρίζει τη φόρμα.
    const handleClose = () => {
        setFormError("");
        setCategoriesError("");
        resetForm();
        onClose?.();
    };

    // Ακυρώνει το edit και επιστρέφει στο view.
    const handleCancelEdit = () => {
        setFormError("");
        setCategoriesError("");
        resetForm();
        onCancelEdit?.();
    };

    // Το panel μπορεί να παραμένει ανοιχτό
    // κατά τη φόρτωση ή σε εξωτερικό error.
    const panelIsOpen = Boolean(
        open ||
        loading ||
        error
    );

    // Τίτλος ανάλογα με το ενεργό mode.
    const panelTitle = isCreateMode
        ? "Νέα Αίτημα"
        : isEditMode
            ? "Επεξεργασία Αιτήματος"
            : "Λεπτομέρειες Αιτήματος";

    // Υπότιτλος ανάλογα με το ενεργό mode.
    const panelSubtitle = isCreateMode
        ? "Δημιουργία νέας αιτήματος"
        : report?.title || "";

    return (
        <SidePanel
            open={panelIsOpen}
            title={panelTitle}
            subtitle={panelSubtitle}
            loading={loading}
            error={error}
            onClose={handleClose}
        >
            {/* Προβολή επιλεγμένης αιτήματος. */}
            {isViewMode && (
                <>
                    <ReportDetailsLayout
                        report={report}
                        showUser={showUser}
                    />

                    {/* Το edit εμφανίζεται μόνο όπου επιτρέπεται. */}
                    {allowEdit && (
                        <div className="side-panel-actions">
                            <button
                                type="button"
                                className="btn-action btn-edit"
                                onClick={() =>
                                    onEdit?.(report)
                                }
                            >
                                Επεξεργασία
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Δημιουργία νέας αιτήματος. */}
            {isCreateMode && (
                <ReportForm
                    title={title}
                    setTitle={setTitle}

                    description={description}
                    setDescription={setDescription}

                    address={address}
                    setAddress={setAddress}

                    city={city}
                    setCity={setCity}

                    postalCode={postalCode}
                    setPostalCode={setPostalCode}

                    onAddressSearch={
                        handleAddressSearch
                    }

                    category={category}
                    setCategory={setCategory}

                    categories={categories}
                    categoriesLoading={
                        categoriesLoading
                    }
                    showCategory

                    latitude={latitude}
                    setLatitude={setLatitude}

                    longitude={longitude}
                    setLongitude={setLongitude}

                    showMap

                    photo={photo}
                    setPhoto={setPhoto}
                    showPhoto

                    mediaUploadOnly={
                        mediaUploadOnly
                    }
                    mediaFolderSlug={
                        mediaFolderSlug
                    }

                    // Στο create δεν εμφανίζεται status.
                    showStatus={false}

                    loading={savingReport}
                    error={
                        formError ||
                        categoriesError
                    }

                    submitText="Δημιουργία Αιτήματος"
                    loadingText="Αποθήκευση..."

                    onSubmit={handleCreateSubmit}
                    onCancel={handleClose}
                />
            )}

            {/* Επεξεργασία επιλεγμένης αιτήματος. */}
            {isEditMode && (
                <ReportForm
                    title={title}
                    setTitle={setTitle}

                    description={description}
                    setDescription={setDescription}

                    address={address}
                    setAddress={setAddress}

                    city={city}
                    setCity={setCity}

                    postalCode={postalCode}
                    setPostalCode={setPostalCode}

                    onAddressSearch={
                        handleAddressSearch
                    }

                    category={category}
                    setCategory={setCategory}

                    categories={categories}
                    categoriesLoading={
                        categoriesLoading
                    }
                    showCategory

                    latitude={latitude}
                    setLatitude={setLatitude}

                    longitude={longitude}
                    setLongitude={setLongitude}

                    showMap

                    currentPhoto={report.photo}
                    photo={photo}
                    setPhoto={setPhoto}
                    showPhoto

                    mediaUploadOnly={
                        mediaUploadOnly
                    }
                    mediaFolderSlug={
                        mediaFolderSlug
                    }

                    status={status}
                    setStatus={setStatus}
                    showStatus={showStatus}

                    loading={savingReport}
                    error={
                        formError ||
                        categoriesError
                    }

                    submitText="Αποθήκευση Αλλαγών"
                    loadingText="Αποθήκευση..."

                    onSubmit={handleUpdateSubmit}
                    onCancel={handleCancelEdit}
                />
            )}
        </SidePanel>
    );
};

export default ReportSidePanel;