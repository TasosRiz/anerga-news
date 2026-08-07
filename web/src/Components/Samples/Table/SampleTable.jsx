import "./SampleTable.css";

const SampleTable = () => {
    const items = [
        {
            id: 1,
            title: "Πρώτο στοιχείο",
            category: "Κατηγορία Α",
            status: "active",
            date: "22/06/2026",
        },
        {
            id: 2,
            title: "Δεύτερο στοιχείο",
            category: "Κατηγορία Β",
            status: "inactive",
            date: "18/06/2026",
        },
        {
            id: 3,
            title: "Τρίτο στοιχείο",
            category: "Κατηγορία Γ",
            status: "active",
            date: "12/06/2026",
        },
    ];

    return (
        <div className="sample-table-wrapper scrollable-x">
            <table className="sample-table">
                <thead>
                    <tr>
                        <th width="80">ID</th>
                        <th>Τίτλος</th>
                        <th>Κατηγορία</th>
                        <th width="130">Κατάσταση</th>
                        <th width="150">Ημερομηνία</th>
                        <th width="180">Ενέργειες</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td className="table-id">
                                #{String(item.id).padStart(4, "0")}
                            </td>

                            <td className="table-title">
                                {item.title}
                            </td>

                            <td>
                                {item.category}
                            </td>

                            <td>
                                <span
                                    className={`table-status ${item.status === "active" ? "active" : "inactive"
                                        }`}
                                >
                                    {item.status === "active" ? "Active" : "Inactive"}
                                </span>
                            </td>

                            <td>
                                {item.date}
                            </td>

                            <td>
                                <div className="table-actions">
                                    <button
                                        type="button"
                                        className="btn-action btn-view"
                                    >
                                        Προβολή
                                    </button>

                                    <button
                                        type="button"
                                        className="btn-action btn-edit"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SampleTable;