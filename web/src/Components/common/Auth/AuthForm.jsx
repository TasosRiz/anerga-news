import { useState } from "react";
import "./Auth.css";

import hero from "./LoginAssets/hero.png";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

// Κοινό component αυθεντικοποίησης.
//
// Εμφανίζει τη φόρμα σύνδεσης
// και, όταν επιτρέπεται, τη φόρμα εγγραφής.
function AuthForm({
  allowRegister = true,
  error = "",
  onLogin,
  onRegister,
  onClearError,
  loginTitle = "Σύνδεση",
  loginButtonText = "Σύνδεση",
}) {
  // Καθορίζει αν εμφανίζεται
  // η φόρμα σύνδεσης ή εγγραφής.
  const [isRegister, setIsRegister] = useState(false);

  // Αλλάζει την ενεργή φόρμα
  // και καθαρίζει προηγούμενα μηνύματα σφάλματος.
  const handleModeChange = (registerMode) => {
    setIsRegister(registerMode);
    onClearError?.();
  };

  return (
    <div className={`login-container ${isRegister ? "active" : ""}`}>

      {/* LEFT SIDE */}
      {/* Αριστερή πλευρά με εικόνα και περιγραφή. */}
      <div className="left-side">
        <div className="image-box">
          <img src={hero} alt="ServiceKit" />
        </div>

        <div className="text-box">
          <h2>Καλώς ήρθες!</h2>
          <p className="hero-description">
            Η πόλη μας γίνεται καλύτερη όταν συμμετέχουμε όλοι.
            Ανέφερε προβλήματα εύκολα και παρακολούθησε την εξέλιξή τους.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      {/* Δεξιά πλευρά με τις φόρμες. */}
      <div className="right-side form-box">
        {allowRegister && (
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${!isRegister ? "active" : ""}`}
              onClick={() =>
                handleModeChange(false)
              }
              aria-pressed={!isRegister}
            >
              Σύνδεση
            </button>

            <button
              type="button"
              className={`auth-tab ${isRegister ? "active" : ""}`}
              onClick={() =>
                handleModeChange(true)
              }
              aria-pressed={isRegister}
            >
              Εγγραφή
            </button>
          </div>
        )}

        {/* LOGIN-REGISTER */}
        {/* Εμφανίζει την ενεργή φόρμα. */}
        {!isRegister ? (
          <LoginForm
            error={error}
            onLogin={onLogin}
            loginTitle={loginTitle}
            loginButtonText={loginButtonText}
          />
        ) : (
          <RegisterForm
            error={error}
            onRegister={onRegister}
          />
        )}
      </div>
    </div>
  );
}

export default AuthForm;