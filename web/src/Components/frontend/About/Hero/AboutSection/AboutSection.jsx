import { Link } from "react-router-dom";
import {
    BiMessageRoundedDetail,
    BiCog,
    BiShow,
    BiGroup,
    BiMobileAlt,
} from "react-icons/bi";

import "./AboutSection.css";

const AboutSection = () => {
    return (
        <section className="about-section">
            <div className="about-section-header">
                <h2>Ο στόχος μας</h2>
                <p>
                    Να κάνουμε την αίτημα προβλημάτων πιο απλή για τον πολίτη
                    και πιο οργανωμένη για τις αρμόδιες υπηρεσίες.
                </p>
            </div>

            <div className="about-values-grid">
                <div className="about-value-card">
                    <BiMessageRoundedDetail />
                    <h3>Άμεση αίτημα</h3>
                    <p>Ο πολίτης μπορεί να δηλώσει γρήγορα ένα πρόβλημα που εντοπίζει.</p>
                </div>

                <div className="about-value-card">
                    <BiCog />
                    <h3>Οργάνωση</h3>
                    <p>Οι αιτήματα συγκεντρώνονται και διαχειρίζονται από τον οργανισμό.</p>
                </div>

                <div className="about-value-card">
                    <BiShow />
                    <h3>Διαφάνεια</h3>
                    <p>Η πορεία κάθε αιτήματος μπορεί να παρακολουθείται από τον χρήστη.</p>
                </div>

                <div className="about-value-card">
                    <BiGroup />
                    <h3>Συνεργασία</h3>
                    <p>Πολίτες και υπηρεσίες συνεργάζονται για καλύτερη καθημερινότητα.</p>
                </div>
            </div>
        </section>


    );
};

export default AboutSection;