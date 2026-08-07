import { Link } from "react-router-dom";
import "./Card.css";

//  Επαναχρησιμοποιήσιμο component καρτών στατιστικών.

//  Εμφανίζει δυναμικά εικονίδιο, τίτλο, τιμή και προαιρετικό υπότιτλο.
//  Αν ένα item περιλαμβάνει path, η κάρτα λειτουργεί ως σύνδεσμος.
const Card = ({ items = [] }) => {
    return (
        <div className="card-container">
            {items.map((item, index) => {
                // Χρησιμοποιεί id όταν υπάρχει
                // διαφορετικά συνδυασμό τίτλου και index ως fallback key.
                const itemKey = item.id ?? `${item.title}-${index}`;


                const cardContent = (
                    <div className="card ">
                        {/* Εικονίδιο και χρωματισμός της κάρτας. */}
                        <div
                            className="card-cover"
                            style={{
                                color: item.color,
                                backgroundColor: item.bgColor || "#ffffff",
                            }}
                        >
                            {item.icon}
                        </div>

                        {/* Βασικά δεδομένα της κάρτας. */}
                        <div className="card-title">
                            <h2>{item.title}</h2>
                            <p>{item.value}</p>

                            {/* Προαιρετική συμπληρωματική πληροφορία. */}
                            {item.subtitle && (
                                <span className="card-subtitle">
                                    {item.subtitle}
                                </span>
                            )}
                        </div>
                    </div>
                );

                // Αν υπάρχει path, η κάρτα γίνεται navigable link.
                if (item.path) {
                    return (
                        <Link
                            to={item.path}
                            className="card-link"
                            key={itemKey}
                            aria-label={`${item.title}: ${item.value}`}
                        >
                            {cardContent}
                        </Link>
                    );
                }

                // Διαφορετικά εμφανίζεται ως απλή πληροφοριακή κάρτα.
                return (
                    <div
                        className="card-link"
                        key={itemKey}
                    >
                        {cardContent}
                    </div>
                );
            })}
        </div>
    );
};

export default Card;