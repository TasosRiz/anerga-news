

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


import { useAuth } from "../Auth/provider/AuthProvider.jsx";
import { useOrganizationInfo } from "../../common/OrganizationInfo/Context/OrganizationInfoContext.jsx";


import menuIcon from "./menu-icon.png";

// Css
import "./Navbar.css";

//  Κοινό Navbar component της εφαρμογής.

//  Εμφανίζει δυναμικά τα navigation links και τα στοιχεία του οργανισμού.

//  Προσαρμόζει τις επιλογές σύνδεσης και αποσύνδεσης
//  ανάλογα με την κατάσταση του χρήστη.

//  Διαχειρίζεται το responsive menu, το profile sidebar
//  και την αλλαγή εμφάνισης του navbar κατά το scroll.

function Navbar({
    links = [],
    loginPath = "/admin/login",
    loginText = "Login",
    logoutText = "Αποσύνδεση",
    menuOpen = false,
    onToggleMenu,
    onCloseMenus,

    // Προαιρετικό περιεχόμενο που εμφανίζεται
    // στη δεξιά πλευρά του navbar πριν από το logout/login.
    // Χρησιμοποιείται π.χ. για το notification bell.
    rightContent = null,
}) {
    // Παίρνει τον χρήστη και τη λειτουργία logout
    // απευθείας από τον κεντρικό AuthProvider.
    const { user, logout } = useAuth();

    // Καθορίζει αν το navbar θα έχει dark μορφή κατά το scroll.
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 50);
        };

        // Αρχικός έλεγχος της θέσης κύλισης.
        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Παίρνει τα στοιχεία της εφαρμογής και του οργανισμού
    // από το OrganizationInfo Context.
    const { organizationInfo } = useOrganizationInfo();

    const appName = organizationInfo?.app_name || "ServiceKit";
    const organizationName = organizationInfo?.organization_name || "Your Organization";


    // Κλείνει το navigation menu και το profile sidebar.
    // Το optional chaining επιτρέπει στο Navbar να λειτουργεί
    // ακόμη και όταν κάποιο setter δεν έχει δοθεί.
    const closeAllMenus = () => {
        setMenuOpen?.(false);
        setSidebarOpen?.(false);
    };


    // Κλείνει τα menus και εκτελεί logout μέσω του AuthProvider.
    const handleLogout = async () => {
        onCloseMenus?.();
        await logout();
    };



    return (
        <header className="header container">
            <div className={`navbar ${sticky ? "dark-nav" : ""}`}>

                {/* Στοιχεία ονομασίας εφαρμογής και οργανισμού. */}
                <Link
                    to="/"
                    className="site-title"
                    onClick={closeAllMenus}
                    aria-label={`${appName} - Αρχική σελίδα`}
                >
                    <div className="brand-mark">
                        {appName.charAt(0).toUpperCase()}
                    </div>

                    <div className="brand-text">
                        <h2>{appName}</h2>
                        <span>{organizationName}</span>
                    </div>
                </Link>

                {/* Notif Bell */}
                {rightContent && (
                    <div className="navbar-right-content">
                        {rightContent}
                    </div>
                )}


                {/*
                  Τα navigation links δημιουργούνται δυναμικά
                  από το component που χρησιμοποιεί το Navbar.
                 */}
                <div className={`  nav-buttons ${menuOpen ? "active" : ""}`}>
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            className="btn"
                            to={link.to}
                            onClick={() =>
                                onCloseMenus?.()
                            }
                        >
                            {link.label}
                        </Link>
                    ))}


                    {/*
                      Αν υπάρχει συνδεδεμένος χρήστης εμφανίζεται logout.
                      Διαφορετικά εμφανίζεται σύνδεσμος προς το login.
                     */}
                    {user ? (
                        <button type="button" className="btn" onClick={handleLogout}>
                            {logoutText}
                        </button>
                    ) : (
                        <Link className="btn" to={loginPath} onClick={onCloseMenus}>
                            {loginText}
                        </Link>
                    )}
                </div>

                {/* Ανοίγει ή κλείνει το responsive menu. */}
                <button
                    type="button"
                    className="menu-icon-button"
                    onClick={() => onToggleMenu?.()}
                    aria-expanded={menuOpen}
                    aria-controls="navigation-menu"
                    aria-label={
                        menuOpen
                            ? "Κλείσιμο menu"
                            : "Άνοιγμα menu"
                    }
                >
                    <img
                        src={menuIcon}
                        alt=""
                        className="menu-icon"
                        aria-hidden="true"
                    />
                </button>


            </div>
        </header>
    );
}

export default Navbar;