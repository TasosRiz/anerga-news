//
//  Form δημιουργίας και επεξεργασίας κατηγορίας.
//
//  Αναλαμβάνει:
//  - αρχικοποίηση των πεδίων
//  - ενημέρωση του form state
//  - δημιουργία του payload
//  - διαφορετικό submit για create και edit
//

import { useEffect, useState } from "react";

import "./CategoryEditForm.css";

const initialForm = {
    name: "",
    status: "1",
};

const CategoryEditForm = ({
    category = null,
    saving = false,
    onSave,
    onCancel,
}) => {
    // Τρέχουσες τιμές της φόρμας.
    const [form, setForm] =
        useState(initialForm);

    // Τοπικό validation error.
    const [error, setError] =
        useState("");

    // Ενημερώνει τα πεδία όταν αλλάζει η επιλεγμένη κατηγορία.
    // Στο create mode επαναφέρει τις αρχικές τιμές.
    useEffect(() => {
        if (!category) {
            setForm(initialForm);
            setError("");
            return;
        }

        setForm({
            name: category.name || "",
            status: String(category.status ?? "1"),
        });

        setError("");
    }, [category]);

    // Ενημερώνει το αντίστοιχο πεδίο του form.
    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    // Στο edit στέλνει το category id μαζί με το payload.
    // Στο create στέλνει μόνο το payload,
    // επειδή δεν υπάρχει ακόμη category id.
    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedName =
            form.name.trim();

        if (!trimmedName) {
            setError(
                "Το όνομα της κατηγορίας είναι υποχρεωτικό."
            );
            return;
        }

        const payload = {
            name: trimmedName,
            status: Number(form.status),
        };

        if (category?.id) {
            await onSave?.(
                category.id,
                payload
            );

            return;
        }

        await onSave?.(payload);
    };

    return (
        <form
            className="category-edit-form"
            onSubmit={handleSubmit}
        >
            <div className="form-group">
                <label
                    className="label-text"
                    htmlFor="category-name"
                >
                    Όνομα Κατηγορίας
                </label>

                <input
                    id="category-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="π.χ. Φωτισμός"
                    disabled={saving}
                    required
                />
            </div>

            <div className="form-group">
                <label
                    className="label-text"
                    htmlFor="category-status"
                >
                    Κατάσταση
                </label>

                <select
                    id="category-status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    disabled={saving}
                    required
                >
                    <option value="1">
                        Ενεργή
                    </option>

                    <option value="0">
                        Ανενεργή
                    </option>
                </select>
            </div>

            {/* Εμφανίζει μόνο validation errors της φόρμας. */}
            {error && (
                <p
                    className="category-edit-error"
                    role="alert"
                >
                    {error}
                </p>
            )}

            <div className="category-edit-actions">
                {onCancel && (
                    <button
                        type="button"
                        className="btn-action btn-cancel"
                        onClick={onCancel}
                        disabled={saving}
                    >
                        Ακύρωση
                    </button>
                )}

                <button
                    type="submit"
                    className="btn-action btn-save"
                    disabled={saving}
                >
                    {saving
                        ? "Αποθήκευση..."
                        : "Αποθήκευση"}
                </button>
            </div>
        </form>
    );
};

export default CategoryEditForm;