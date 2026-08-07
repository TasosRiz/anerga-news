import React from "react";
import UserSidebar from "./UserSidebar";
import "./ReportsPage.css";

const ReportsPage = ({ onLogout }) => {
    return (
        <div className="user-dashboard-layout">
            <div className="user-dashboard-sidebar">
                <UserSidebar onLogout={onLogout} />
            </div>

            <div className="user-dashboard-content">
                {/* εδώ ο πίνακας με τα reports */}
            </div>
        </div>
    );
};

export default ReportsPage;