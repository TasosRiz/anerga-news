import React from "react";
import "./dash-header.css";
import { BiNotification, BiSearch } from "react-icons/bi";


//   Κοινή επικεφαλίδα για τις σελίδες του dashboard.

//   Εμφανίζει τον τίτλο της σελίδας.
//   Προαιρετικά εμφανιζει πεδίο αναζήτησης,
//   actions και εικονίδιο ειδοποιήσεων.
const DashHeader = ({
    title = "Dashboard",
    showSearch = true,
    searchPlaceholder = "Search anything here...",
    searchValue = "",
    onSearchChange,
    showNotification = true,
    actions = null,
}) => {
    // Ενημερώνει το parent component με τη νέα τιμή αναζήτησης.
    // const handleSearchChange = (event) => {
    //     onSearchChange?.(event.target.value);
    // };

    return (
        <div className="dash-header">
            {/* Τίτλος της ενεργής dashboard σελίδας. */}
            <h1 className="dash-header-title">{title}</h1>

            <div className="dash-header-actions">
                {/* Προαιρετικό πεδίο αναζήτησης. */}
                {showSearch && (
                    <div className="dash-search-box">
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                        />
                        <BiSearch className="dash-header-icon" />
                    </div>
                )}

                {/* Προαιρετικά buttons ή άλλα actions της σελίδας. */}
                {actions}

                {/* Προαιρετικό button ειδοποιήσεων. */}
                {showNotification && (
                    <div className="dash-notify">
                        <BiNotification className="dash-header-icon" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashHeader;