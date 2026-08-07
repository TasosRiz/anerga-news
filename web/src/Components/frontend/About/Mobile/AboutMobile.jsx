import { Link } from "react-router-dom";
import {
    BiMessageRoundedDetail,
    BiCog,
    BiShow,
    BiGroup,
    BiMobileAlt,
    BiMap,
    BiCamera,
    BiBell,
} from "react-icons/bi";

import "./AboutMobile.css";

const AboutMobile = ({ appName }) => {
    return (
        <section className="about-mobile-section">
            <div className="about-mobile-content">
                <span className="about-badge">Mobile εφαρμογή</span>

                <h2>Το {appName} και στο κινητό σου</h2>

                <p>
                    Η mobile εφαρμογή δίνει τη δυνατότητα στους πολίτες να
                    δημιουργούν αιτήματα από το σημείο που βρίσκονται,
                    προσθέτοντας κατηγορία, τοποθεσία και φωτογραφία.
                </p>

                <div className="about-mobile-list">
                    <div>
                        <BiMessageRoundedDetail />
                        <span>Δημιουργία νέας αιτήματος</span>
                    </div>

                    <div>
                        <BiCamera />
                        <span>Προσθήκη φωτογραφίας</span>
                    </div>

                    <div>
                        <BiMap />
                        <span>Επιλογή τοποθεσίας στον χάρτη</span>
                    </div>

                    <div>
                        <BiBell />
                        <span>Παρακολούθηση εξέλιξης αιτήματος</span>
                    </div>
                </div>

                <div className="about-mobile-actions">
                    <a href="/downloads/servicekit.apk" className="btn-action btn-save" download>
                        Λήψη Android App
                    </a>

                    <span>Σύντομα διαθέσιμο και στο Play Store</span>
                </div>
            </div>

            <div className="about-mobile-preview">
                <div className="about-phone about-phone-left">
                    <h4>Κατηγορίες</h4>
                    <p>Φωτισμός</p>
                    <p>Καθαριότητα</p>
                    <p>Οδικό Δίκτυο</p>
                </div>

                <div className="about-phone about-phone-main">
                    <BiMap />
                    <h4>Νέα Αίτημα</h4>
                    <p>Επιλογή σημείου στον χάρτη</p>
                    <button>Υποβολή</button>
                </div>

                <div className="about-phone about-phone-right">
                    <h4>Οι αιτήματα μου</h4>
                    <p>Σε εξέλιξη</p>
                    <p>Ολοκληρώθηκε</p>
                </div>
            </div>
        </section>


    );
};

export default AboutMobile;