import "./UserProfile.css";

//  Κάρτα προβολής προφίλ χρήστη.
//
//  Αναλαμβάνει:
//  - εμφάνιση βασικών στοιχείων χρήστη
//  - εμφάνιση ρόλου και ημερομηνίας εγγραφής
//  - προαιρετική ενέργεια επεξεργασίας

const UserProfile = ({
    user,
    title = "User Profile",
    subtitle = null,
    buttonText = "Edit Profile",
    onButtonClick,
    showButton = true,
}) => {

    // Βασικά στοιχεία χρήστη με fallback τιμές.
    const displayName =
        user?.name || "Χρήστης";

    const displayEmail =
        user?.email || "—";

    const displayRole =
        user?.role || "user";

    const displaySubtitle =
        subtitle || displayRole;

    // Αρχικό γράμμα για το avatar.
    const avatarLetter =
        displayName.charAt(0).toUpperCase();

    // Μορφοποιεί την ημερομηνία εγγραφής.
    const memberSince = user?.created_at
        ? new Date(
            user.created_at
        ).toLocaleDateString("el-GR", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "—";

    const isAdmin =
        displayRole.toLowerCase() === "admin" ||
        displayRole.toLowerCase() === "administrator";


    return (

        <div className="user-profile-card ">

            {/* Αριστερό τμήμα προφίλ. */}
            <div className="user-left-section">
                <div className="user-profile-avatar">
                    <div className="avatar-mountain">
                        {avatarLetter}
                    </div>
                </div>

                <div className="user-profile-heading">
                    <span>{title}</span>
                    <strong>{displayName}</strong>

                    {displaySubtitle && (
                        <small>
                            {displaySubtitle}
                        </small>
                    )}
                </div>
            </div>

            {/* Right */}
            {/* Αναλυτικά στοιχεία χρήστη. */}
            <div className="user-profile-info">
                <div className="user-profile-row">
                    <span>Ονοματεπώνυμο</span>
                    <strong>{displayName}</strong>
                </div>

                <div className="user-profile-row">
                    <span>Email</span>
                    <strong>
                        {displayEmail}
                    </strong>
                </div>

                <div className="user-profile-row">
                    <span>Ρόλος</span>

                    <strong
                        className={`profile-role-badge ${isAdmin
                            ? "admin-role"
                            : "user-role"
                            }`}
                    >
                        {displayRole}
                    </strong>
                </div>

                <div className="user-profile-row">
                    <span>Μέλος από</span>
                    <strong>
                        {memberSince}
                    </strong>
                </div>

                {showButton && onButtonClick && (
                    <button
                        type="button"
                        className="user-profile-button"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </div>

    );
};

export default UserProfile;