import { useEffect, useState } from "react";
import "./UserEditForm.css";

//  Form επεξεργασίας χρήστη.
//
//  Αναλαμβάνει:
//  - αρχικοποίηση των στοιχείων χρήστη
//  - ενημέρωση του form state
//  - validation των απαιτούμενων πεδίων
//  - αποστολή του user id και του payload

const initialForm = {
    name: "",
    email: "",
    role: "user",
    status: "active",
};

const UserEditForm = ({
    user,
    onSave,
    onCancel,
    saving = false,
}) => {
    // Τρέχουσες τιμές της φόρμας.
    const [form, setForm] = useState(initialForm);

    // Τοπικό validation error.
    const [error, setError] = useState("");

    // Γεμίζει τη φόρμα όταν αλλάζει ο επιλεγμένος χρήστης.
    useEffect(() => {
        if (!user) {
            setForm(initialForm);
            setError("");
            return;
        }


        setForm({
            name: user.name || "",
            email: user.email || "",
            role: user.role || "user",
            status: user.status || "active",
        });

        setError("");
    }, [user]);

    // Ενημερώνει το αντίστοιχο πεδίο του form state.
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

    // Ελέγχει τα απαιτούμενα πεδία και στέλνει
    // το user id μαζί με τα ενημερωμένα δεδομένα.
    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = form.name.trim();
        const email = form.email.trim();

        if (!name) {
            setError("Το όνομα είναι υποχρεωτικό.");
            return;
        }

        if (!email) {
            setError("Το email είναι υποχρεωτικό.");
            return;
        }

        const payload = {
            name,
            email,
            role: form.role,
            status: form.status,
        };

        await onSave?.(user.id, payload);
    };

    return (
        <form className="user-edit-form" onSubmit={handleSubmit}>
            <div className="user-edit-profile">
                <div className="user-edit-avatar">
                    {form.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div>
                    <h4>{form.name || "Χρήστης"}</h4>
                    <p>{form.email || "Χωρίς email"}</p>
                </div>
            </div>

            <div className="form-group">
                <label>Όνομα</label>
                <input
                    id="user-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Όνομα χρήστη"
                    disabled={saving}
                    required
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    id="user-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email χρήστη"
                    disabled={saving}
                    required
                />
            </div>

            <div className="form-group">
                <label>Ρόλος</label>
                <select
                    id="user-role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    disabled={saving}
                >
                    <option value="user">
                        User
                    </option>

                    <option value="admin">
                        Admin
                    </option>

                    <option value="worker">
                        Worker
                    </option>
                </select>
            </div>

            <div className="form-group">
                <label>Κατάσταση</label>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            <div className="user-edit-actions">
                <button
                    type="submit"
                    className="btn-action btn-save"
                    disabled={saving}
                >
                    {saving ? "Αποθήκευση..." : "Αποθήκευση"}
                </button>
            </div>
        </form>
    );
};

export default UserEditForm;