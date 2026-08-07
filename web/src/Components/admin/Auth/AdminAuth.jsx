import { useState } from "react";
import { useNavigate } from "react-router-dom";

// API
import { loginAdmin } from "../../common/Auth/api/auth";

// Provider
import { useAuth } from "../../common/Auth/provider/AuthProvider";

// Form
import AuthForm from "../../common/Auth/AuthForm";

// Σελίδα σύνδεσης διαχειριστή.
//
// Χρησιμοποιεί το κοινό AuthForm
// και αποθηκεύει τα στοιχεία σύνδεσης μέσω του AuthProvider.
function AdminLogin({ }) {

  // Κεντρική function αποθήκευσης
  // του token και των στοιχείων του admin.
  const { login } = useAuth();

  // Μήνυμα σφάλματος σύνδεσης.
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Login
  // Εκτελεί τη σύνδεση του διαχειριστή.
  const handleLogin = async ({ email, password }) => {
    setError("");

    try {
      const data = await loginAdmin({
        email,
        password,
      });

      // Ελέγχει ότι το API επέστρεψε
      // τα απαραίτητα στοιχεία σύνδεσης.
      if (!data?.token || !data?.user) {
        throw new Error(
          "Μη έγκυρη απάντηση από τον server."
        );
      }

      // Αποθηκεύει token και admin
      // στον κεντρικό AuthProvider.
      login(data.token, data.user);

      // Μεταφέρει τον admin στο dashboard.
      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(
        getFriendlyErrorMessage(
          error,
          "Η σύνδεση διαχειριστή απέτυχε. Έλεγξε τα στοιχεία σου και προσπάθησε ξανά."
        )
      );
    }
  };

  return (
    <div className="auth-page">
      <AuthForm
        allowRegister={false}
        error={error}
        onLogin={handleLogin}
        onClearError={() => setError("")}
        loginTitle="Σύνδεση Διαχειριστή"
        loginButtonText="Σύνδεση"
      />
    </div>
  );
}

export default AdminLogin;