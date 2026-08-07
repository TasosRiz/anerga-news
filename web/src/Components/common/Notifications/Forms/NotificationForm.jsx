import { useEffect, useState } from "react";
import "./NotificationForm.css";

const emptyNotification = {
    title: "",
    message: "",
    type: "info",
    recipients: "all",
    status: "active",
};

// Κοινή φόρμα δημιουργίας και επεξεργασίας ειδοποίησης.
//
// Αναλαμβάνει:
// - αρχικοποίηση των πεδίων για create / edit
// - validation των βασικών πεδίων
// - επιλογή τύπου και κατάστασης
// - επιλογή παραληπτών μόνο κατά τη δημιουργία
// - δημιουργία του payload και αποστολή του στο parent μέσω onSave
//
// Στο edit mode δεν αλλάζουν οι παραλήπτες,
// επειδή έχουν ήδη αποθηκευτεί στο notification_user pivot.
const NotificationForm = ({
    mode = "create",
    notification = null,
    saving = false,
    onSave,
    onCancel,
}) => {
    const isEdit = mode === "edit";

    const [form, setForm] = useState(emptyNotification);

    const [errors, setErrors] = useState({});

    /*
    |--------------------------------------------------------------------------
    | Form initialization
    |--------------------------------------------------------------------------
    | Στο edit mode γεμίζει τη φόρμα με τα στοιχεία της ειδοποίησης.
    | Στο create mode χρησιμοποιεί κενές/default τιμές.
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        if (isEdit && notification) {
            setForm({
                title: notification.title ?? "",
                message: notification.message ?? "",
                type: notification.type ?? "info",
                recipients: notification.recipients ?? "all",
                status: notification.status ?? "active",
            });
        } else {
            setForm(emptyNotification);
        }

        setErrors({});
    }, [isEdit, notification]);

    // Input change
    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value,
        }));

        // Καθαρίζει το error του πεδίου όταν ο χρήστης το αλλάξει.
        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: "",
        }));
    };

    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */
    const validateForm = () => {
        const nextErrors = {};

        if (!form.title.trim()) {
            nextErrors.title = "Ο τίτλος είναι υποχρεωτικός.";
        }

        if (!form.message.trim()) {
            nextErrors.message = "Το μήνυμα είναι υποχρεωτικό.";
        }

        if (!form.type) {
            nextErrors.type = "Επιλέξτε τύπο ειδοποίησης.";
        }

        if (!isEdit && !form.recipients) {
            nextErrors.recipients = "Επιλέξτε παραλήπτες.";
        }

        if (!form.status) {
            nextErrors.status = "Επιλέξτε κατάσταση.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm() || !onSave) {
            return;
        }

        const payload = {
            title: form.title.trim(),
            message: form.message.trim(),
            type: form.type,
            status: form.status,
        };

        if (!isEdit) {
            payload.recipients = form.recipients;
        }

        onSave(payload);
    };

    return (
        <form
            className="notification-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="notification-form-group">
                <label htmlFor="notification-title">
                    Τίτλος
                    <span className="required-mark">*</span>
                </label>

                <input
                    id="notification-title"
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Γράψτε τον τίτλο της ειδοποίησης"
                    disabled={saving}
                    className={errors.title ? "has-error" : ""}
                />

                {errors.title && (
                    <span className="notification-form-error">
                        {errors.title}
                    </span>
                )}
            </div>

            <div className="notification-form-group">
                <label htmlFor="notification-message">
                    Μήνυμα
                    <span className="required-mark">*</span>
                </label>

                <textarea
                    id="notification-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Γράψτε το μήνυμα της ειδοποίησης"
                    disabled={saving}
                    className={errors.message ? "has-error" : ""}
                />

                {errors.message && (
                    <span className="notification-form-error">
                        {errors.message}
                    </span>
                )}
            </div>

            <div className="notification-form-group">
                <label htmlFor="notification-type">
                    Τύπος
                    <span className="required-mark">*</span>
                </label>

                <select
                    id="notification-type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    disabled={saving}
                    className={errors.type ? "has-error" : ""}
                >
                    <option value="info">Ενημέρωση</option>
                    <option value="warning">Προειδοποίηση</option>
                    <option value="success">Επιτυχία</option>
                    <option value="urgent">Επείγον</option>
                </select>

                {errors.type && (
                    <span className="notification-form-error">
                        {errors.type}
                    </span>
                )}
            </div>

            {!isEdit && (
                <div className="notification-form-group">
                    <label htmlFor="notification-recipients">
                        Παραλήπτες
                        <span className="required-mark">*</span>
                    </label>

                    <select
                        id="notification-recipients"
                        name="recipients"
                        value={form.recipients}
                        onChange={handleChange}
                        disabled={saving}
                        className={errors.recipients ? "has-error" : ""}
                    >
                        <option value="all">Όλοι οι χρήστες</option>
                        <option value="active">Ενεργοί χρήστες</option>
                    </select>

                    {errors.recipients && (
                        <span className="notification-form-error">
                            {errors.recipients}
                        </span>
                    )}
                </div>
            )}

            <div className="notification-form-group">
                <label htmlFor="notification-status">
                    Κατάσταση
                    <span className="required-mark">*</span>
                </label>

                <select
                    id="notification-status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    disabled={saving}
                    className={errors.status ? "has-error" : ""}
                >
                    <option value="active">Ενεργή</option>
                    <option value="inactive">Ανενεργή</option>
                </select>

                {errors.status && (
                    <span className="notification-form-error">
                        {errors.status}
                    </span>
                )}
            </div>

            <div className="notification-form-actions">
                <button
                    type="button"
                    className="btn-action btn-cancel"
                    onClick={onCancel}
                    disabled={saving}
                >
                    Ακύρωση
                </button>

                <button
                    type="submit"
                    className="btn-action btn-save"
                    disabled={saving}
                >
                    {saving
                        ? "Αποθήκευση..."
                        : isEdit
                            ? "Αποθήκευση αλλαγών"
                            : "Δημιουργία ειδοποίησης"}
                </button>
            </div>
        </form>
    );
};

export default NotificationForm;