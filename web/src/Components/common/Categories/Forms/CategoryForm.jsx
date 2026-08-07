import { Link } from "react-router-dom";
import "./CategoryForm.css";

const CategoryForm = ({
    register,
    errors,
    loading = false,
    onSubmit,
    backPath = "/admin/dashboard/categories",
    submitText = "Αποθήκευση",
    loadingText = "Αποθήκευση...",
}) => {
    return (
        <form onSubmit={onSubmit} className="category-form-card box">
            <div className="form-group">
                <label className="label-text">Όνομα Κατηγορίας</label>
                <input
                    type="text"
                    placeholder="π.χ. Φωτισμός"
                    {...register("name", {
                        required: "Το όνομα είναι υποχρεωτικό.",
                    })}
                />
                {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

            <div className="form-group">
                <label className="label-text">Κατάσταση</label>

                <select
                    {...register("status", {
                        required: "Η κατάσταση είναι υποχρεωτική.",
                    })}
                >
                    <option value="" disabled>
                        Επιλέξτε κατάσταση
                    </option>
                    <option value="1">Ενεργή</option>
                    <option value="0">Ανενεργή</option>
                </select>
                {errors.status && <p className="error">{errors.status.message}</p>}
            </div>

            <div className="category-form-actions">
                <Link to={backPath} className="btn-action btn-secondary">
                    Ακύρωση
                </Link>

                <button
                    type="submit"
                    className="btn-action btn-save"
                    disabled={loading}
                >
                    {loading ? loadingText : submitText}
                </button>
            </div>
        </form >
    );
};

export default CategoryForm;