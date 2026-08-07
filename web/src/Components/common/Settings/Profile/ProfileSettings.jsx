//
//  Section προβολής προφίλ χρήστη ή διαχειριστή.
//
//  Αναλαμβάνει:
//  - επιλογή του σωστού user object
//  - εμφάνιση του UserProfile
//

import UserProfile from "../../Users/UserProfile/UserProfile";

import "./ProfileSettings.css";

const ProfileSettings = ({
    token,
    user,
    variant = "admin",
}) => {
    // Υποστηρίζει είτε απευθείας user object
    // είτε response με nested user property.
    const profileUser =
        user?.user || user;

    const isAdmin =
        variant === "admin";

    return (
        <div className="profile-settings-section box">
            <div className="settings-section-header">
                <h3>
                    {isAdmin
                        ? "Προφίλ Διαχειριστή"
                        : "Προφίλ Χρήστη"}
                </h3>
            </div>

            <UserProfile
                user={profileUser}
                subtitle={
                    isAdmin
                        ? "Admin"
                        : profileUser?.role || "User"
                }
                buttonText="Επεξεργασία Προφίλ"
                showButton={false}
            />
        </div>
    );
};

export default ProfileSettings;