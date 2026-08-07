import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../common/Auth/provider/AuthProvider";
import {
  loginUser,
  registerUser,
  getFriendlyErrorMessage,
} from "../../common/Auth/api/auth";

import AuthForm from "../../common/Auth/AuthForm";

// Σελίδα σύνδεσης και εγγραφής απλού χρήστη.

// Χρησιμοποιεί το κοινό AuthForm για τις φόρμες
// και αποθηκεύει τα στοιχεία σύνδεσης μέσω του AuthProvider.
function UserAuth() {
  // Κεντρική function αποθήκευσης token και χρήστη.
  const { login } = useAuth();

  // Μήνυμα σφάλματος σύνδεσης ή εγγραφής.
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Εκτελεί τη σύνδεση του χρήστη.
  const handleLogin = async ({ email, password }) => {
    setError("");

    try {
      const data = await loginUser({
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

      // Αποθηκεύει token και user στο AuthProvider.
      login(data.token, data.user);

      // Μεταφέρει τον χρήστη στην αρχική σελίδα.
      navigate("/", { replace: true });
    } catch (error) {
      setError(
        getFriendlyErrorMessage(
          error,
          "Η σύνδεση απέτυχε. Έλεγξε τα στοιχεία σου και προσπάθησε ξανά."
        )
      );
    }
  };

  // Εκτελεί την εγγραφή νέου χρήστη.
  const handleRegister = async ({
    name,
    email,
    password,
    password_confirmation,
  }) => {
    setError("");

    try {
      const data = await registerUser({
        name,
        email,
        password,
        password_confirmation,
      });

      // Ελέγχει ότι το API επέστρεψε
      // τα απαραίτητα στοιχεία σύνδεσης.
      if (!data?.token || !data?.user) {
        throw new Error(
          "Μη έγκυρη απάντηση από τον server."
        );
      }

      // Συνδέει αυτόματα τον χρήστη μετά την εγγραφή.
      login(data.token, data.user);

      // Μεταφέρει τον χρήστη στις αιτήματα του.
      navigate("/profile/reports", {
        replace: true,
      });
    } catch (error) {
      setError(
        getFriendlyErrorMessage(
          error,
          "Η σύνδεση απέτυχε. Έλεγξε τα στοιχεία σου και προσπάθησε ξανά."
        )
      );
    }
  };

  return (
    <main className="auth-page">
      <AuthForm
        allowRegister
        error={error}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onClearError={() => setError("")}
      />
    </main>
  );
}

export default UserAuth;