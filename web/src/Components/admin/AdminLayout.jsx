import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "./Navbar/AdminNavbar";
import AdminSidebar from "./AdminSidebar/AdminSidebar";

import "./AdminLayout.css";

// Κεντρικό layout του admin panel.
//
// Διαχειρίζεται το responsive navbar menu
// και το admin sidebar.
const AdminLayout = () => {
    // Κατάσταση του navbar menu.
    const [menuOpen, setMenuOpen] = useState(false);

    // Κατάσταση του admin sidebar.
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Ανοίγει ή κλείνει μαζί
    // το navbar menu και το sidebar.
    const toggleNavigation = () => {
        const nextOpenState = !(
            menuOpen || sidebarOpen
        );

        setMenuOpen(nextOpenState);
        setSidebarOpen(nextOpenState);
    };

    // Κλείνει το navbar menu και το sidebar.
    const closeAllMenus = () => {
        setMenuOpen(false);
        setSidebarOpen(false);
    };

    return (
        <div className="admin-layout">
            <AdminNavbar
                menuOpen={menuOpen}
                onToggleMenu={toggleNavigation}
                onCloseMenus={closeAllMenus}
            />

            <div className="admin-body">
                <AdminSidebar
                    sidebarOpen={sidebarOpen}
                    onNavigate={closeAllMenus}
                />

                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;