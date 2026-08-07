// ΔΕΣ MD

import { useId } from "react";
import "./SelectFilter.css";

//  Κοινό component φίλτρου επιλογής.

//  Εμφανίζει ένα select πεδίο με δυναμικές επιλογές
//  Επιστρέφει την επιλεγμένη τιμή στο parent component.

const SelectFilter = ({
    label = "",
    value,
    onChange,
    options = [],
    placeholder = "Όλα",
    disabled = false,
}) => {

    // Δημιουργεί μοναδικό id για τη σωστή σύνδεση label και select.
    const selectId = useId();

    // Ενημερώνει το parent component με τη νέα επιλεγμένη τιμή.
    const handleChange = (event) => {
        onChange?.(event.target.value);
    };

    return (
        <div className="select-filter">
            {/* Το label εμφανίζεται μόνο όταν έχει δοθεί σχετικό κείμενο. */}
            {label && (
                <label
                    className="select-filter-label"
                    htmlFor={selectId}
                >
                    {label}
                </label>
            )}

            <select
                id={selectId}
                className="select-filter-control"
                value={value}
                onChange={handleChange}
                disabled={disabled}
                aria-label={label || placeholder}
            >
                {/* Προεπιλεγμένη επιλογή που αντιστοιχεί σε όλα τα αποτελέσματα. */}
                <option value="">
                    {placeholder}
                </option>

                {/* Δημιουργία των διαθέσιμων επιλογών από το options array. */}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectFilter;