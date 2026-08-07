/*
|--------------------------------------------------------------------------
| Side Panel Component
|--------------------------------------------------------------------------
| Reusable δεξί panel για προβολή ή επεξεργασία δεδομένων.
|
| Το component ανοίγει μόνο όταν το prop open είναι true και εμφανίζεται
| δεξιά από το βασικό περιεχόμενο της σελίδας μέσω του layout class
| "with-side-panel".
    <div
        className={`with-side-panel ${selectedCategory ? "has-panel" : ""}`}
        style={{ "--side-panel-width": "380px" }}
    >...</div>

    <<<ΒΛΕΠΕ TEMPLATE>>>
|
| Χρησιμοποιείται σε σημεία όπως(Buttons):
| - προβολή λεπτομερειών αιτήματος
| - επεξεργασία χρήστη
| - επεξεργασία κατηγορίας
|
| Props:
| - open: καθορίζει αν το panel εμφανίζεται
| - title: τίτλος του panel
| - subtitle: μικρό κείμενο κάτω από τον τίτλο
| - loading: εμφανίζει μήνυμα φόρτωσης
| - error: εμφανίζει μήνυμα σφάλματος
| - onClose: function για κλείσιμο του panel
| - children: το περιεχόμενο που εμφανίζεται μέσα στο panel
|
| Παράδειγμα χρήσης:
|
| <SidePanel
|     open={!!selectedItem}
|     title="Επεξεργασία"
|     subtitle={selectedItem?.name}
|     onClose={() => setSelectedItem(null)}
| >
|     <EditForm item={selectedItem} />
| </SidePanel>
|--------------------------------------------------------------------------
*/


import AppStatus from "../Alerts/AppStatus";
import "./SidePanel.css";

//  Επαναχρησιμοποιήσιμο δεξί panel για προβολή,
//  δημιουργία ή επεξεργασία δεδομένων.

//  Εμφανίζεται μόνο όταν το prop open είναι true
//  Χρησιμοποιείται μαζί με το layout class "with-side-panel".

//  Βασικά props:
//  - open: καθορίζει αν το panel εμφανίζεται
//  - title: τίτλος του panel
//  - subtitle: προαιρετικό κείμενο κάτω από τον τίτλο
//  - loading: κατάσταση φόρτωσης
//  - error: μήνυμα σφάλματος
//  - onClose: function κλεισίματος
//  - children: περιεχόμενο του panel

const SidePanel = ({
    open = false,
    title = "",
    subtitle = "",
    loading = false,
    error = "",
    onClose,
    children,
}) => {
    // Το panel δεν φαίνεται όταν είναι κλειστό.
    if (!open) return null;

    return (
        <aside className="side-panel">
            {/* Button κλεισίματος του panel. */}
            <button
                type="button"
                className="side-panel-close"
                onClick={() => onClose?.()}
                aria-label="Κλείσιμο panel"
            >
                ×
            </button>

            {/* Προαιρετική επικεφαλίδα του panel. */}
            {(title || subtitle) && (
                <div className="side-panel-header">
                    {title && <h3>{title}</h3>}
                    {subtitle && <p>{subtitle}</p>}
                </div>
            )}

            {/* Καταστάσεις φόρτωσης και σφάλματος. */}
            <AppStatus
                loading={loading}
                error={error}
                loadingMessage="Φόρτωση..."
                center
            />

            {/* Το περιεχόμενο εμφανίζεται όταν δεν υπάρχει loading ή error. */}
            {!loading && !error && (
                <div className="side-panel-content">
                    {children}
                </div>
            )}
        </aside>
    );
};

export default SidePanel;