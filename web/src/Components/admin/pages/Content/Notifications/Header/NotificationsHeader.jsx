import './notificationsHeader.css'

//  Επικεφαλίδα της σελίδας διαχείρισης ειδοποιήσεων.

//  Εμφανίζει τον τίτλο, μια σύντομη περιγραφή
//  και το button δημιουργίας νέας ειδοποίησης.
const notificationsHeader = ({
    onCreate
}) => {
    return (
        <div className="notifications-header">
            {/* Τίτλος και περιγραφή της ενότητας. */}
            <div>
                <h2 className="section-title">Ειδοποιήσεις</h2>
                <p className="section-desc">
                    Διαχείριση ειδοποιήσεων.
                </p>
            </div>

            {/* Ανοίγει τη φόρμα δημιουργίας νέας δημοσίευσης. */}
            <button
                type="button"
                className="btn-action btn-create"
                onClick={onCreate}>
                + Νέα Ειδοποίηση
            </button>
        </div>
    );
};

export default notificationsHeader;