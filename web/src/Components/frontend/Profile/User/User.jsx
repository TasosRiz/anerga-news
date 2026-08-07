import "./User.css";

// Components
import DashHeader from "../../../common/components/DashHeader/dash-header";
import Settings from "../../../common/Settings/Settings";

// Auth
import { useAuth } from "../../../common/Auth/provider/AuthProvider";

//  Σελίδα προφίλ χρήστη.
//
//  Αναλαμβάνει:
//  - ανάγνωση του token και του user από το AuthProvider
//  - εμφάνιση των κοινών settings

const User = () => {
    // Παίρνει τα auth δεδομένα από το κοινό AuthProvider.
    const { token, user } = useAuth();

    return (
        <section className="account-section">
            <DashHeader
                title="Το Προφίλ μου"
                showSearch={false}
                showNotification={false}
            />

            <div className="account-tab-content">
                <Settings
                    token={token}
                    user={user}
                    variant="user"
                />
            </div>
        </section>
    );
};

export default User;