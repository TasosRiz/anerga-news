// Εξειδικευμένο navbar για το frontend της εφαρμογής.

// Δημιουργεί δυναμικά τα διαθέσιμα links ανάλογα με το αν ο χρήστης
// είναι συνδεδεμένος και αν διαθέτει δικαιώματα διαχειριστή.

// Στη συνέχεια περνά τη διαμόρφωση στο κοινό Navbar component.

import { useAuth } from "../../common/Auth/provider/AuthProvider";
import Navbar from "../../common/Navbar/Navbar";

import NotificationBell from "../../common/Notifications/NotificationBell/NotificationBell";


function FrontNavbar({
  menuOpen,
  onToggleMenu,
  onCloseMenus, }) {

  // Παίρνει τα στοιχεία σύνδεσης απευθείας από το AuthContext.
  const { user, logout, isAuthenticated, isAdmin, token } = useAuth();

  // Links που εμφανίζονται σε όλους τους επισκέπτες.
  const frontLinks = [
    { label: "Αρχική", to: "/" },

    // Εμφανίζεται μόνο σε συνδεδεμένους χρήστες.
    ...(isAuthenticated
      ? [{ label: "Αιτήματα", to: "/profile/dashboard" }]
      : []),

    { label: "Σχετικά", to: "/about" },
    { label: "Ανακοινώσεις", to: "/posts" },

    // Εμφανίζεται μόνο σε χρήστες με ρόλο admin.
    ...(isAdmin
      ? [{ label: "Admin", to: "/admin/dashboard" }]
      : []),
  ];


  return (
    <Navbar
      links={frontLinks}
      loginPath="/login"
      loginText="Σύνδεση"

      // Περνάμε menuOpen στο κοινό Navbar,
      menuOpen={menuOpen}
      onToggleMenu={onToggleMenu}
      onCloseMenus={onCloseMenus}

      rightContent={
        isAuthenticated ? (
          <NotificationBell token={token} />
        ) : null
      }
    />


  );
}

export default FrontNavbar;