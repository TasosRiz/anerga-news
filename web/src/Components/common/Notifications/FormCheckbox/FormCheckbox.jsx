import "./FormCheckbox.css";


// Κοινό reusable checkbox component για φόρμες.
//
// Αναλαμβάνει:
// - την εμφάνιση checkbox
// - την εμφάνιση label
// - την εμφάνιση βοηθητικού κειμένου
// - disabled state
// - την επιστροφή της αλλαγής μέσω onChange
//
// Χρησιμοποιείται αυτή τη στιγμή στο PostForm
// για την επιλογή αποστολής notification στους χρήστες.

const FormCheckbox = ({
    name,
    checked = false,
    onChange,
    label,
    helpText = "",
    disabled = false,
}) => {
    return (
        <div className="form-checkbox-group">
            <label className="form-checkbox">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />

                <span>{label}</span>
            </label>

            {helpText && (
                <small className="form-checkbox-help">
                    {helpText}
                </small>
            )}
        </div>
    );
};

export default FormCheckbox;