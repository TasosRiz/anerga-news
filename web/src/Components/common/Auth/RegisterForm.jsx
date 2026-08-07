import { useState } from "react";

// Icons
import account from "./LoginAssets/account.svg";
import pass from "./LoginAssets/password.svg";
import google from "./LoginAssets/google.svg";
import github from "./LoginAssets/github.svg";
import emailIcon from "./LoginAssets/email.svg";

// Messages
import AppStatus from "../components/Alerts/AppStatus";

// Φόρμα εγγραφής νέου χρήστη.
//
// Συλλέγει τα στοιχεία του χρήστη,
// ελέγχει την εγκυρότητα των δεδομένων
// και περνά τα στοιχεία στο parent μέσω του onRegister.
function RegisterForm({
    error = "",
    onRegister,
    registerTitle = "Εγγραφή",
    registerButtonText = "Εγγραφή",
}) {
    // Στοιχεία φόρμας εγγραφής.
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [
        regPasswordConfirmation,
        setRegPasswordConfirmation,
    ] = useState("");

    // Τοπικό μήνυμα validation.
    const [validationError, setValidationError] = useState("");

    // Εκτελεί την εγγραφή νέου χρήστη.
    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        setValidationError("");

        // Ελέγχει ότι υπάρχει όνομα.
        if (!regName.trim()) {
            setValidationError(
                "Συμπλήρωσε το όνομά σου."
            );

            return;
        }

        // Ελέγχει ότι υπάρχει email.
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(regEmail.trim())) {
            setValidationError(
                "Συμπλήρωσε μία έγκυρη διεύθυνση email."
            );
            return;
        }

        // Ελέγχει το ελάχιστο μήκος του κωδικού.
        if (regPassword.length < 8) {
            setValidationError(
                "Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες."
            );

            return;
        }

        // Ελέγχει ότι οι δύο κωδικοί είναι ίδιοι.
        if (regPassword !== regPasswordConfirmation) {
            setValidationError(
                "Οι κωδικοί πρόσβασης δεν ταιριάζουν."
            );

            return;
        }

        await onRegister?.({
            name: regName.trim(),
            email: regEmail.trim(),
            password: regPassword,
            password_confirmation:
                regPasswordConfirmation,
        });
    };

    // Εμφανίζει πρώτα το τοπικό validation error
    // και μετά το error που επιστρέφει το API.
    const displayError = validationError || error;

    return (
        <form onSubmit={handleRegisterSubmit} noValidate>
            <h1>{registerTitle}</h1>

            <p>Δημιούργησε τον λογαριασμό σου.</p>

            <label htmlFor="register-name">
                Όνομα
            </label>

            <div className="input-box">
                <img
                    className="field-icon"
                    src={account}
                    alt=""
                    aria-hidden="true"
                />

                <input
                    id="register-name"
                    type="text"
                    placeholder="Το όνομά σου"
                    autoComplete="name"
                    required
                    value={regName}
                    onChange={(event) => {
                        setRegName(event.target.value);
                        setValidationError("");
                    }}
                />
            </div>

            <label htmlFor="register-email">
                Email
            </label>

            <div className="input-box">
                <img
                    className="field-icon"
                    src={emailIcon}
                    alt=""
                    aria-hidden="true"
                />

                <input
                    id="register-email"
                    type="email"
                    placeholder="email@example.com"
                    autoComplete="email"
                    required
                    value={regEmail}
                    onChange={(event) => {
                        setRegEmail(event.target.value);
                        setValidationError("");
                    }}
                />
            </div>

            <label htmlFor="register-password">
                Κωδικός Πρόσβασης
            </label>

            <div className="input-box">
                <img
                    className="field-icon"
                    src={pass}
                    alt=""
                    aria-hidden="true"
                />

                <input
                    id="register-password"
                    type="password"
                    placeholder="Κωδικός πρόσβασης"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={regPassword}
                    onChange={(event) => {
                        setRegPassword(event.target.value);
                        setValidationError("");
                    }}
                />
            </div>

            <label htmlFor="register-password-confirmation">
                Επιβεβαίωση Κωδικού
            </label>

            <div className="input-box">
                <img
                    className="field-icon"
                    src={pass}
                    alt=""
                    aria-hidden="true"
                />

                <input
                    id="register-password-confirmation"
                    type="password"
                    placeholder="Επιβεβαίωση κωδικού"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={regPasswordConfirmation}
                    onChange={(event) => {
                        setRegPasswordConfirmation(
                            event.target.value
                        );

                        setValidationError("");
                    }}
                />
            </div>

            {/* Εμφανίζει validation ή API error. */}
            <AppStatus error={displayError} />

            <button
                type="submit"
                className="btn-action login-btn"
            >
                {registerButtonText}
            </button>

            <div className="login social-icons">
                <p>ή συνέχισε με</p>

                <button
                    type="button"
                    className="social-icon"
                    disabled
                    title="Η εγγραφή με Google δεν είναι διαθέσιμη ακόμα"
                >
                    <img
                        src={google}
                        alt=""
                        aria-hidden="true"
                    />

                    Εγγραφή με Google
                </button>

                <button
                    type="button"
                    className="social-icon"
                    disabled
                    title="Η εγγραφή με GitHub δεν είναι διαθέσιμη ακόμα"
                >
                    <img
                        src={github}
                        alt=""
                        aria-hidden="true"
                    />

                    Εγγραφή με GitHub
                </button>
            </div>
        </form>
    );
}

export default RegisterForm;