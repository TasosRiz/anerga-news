import "./ReportsByCategory.css";

// Colors
import { getCategoryColor } from "../../../../common/Categories/colors/categoryColors";

//  Γράφημα αιτημάτων ανά κατηγορία.
//
//  Αναλαμβάνει:
//  - ομαδοποίηση αιτημάτων ανά κατηγορία
//  - υπολογισμό πλήθους και ποσοστού
//  - δημιουργία donut chart
//  - εμφάνιση legend κατηγοριών

const ReportsByCategory = ({
    reports = [],
}) => {
    // Ομαδοποιεί τις αιτήματα με βάση το όνομα κατηγορίας.
    const categoryStats = reports.reduce(
        (accumulator, report) => {
            const categoryName =
                report.category?.name ||
                "Χωρίς Κατηγορία";

            accumulator[categoryName] =
                (accumulator[categoryName] || 0) + 1;

            return accumulator;
        },
        {}
    );

    // Μετατρέπει τα ομαδοποιημένα δεδομένα
    // σε ταξινομημένη λίστα για το chart.
    const stats = Object.entries(categoryStats)
        .map(([name, count], index) => ({
            name,
            count,
            color: getCategoryColor(index),
        }))
        .sort(
            (firstCategory, secondCategory) =>
                secondCategory.count -
                firstCategory.count
        );

    const total = reports.length;

    // Δημιουργεί τα segments του conic gradient.
    let currentPercent = 0;

    const gradient = stats
        .map((item) => {
            const percent =
                total > 0
                    ? (item.count / total) * 100
                    : 0;

            const start = currentPercent;
            const end =
                currentPercent + percent;

            currentPercent = end;

            return `${item.color} ${start}% ${end}%`;
        })
        .join(", ");

    return (
        <div className="reports-category-card">
            <div className="reports-category-header">
                <h3>
                    Αιτήματα ανά Κατηγορία
                </h3>

                <p>
                    Κατανομή των αιτημάτων με βάση την κατηγορία προβλήματος.
                </p>
            </div>

            {stats.length === 0 ? (
                <p className="category-empty">
                    Δεν υπάρχουν δεδομένα κατηγοριών.
                </p>
            ) : (
                <div className="reports-category-content">
                    <div
                        className="category-donut"
                        style={{
                            background:
                                `conic-gradient(${gradient})`,
                        }}
                        role="img"
                        aria-label={`Κατανομή ${total} αιτημάτων ανά κατηγορία`}
                    >
                        <div className="category-donut-hole">
                            <strong>{total}</strong>
                            <span>Αιτήματα</span>
                        </div>
                    </div>

                    <div className="category-legend">
                        {stats.map((category) => {
                            const percent =
                                total > 0
                                    ? (
                                        (
                                            category.count /
                                            total
                                        ) * 100
                                    ).toFixed(1)
                                    : "0.0";

                            return (
                                <div
                                    className="category-legend-row"
                                    key={category.name}
                                >
                                    <div className="category-legend-name">
                                        <span
                                            className="category-color-dot"
                                            style={{
                                                backgroundColor:
                                                    category.color,
                                            }}
                                        />

                                        <span>
                                            {category.name}
                                        </span>
                                    </div>

                                    <strong>
                                        {category.count}
                                        {" "}
                                        <span>
                                            ({percent}%)
                                        </span>
                                    </strong>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsByCategory;