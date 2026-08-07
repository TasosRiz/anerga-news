import { useState } from "react";
import "./CreateForm.css";

const CreateForm = ({
    fields = [],
    initialValues = {},
    saving = false,
    submitText = "Αποθήκευση",
    savingText = "Αποθήκευση...",
    onSave,
}) => {
    const [form, setForm] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!onSave) return;

        onSave(form);
    };

    return (
        <form className="create-form" onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div className="form-group" key={field.name}>
                    <label className="label-text">{field.label}</label>

                    {field.type === "textarea" ? (
                        <textarea
                            name={field.name}
                            value={form[field.name] || ""}
                            onChange={handleChange}
                            rows={field.rows || 5}
                            placeholder={field.placeholder || ""}
                            required={field.required || false}
                        />
                    ) : field.type === "select" ? (
                        <select
                            name={field.name}
                            value={form[field.name] || ""}
                            onChange={handleChange}
                            required={field.required || false}
                        >
                            {(field.options || []).map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type || "text"}
                            name={field.name}
                            value={form[field.name] || ""}
                            onChange={handleChange}
                            placeholder={field.placeholder || ""}
                            required={field.required || false}
                        />
                    )}
                </div>
            ))}

            <div className="create-form-actions">
                <button
                    type="submit"
                    className="btn-action btn-save"
                    disabled={saving}
                >
                    {saving ? savingText : submitText}
                </button>
            </div>
        </form>
    );
};

export default CreateForm;