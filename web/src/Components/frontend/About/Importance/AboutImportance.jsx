import { Link } from "react-router-dom";

import "./AboutImportance.css";

const AboutImportance = () => {
    return (
        <section className="about-importance">
            <div>
                <h2>Γιατί έχει σημασία</h2>
                <p>
                    Κάθε αίτημα μετράει. Μέσα από τη συμμετοχή των χρηστών,
                    η πόλη μπορεί να γίνει πιο λειτουργική, καθαρή και ασφαλής.
                </p>
            </div>

            <Link to="/profile/reports/create" className="btn-action btn-save">
                Ξεκίνα μία αίτημα
            </Link>
        </section>


    );
};

export default AboutImportance;