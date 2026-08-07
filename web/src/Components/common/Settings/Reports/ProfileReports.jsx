import "./ProfileReports.css";

import { reportSettings } from "./reportSettings";

//  Section προβολής ρυθμίσεων αιτημάτων.
//
//  Αναλαμβάνει:
//  - εμφάνιση των διαθέσιμων report settings
//  - εμφάνιση τιμών ή status badges
//
const ProfileReports = () => {
    return (
        <div className="profile-reports-section box">
            <div className="reports-settings-header">
                <h3 className="section-title">
                    Ρυθμίσεις Αιτημάτων
                </h3>

                <p className="section-desc">
                    Βασικές επιλογές που αφορούν τη λειτουργία των αιτημάτων.
                </p>
            </div>

            <div className="reports-settings-main">
                {reportSettings.map((setting, index) => {
                    const statusClass =
                        setting.status || "active";

                    return (
                        <div
                            className="reports-settings-row"
                            key={setting.id || `${setting.label}-${index}`}
                        >
                            <div>
                                <span className="label-text">
                                    {setting.label}
                                </span>

                                <p className="section-desc">
                                    {setting.description}
                                </p>
                            </div>

                            {setting.badge ? (
                                <span
                                    className={`settings-status ${statusClass}`}
                                >
                                    {setting.value}
                                </span>
                            ) : (
                                <strong className="value-text">
                                    {setting.value}
                                </strong>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfileReports;