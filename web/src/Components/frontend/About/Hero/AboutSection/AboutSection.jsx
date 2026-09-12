import {
    BiRocket,
    BiCog,
    BiShow,
    BiGroup,
} from "react-icons/bi";

import "./AboutSection.css";

const AboutSection = () => {
    return (<section className="about-section"> <div className="about-section-header"> <h2>Ο στόχος μας</h2>

        <p>
            Να προσφέρουμε μια απλή, οργανωμένη και ευέλικτη εμπειρία
            που μπορεί να προσαρμοστεί στις ανάγκες κάθε project.
        </p>
    </div>

        <div className="about-values-grid">
            <div className="about-value-card">
                <BiRocket />
                <h3>Απλότητα</h3>
                <p>
                    Καθαρή εμπειρία χρήσης και γρήγορη πρόσβαση στις βασικές λειτουργίες.
                </p>
            </div>

            <div className="about-value-card">
                <BiCog />
                <h3>Ευελιξία</h3>
                <p>
                    Η εφαρμογή μπορεί να προσαρμοστεί εύκολα σε διαφορετικά προϊόντα και workflows.
                </p>
            </div>

            <div className="about-value-card">
                <BiShow />
                <h3>Σαφήνεια</h3>
                <p>
                    Οι πληροφορίες και οι ενέργειες παραμένουν οργανωμένες και εύκολα κατανοητές.
                </p>
            </div>

            <div className="about-value-card">
                <BiGroup />
                <h3>Συνεργασία</h3>
                <p>
                    Υποστηρίζει ανθρώπους, ομάδες και οργανισμούς που χρειάζονται μια κοινή ψηφιακή βάση.
                </p>
            </div>
        </div>
    </section>
    );

};

export default AboutSection;
