import { Link } from "react-router-dom";

import "./AboutImportance.css";

const AboutImportance = () => {
    return (<section className="about-importance"> <div> <h2>Γιατί έχει σημασία</h2>

        <p>
            Μια καλή ψηφιακή εμπειρία βοηθά τους χρήστες να βρίσκουν
            πιο εύκολα αυτό που χρειάζονται και να ολοκληρώνουν
            τις ενέργειές τους γρήγορα και απλά.
        </p>
    </div>

        <Link to="/register" className="btn-action btn-save">
            Ξεκίνα τώρα
        </Link>
    </section>
    );

};

export default AboutImportance;
