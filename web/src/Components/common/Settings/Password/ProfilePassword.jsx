//
//  Form αλλαγής κωδικού πρόσβασης.
//
//  Αναλαμβάνει:
//  - ενημέρωση των πεδίων κωδικού
//  - validation πριν την αποστολή
//  - εμφάνιση loading και error state
//

import { useState } from "react";

// Notifications
import { toast } from "react-toastify";

// CSS
import "./ProfilePassword.css";

const initialForm = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
};

const ProfilePassword = ({
    token,
    onChangePassword,
}) => {
    // Τρέχουσες τιμές της φόρμας.
    const [form, setForm] = useState(initialForm);

    // Τοπικό validation error.
    const [error, setError] = useState("");

    // Κατάσταση αποθήκευσης νέου κωδικού.
    const [saving, setSaving] = useState(false);

    // Ενημερώνει το αντίστοιχο πεδίο της φόρμας.
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

    // Ελέγχει τα πεδία και στέλνει το request αλλαγής κωδικού.
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !form.currentPassword ||
            !form.newPassword ||
            !form.confirmPassword
        ) {
            setError("Συμπλήρωσε όλα τα πεδία.");
            return;
        }

        if (form.newPassword.length < 8) {
            setError(
                "Ο νέος κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες."
            );
            return;
        }

        if (
            form.newPassword !==
            form.confirmPassword
        ) {
            setError(
                "Η επιβεβαίωση κωδικού δεν ταιριάζει."
            );
            return;
        }

        try {
            setSaving(true);
            setError("");

            await onChangePassword?.(token, {
                current_password:
                    form.currentPassword,
                password:
                    form.newPassword,
                password_confirmation:
                    form.confirmPassword,
            });

            setForm(initialForm);

            toast.success(
                "Ο κωδικός ενημερώθηκε."
            );
        } catch (requestError) {
            const message =
                requestError?.message ||
                "Σφάλμα αλλαγής κωδικού.";

            setError(message);
            toast.error(message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form
            className="profile-password-section box"
            onSubmit={handleSubmit}
        >
            <div className="settings-section-header">
                <h3>Αλλαγή Κωδικού</h3>

                <span>
                    Ενημερώστε τον κωδικό πρόσβασής σας.
                </span>
            </div>

            <div className="settings-section-main">
                <div className="settings-row">
                    <label htmlFor="current-password">
                        Τρέχων Κωδικός
                    </label>

                    <input
                        id="current-password"
                        type="password"
                        name="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                        placeholder="Πληκτρολογήστε τον τρέχοντα κωδικό"
                        disabled={saving}
                        autoComplete="current-password"
                        required
                    />
                </div>

                <div className="settings-row">
                    <label htmlFor="new-password">
                        Νέος Κωδικός
                    </label>

                    <input
                        id="new-password"
                        type="password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        placeholder="Πληκτρολογήστε τον νέο κωδικό"
                        disabled={saving}
                        autoComplete="new-password"
                        required
                    />
                </div>

                <div className="settings-row">
                    <label htmlFor="confirm-password">
                        Επιβεβαίωση Νέου Κωδικού
                    </label>

                    <input
                        id="confirm-password"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Επιβεβαιώστε τον νέο κωδικό"
                        disabled={saving}
                        autoComplete="new-password"
                        required
                    />
                </div>

                {error && (
                    <p
                        className="profile-password-error"
                        role="alert"
                    >
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="btn-action btn-edit settings-save-button"
                    disabled={saving}
                >
                    {saving
                        ? "Αποθήκευση..."
                        : "Αποθήκευση Κωδικού"}
                </button>
            </div>
        </form>
    );
};

export default ProfilePassword;