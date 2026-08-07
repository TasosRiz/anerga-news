import { useState } from "react";

// Icons
import pass from "./LoginAssets/password.svg";
import google from "./LoginAssets/google.svg";
import github from "./LoginAssets/github.svg";
import emailIcon from "./LoginAssets/email.svg";

// Message
import AppStatus from "../components/Alerts/AppStatus";

// Φόρμα σύνδεσης χρήστη.
//
// Συλλέγει email και κωδικό
// και περνά τα δεδομένα στο parent μέσω του onLogin.
function LoginForm({
    error = "",
    onLogin,
    loginTitle = "Σύνδεση",
    loginButtonText = "Σύνδεση",
}) {
    // Στοιχεία φόρμας σύνδεσης.
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Τοπικό μήνυμα validation της φόρμας.
    const [validationError, setValidationError] = useState("");

    // Εκτελεί τη σύνδεση μέσω της function
    // που παρέχεται από το parent component.
    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        setValidationError("");

        // Αφαιρεί περιττά κενά από το email.
        const trimmedEmail = loginEmail.trim();

        // Ελέγχει ότι έχει συμπληρωθεί email.
        if (!trimmedEmail) {
            setValidationError(
                "Συμπλήρωσε το email σου."
            );

            return;
        }

        // Ελέγχει ότι το email έχει έγκυρη μορφή.
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(trimmedEmail)) {
            setValidationError(
                "Συμπλήρωσε μία έγκυρη διεύθυνση email."
            );

            return;
        }

        // Ελέγχει ότι έχει συμπληρωθεί κωδικός.
        if (!loginPassword) {
            setValidationError(
                "Συμπλήρωσε τον κωδικό πρόσβασης."
            );

            return;
        }

        await onLogin?.({
            email: trimmedEmail,
            password: loginPassword,
        });
    };

    // Εμφανίζει πρώτα το τοπικό validation error
    // και μετά το error που επιστρέφει το API.
    const displayError = validationError || error;


    return (
        <form onSubmit={handleLoginSubmit} noValidate>
            <h1>{loginTitle}</h1>
            <p>Συμπλήρωσε τα στοιχεία σου.</p>

            <h5>Email</h5>
            <div className="input-box">
                <img
                    className="field-icon"
                    src={emailIcon}
                    alt=""
                    aria-hidden="true"
                />

                <input
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={loginEmail}
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                        setValidationError("");
                    }}
                />
            </div>

            <h5>Κωδικός Πρόσβασης</h5>
            <div className="input-box">
                <img
                    className="field-icon"
                    src={pass}
                    alt=""
                    aria-hidden="true"
                />

                <input
                    type="password"
                    placeholder="Κωδικός πρόσβασης"
                    required
                    value={loginPassword}
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                        setValidationError("");
                    }}
                />
            </div>

            <div className="forgot-link">
                <button
                    type="button"
                    className="link-button"
                    disabled
                    title="Η λειτουργία δεν είναι διαθέσιμη ακόμα"
                >
                    Ξέχασες τον κωδικό;
                </button>
            </div>

            {/* Εμφανίζει validation ή API error. */}
            <AppStatus error={displayError} />

            {/* Login Button */}
            <button type="submit" className="btn-action login-btn">
                {loginButtonText}
            </button>

            <div className="login social-icons">
                <p>ή συνέχισε με</p>

                <button
                    type="button"
                    className="social-icon"
                    disabled
                    title="Η σύνδεση με Google δεν είναι διαθέσιμη ακόμα"
                >
                    <img
                        src={google}
                        alt=""
                        aria-hidden="true"
                    />

                    Σύνδεση με Google
                </button>

                <button
                    type="button"
                    className="social-icon"
                    disabled
                    title="Η σύνδεση με GitHub δεν είναι διαθέσιμη ακόμα"
                >
                    <img
                        src={github}
                        alt=""
                        aria-hidden="true"
                    />

                    Σύνδεση με GitHub
                </button>
            </div>

        </form>
    );
}

export default LoginForm;