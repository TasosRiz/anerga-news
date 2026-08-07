import {
    Link,
    useLocation,
} from "react-router-dom";

import "./SidebarMenu.css";

// Κοινό component sidebar για διαφορετικές περιοχές της εφαρμογής.
//
// Εμφανίζει δυναμικά τις επιλογές πλοήγησης,
// επισημαίνει το ενεργό route
// και κλείνει τα menus μετά την επιλογή συνδέσμου.
const SidebarMenu = ({
    sidebarOpen = false,
    onNavigate,
    variant = "user",
    title,
    items = [],
}) => {
    // Παρέχει πληροφορίες για το τρέχον URL.
    const location = useLocation();

    // Κλείνει το sidebar και τα υπόλοιπα menus
    // μετά την επιλογή ενός συνδέσμου.
    const handleNavigation = () => {
        onNavigate?.();
    };

    // Ελέγχει αν μία επιλογή αντιστοιχεί
    // στο ενεργό route.
    //
    // Με activeType "startsWith" παραμένει ενεργή
    // και στα nested routes.
    const isItemActive = (item) => {
        if (item.activeType === "startsWith") {
            return location.pathname.startsWith(
                item.path
            );
        }

        return location.pathname === item.path;
    };

    return (
        <aside
            className={`${variant}-sidebar-menu ${sidebarOpen ? "active" : ""
                }`}
        >
            <div className="sidebar-logo">
                <h3 className="user-sidebar-title">
                    {title}
                </h3>
            </div>

            <nav className="sidebar-menu-list">
                {items.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path}
                        onClick={handleNavigation}
                        className={`sidebar-item ${isItemActive(item)
                                ? "active"
                                : ""
                            }`}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default SidebarMenu;