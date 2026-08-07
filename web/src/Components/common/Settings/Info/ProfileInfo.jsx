import { useEffect, useState } from "react";

// API
import { pingApi } from "../../Auth/api/auth";

// Data
import { getSystemInfo } from "./systemInfo";

// CSS
import "./ProfileInfo.css";

//  Section πληροφοριών συστήματος.
//
//  Αναλαμβάνει:
//  - έλεγχο σύνδεσης με το API
//  - δημιουργία των system info items
//  - εμφάνιση κατάστασης και βασικών πληροφοριών εφαρμογής
const ProfileInfo = () => {
    // Κατάσταση σύνδεσης με το API.
    const [apiStatus, setApiStatus] = useState({
        connected: false,
        checkedAt: null,
        loading: true,
    });

    // Ελέγχει αν το API είναι διαθέσιμο.
    useEffect(() => {
        const checkApiStatus = async () => {
            try {
                setApiStatus((previousStatus) => ({
                    ...previousStatus,
                    loading: true,
                }));

                const data = await pingApi();

                setApiStatus({
                    connected: true,
                    checkedAt:
                        data?.checked_at ||
                        new Date().toISOString(),
                    loading: false,
                });
            } catch {
                setApiStatus({
                    connected: false,
                    checkedAt: new Date().toISOString(),
                    loading: false,
                });
            }
        };

        checkApiStatus();
    }, []);

    // Δημιουργεί τις πληροφορίες συστήματος
    // με βάση την τρέχουσα κατάσταση του API.
    const systemInfo = getSystemInfo(apiStatus);

    return (
        <div className="profile-info-section box">
            <div className="info-section-header">
                <h3 className="section-title">
                    Πληροφορίες Συστήματος
                </h3>

                <p className="section-desc">
                    Βασικές πληροφορίες για το σύστημα και την εφαρμογή.
                </p>
            </div>

            <div className="info-cards-grid">
                {systemInfo.map((item, index) => (
                    <div
                        className="info-card"
                        key={
                            item.id ||
                            `${item.label}-${index}`
                        }
                    >
                        <div
                            className={`info-card-icon ${item.type || ""}`}
                        >
                            {item.icon}
                        </div>

                        <div className="info-card-content">
                            <span className="label-text">
                                {item.label}
                            </span>

                            {item.badge ? (
                                <strong
                                    className={`info-status-badge ${item.type || ""
                                        }`}
                                >
                                    {item.value}
                                </strong>
                            ) : (
                                <strong className="value-text">
                                    {item.value}
                                </strong>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileInfo;