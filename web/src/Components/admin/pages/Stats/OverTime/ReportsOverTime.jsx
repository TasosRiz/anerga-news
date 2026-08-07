import "./ReportsOverTime.css";

//
//  Γράφημα αιτημάτων των τελευταίων 30 ημερών.
//
//  Αναλαμβάνει:
//  - ομαδοποίηση αιτημάτων ανά ημέρα
//  - υπολογισμό των σημείων του line chart
//  - εμφάνιση line και area chart
//
const DAYS_RANGE = 30;

const getLocalDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const ReportsOverTime = ({
    reports = [],
}) => {

    // Δημιουργεί τις τελευταίες 30 ημερολογιακές ημέρες.
    const last30Days = Array.from(
        { length: DAYS_RANGE },
        (_, index) => {
            const date = new Date();

            date.setHours(0, 0, 0, 0);
            date.setDate(
                date.getDate() -
                (DAYS_RANGE - 1 - index)
            );

            return {
                key: getLocalDateKey(date),
                label: date.toLocaleDateString(
                    "el-GR",
                    {
                        day: "numeric",
                        month: "short",
                    }
                ),
                count: 0,
            };
        }
    );

    // Δημιουργεί lookup map για γρηγορότερη καταμέτρηση.
    const daysByKey = new Map(
        last30Days.map((day) => [
            day.key,
            day,
        ])
    );

    // Μετρά τις αιτήματα ανά ημέρα.
    reports.forEach((report) => {
        if (!report?.created_at) {
            return;
        }

        const reportDate =
            new Date(report.created_at);

        if (
            Number.isNaN(
                reportDate.getTime()
            )
        ) {
            return;
        }

        const key =
            getLocalDateKey(reportDate);

        const day = daysByKey.get(key);

        if (day) {
            day.count += 1;
        }
    });

    const maxValue = Math.max(
        ...last30Days.map(
            (item) => item.count
        ),
        1
    );

    const width = 700;
    const height = 260;
    const padding = 32;

    // Μετατρέπει τα δεδομένα σε SVG coordinates.
    const points = last30Days.map(
        (item, index) => {
            const x =
                padding +
                (
                    index /
                    (last30Days.length - 1)
                ) *
                (width - padding * 2);

            const y =
                height -
                padding -
                (
                    item.count /
                    maxValue
                ) *
                (height - padding * 2);

            return {
                ...item,
                x,
                y,
            };
        }
    );

    // Δημιουργεί το path της γραμμής.
    const linePath = points
        .map((point, index) =>
            index === 0
                ? `M ${point.x} ${point.y}`
                : `L ${point.x} ${point.y}`
        )
        .join(" ");

    // Δημιουργεί την περιοχή κάτω από τη γραμμή.
    const areaPath = `
        ${linePath}
        L ${points[points.length - 1].x} ${height - padding}
        L ${points[0].x} ${height - padding}
        Z
    `;

    // Επιλεγμένα labels στον οριζόντιο άξονα.
    const xLabels = [
        points[0],
        points[7],
        points[14],
        points[21],
        points[29],
    ];

    return (
        <div className="reports-time-card">
            <div className="reports-time-header">
                <div>
                    <h3>Βάση Χρόνου</h3>

                    <p>
                        Αιτήματα των τελευταίων 30 ημερών.
                    </p>
                </div>

                <span className="reports-time-filter">
                    Τελευταίες 30 ημέρες
                </span>
            </div>

            {reports.length === 0 ? (
                <p className="reports-time-empty">
                    Δεν υπάρχουν δεδομένα αιτημάτων.
                </p>
            ) : (
                <div className="reports-time-chart">
                    <svg
                        viewBox={`0 0 ${width} ${height}`}
                        preserveAspectRatio="none"
                        role="img"
                        aria-label="Γράφημα αιτημάτων των τελευταίων 30 ημερών"
                    >
                        {/* Οριζόντιες γραμμές πλέγματος. */}
                        {[0, 1, 2, 3, 4].map(
                            (line) => {
                                const y =
                                    padding +
                                    (
                                        line / 4
                                    ) *
                                    (
                                        height -
                                        padding * 2
                                    );

                                return (
                                    <line
                                        key={line}
                                        x1={padding}
                                        x2={
                                            width -
                                            padding
                                        }
                                        y1={y}
                                        y2={y}
                                        className="chart-grid-line"
                                    />
                                );
                            }
                        )}

                        {/* Περιοχή και γραμμή του chart. */}
                        <path
                            className="chart-area"
                            d={areaPath}
                        />

                        <path
                            className="chart-line"
                            d={linePath}
                        />

                        {/* Labels ημερομηνιών. */}
                        {xLabels.map((point) => (
                            <text
                                key={point.key}
                                x={point.x}
                                y={height - 6}
                                textAnchor="middle"
                                className="chart-label"
                            >
                                {point.label}
                            </text>
                        ))}
                    </svg>
                </div>
            )}
        </div>
    );
};

export default ReportsOverTime;