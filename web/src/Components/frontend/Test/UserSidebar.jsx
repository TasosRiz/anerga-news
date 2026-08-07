import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./UserSidebar.css";

const UserSidebar = ({ onLogout }) => {
    const location = useLocation();

    const menuItems = [
        {
            id: "reports",
            label: "Οι Αιτήματα μου",
            path: "/reports",
        },
        {
            id: "create-report",
            label: "Νέα Αίτημα",
            path: "/reports/create",
        },
        {
            id: "profile",
            label: "Το Προφίλ μου",
            path: "/profile",
        },
    ];

    return (
        <aside className="user-sidebar">
            <div className="user-sidebar-card">
                <h3 className="user-sidebar-title">Ο Λογαριασμός μου</h3>

                <nav className="user-sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`user-sidebar-link ${location.pathname === item.path ? "active" : ""
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <button
                    type="button"
                    className="user-sidebar-logout"
                    onClick={onLogout}
                >
                    Αποσύνδεση
                </button>
            </div>
        </aside>
    );
};

export default UserSidebar;