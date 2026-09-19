
//  Κοινό configuration για τις καταστάσεις αιτημάτων.

//  Περιλαμβάνει:
//  - labels για εμφάνιση στο UI
//  - χρώματα για badges και status indicators
//  - επιλογές για φόρμες και φίλτρα

// Ρυθμίσεις εμφάνισης κάθε κατάστασης αιτήματος.
export const reportStatusConfig = {
    new: {
        label: "Νέες",
        color: "#3498db",
        bgColor: "#e0f2fe",
    },
    in_progress: {
        label: "Σε εξέλιξη",
        color: "#f39c12",
        bgColor: "#fef3c7",
    },
    solved: {
        label: "Ολοκληρωμένες",
        color: "#27ae60",
        bgColor: "#dcfce7",
    },
};

// Πραγματικές καταστάσεις αιτήματος.
// Χρησιμοποιούνται σε φόρμες και select fields.
export const reportStatusOptions = [
    { label: "Όλα", status: "" },
    { label: "Νέα", status: "new" },
    { label: "Σε εξέλιξη", status: "in_progress" },
    { label: "Κοινωποιημένα", status: "solved" },
];