// Κοινό layout των frontend σελίδων.

// Περιλαμβάνει το navigation, το κύριο περιεχόμενο και το footer,
// μέσω του Outlet εμφανίζει το component του ενεργού route.

// Παράλληλα διαχειρίζεται το mobile menu και το profile sidebar.


import React, { useState } from "react";
import { Outlet } from "react-router-dom";


// Content
import Navbar from './Navbar/FrontNavbar';
import Footer from './Footer/Footer';

// Css
import './FrontendLayout.css'

const FrontendLayout = () => {
    // State για το άνοιγμα και το κλείσιμο του mobile navigation menu.
    const [menuOpen, setMenuOpen] = useState(false);

    // State για το άνοιγμα και το κλείσιμο του profile sidebar.
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Κλείνει όλα τα ανοιχτά menus.
    const closeAllMenus = () => {
        setMenuOpen(false);
        setSidebarOpen(false);
    };


    const toggleNavigation = () => {
        const nextOpenState = !(menuOpen || sidebarOpen);

        setMenuOpen(nextOpenState);
        setSidebarOpen(nextOpenState);
    };

    return (
        <>
            <div className="user-layout">

                {/*
                  Το Navbar εμφανίζεται σε όλες τις σελίδες.
                  Λαμβάνει τα στοιχεία του χρήστη, τη λειτουργία logout
                  και τα states που ελέγχουν τα responsive menus.
                 */}
                <Navbar
                    menuOpen={menuOpen}
                    onToggleMenu={toggleNavigation}
                    onCloseMenus={closeAllMenus}
                />

                {/* Κύρια περιοχή εμφάνισης του περιεχομένου κάθε frontend route. */}
                <div className='user-content'>
                    {/*
                      Το Outlet εμφανίζει το component του ενεργού nested route.
                      Μέσω του context μεταφέρει τα κοινά states των menus
                      στις child σελίδες, όπως το ProfilePage.
                     */}
                    <Outlet
                        context={{
                            sidebarOpen,
                            setSidebarOpen,
                            closeAllMenus,
                        }}
                    />
                </div>
            </div>

            {/* Κοινό footer για όλες τις frontend σελίδες. */}
            <Footer />

        </>
    );
}

export default FrontendLayout
