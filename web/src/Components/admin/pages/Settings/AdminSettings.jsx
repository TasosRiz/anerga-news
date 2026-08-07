import PagesLayout from "../pages-layout/pages-layout";
import Settings from "../../../common/Settings/Settings";
import { useAuth } from "../../../common/Auth/provider/AuthProvider";

const AdminSettings = () => {
    // Παίρνει τα auth δεδομένα από το κοινό AuthProvider.
    const { token, user } = useAuth();

    return (
        <PagesLayout
            title="Settings"
            showSearch={false}
            showNotification={false}
        >
            <div className="account-tab-content">
                <Settings
                    token={token}
                    user={user}
                    variant="admin"
                />
            </div>
        </PagesLayout>
    );
};

export default AdminSettings;