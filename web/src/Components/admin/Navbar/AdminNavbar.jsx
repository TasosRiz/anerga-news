import { useAuth } from "../../common/Auth/provider/AuthProvider";
import Navbar from "../../common/Navbar/Navbar";
import NotificationBell from "../../common/Notifications/NotificationBell/NotificationBell";

const adminLinks = [
  {
    label: "Αρχική",
    to: "/admin/dashboard",
  },
  {
    label: "Frontend",
    to: "/",
  },
];

// Εξειδικευμένο navbar για το admin panel.
//
// Χρησιμοποιεί το κοινό Navbar component
// και του περνά τα links και τη λογική
// ανοίγματος και κλεισίματος του responsive menu.
function AdminNavbar({
  menuOpen,
  onToggleMenu,
  onCloseMenus,
}) {
  // Παίρνει τα στοιχεία σύνδεσης απευθείας από το AuthContext.
  const { isAuthenticated, token } = useAuth();

  return (
    <Navbar
      // Links πλοήγησης του admin navbar.
      links={adminLinks}

      // Διαδρομή σύνδεσης διαχειριστή.
      loginPath="/admin/login"

      // Κείμενο του login button.
      loginText="Σύνδεση"

      // Κατάσταση ανοίγματος του responsive menu.
      menuOpen={menuOpen}

      // Ανοίγει ή κλείνει το menu.
      onToggleMenu={onToggleMenu}

      // Κλείνει όλα τα ανοιχτά menus
      // μετά από πλοήγηση ή logout.
      onCloseMenus={onCloseMenus}

      rightContent={
        isAuthenticated ? (
          <NotificationBell token={token} />
        ) : null
      }
    />
  );
}

export default AdminNavbar;