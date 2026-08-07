import "./DataTable.css";

//  Reusable table component.

//  Το component δεν γνωρίζει τι είδους δεδομένα εμφανίζει.
//  Οι στήλες, τα δεδομένα και ο τρόπος εμφάνισης κάθε κελιού
//  περνάνε από το parent component μέσω props.
const DataTable = ({
    // Ρυθμίσεις των στηλών του πίνακα.
    columns = [],

    // Δεδομένα που θα εμφανιστούν στις γραμμές.
    items = [],

    // Συνάρτηση που επιστρέφει ένα μοναδικό key για κάθε γραμμή.
    // Από προεπιλογή χρησιμοποιείται το item.id.
    getRowKey = (item) => item.id,

    // Μήνυμα που εμφανίζεται όταν δεν υπάρχουν δεδομένα.
    emptyMessage = "Δεν υπάρχουν δεδομένα.",
}) => {
    return (
        // Wrapper για κοινό styling και οριζόντιο scroll
        // σε μικρότερες οθόνες.
        <div className="data-table-wrapper scrollable-x">
            <table className="data-table">
                <thead>
                    <tr>
                        {/* Δημιουργία των headers από το columns array */}
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                style={{
                                    // Προαιρετικό πλάτος στήλης.
                                    width: column.width,
                                }}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {items.length === 0 ? (
                        // Empty state όταν δεν υπάρχουν εγγραφές.
                        <tr>
                            <td
                                // Το μήνυμα καταλαμβάνει όλες τις στήλες.
                                colSpan={columns.length}
                                className="data-table-empty"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        // Δημιουργία μίας γραμμής για κάθε item.
                        items.map((item) => (
                            <tr key={getRowKey(item)}>
                                {/* Δημιουργία των κελιών με βάση τις στήλες */}
                                {columns.map((column) => (
                                    <td key={column.key}>
                                        {column.render
                                            // Αν η στήλη έχει custom render,
                                            // χρησιμοποιείται για το περιεχόμενο.
                                            ? column.render(item)

                                            // Διαφορετικά εμφανίζεται απευθείας
                                            // η τιμή του αντίστοιχου πεδίου.
                                            : item[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;