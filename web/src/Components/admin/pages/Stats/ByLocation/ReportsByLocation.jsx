

import "./ReportsByLocation.css";

//  Γράφημα αιτημάτων ανά τοποθεσία.
//
//  Αναλαμβάνει:
//  - ομαδοποίηση αιτημάτων ανά πόλη
//  - υπολογισμό πλήθους και ποσοστού
//  - εμφάνιση οριζόντιων bars ανά τοποθεσία

const ReportsByLocation = ({
    reports = [],
}) => {
    // Ομαδοποιεί τις αιτήματα ανά πόλη.
    const locationStats = reports.reduce(
        (accumulator, report) => {
            const city =
                report.city ||
                "Άγνωστη Τοποθεσία";

            accumulator[city] =
                (accumulator[city] || 0) + 1;

            return accumulator;
        },
        {}
    );

    // Μετατρέπει τα δεδομένα σε ταξινομημένη λίστα.
    const stats = Object.entries(locationStats)
        .map(([city, count]) => ({
            city,
            count,
        }))
        .sort(
            (firstLocation, secondLocation) =>
                secondLocation.count -
                firstLocation.count
        );

    const total = reports.length;

    // Μεγαλύτερη τιμή για τον υπολογισμό
    // του σχετικού πλάτους κάθε bar.
    const maxValue = Math.max(
        ...stats.map(
            (item) => item.count
        ),
        1
    );

    return (
        <div className="reports-location-card">
            <div className="reports-location-header">
                <h3>
                    Αιτήματα ανά Τοποθεσία
                </h3>

                <p>
                    Κατανομή αιτημάτων με βάση την πόλη.
                </p>
            </div>

            {stats.length === 0 ? (
                <p className="location-empty">
                    Δεν υπάρχουν δεδομένα τοποθεσίας.
                </p>
            ) : (
                <div className="reports-location-list">
                    {stats.map((item) => {
                        const barWidth =
                            maxValue > 0
                                ? (
                                    item.count /
                                    maxValue
                                ) * 100
                                : 0;

                        const percent =
                            total > 0
                                ? (
                                    (
                                        item.count /
                                        total
                                    ) * 100
                                ).toFixed(1)
                                : "0.0";

                        return (
                            <div
                                className="location-row"
                                key={item.city}
                            >
                                <span className="location-name">
                                    {item.city}
                                </span>

                                <div
                                    className="location-bar-track"
                                    role="progressbar"
                                    aria-label={`${item.city}: ${item.count} αιτήματα`}
                                    aria-valuenow={item.count}
                                    aria-valuemin="0"
                                    aria-valuemax={maxValue}
                                >
                                    <div
                                        className="location-bar-fill"
                                        style={{
                                            width: `${barWidth}%`,
                                        }}
                                    />
                                </div>

                                <strong className="location-count">
                                    {item.count}
                                    {" "}
                                    <span>
                                        ({percent}%)
                                    </span>
                                </strong>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ReportsByLocation;