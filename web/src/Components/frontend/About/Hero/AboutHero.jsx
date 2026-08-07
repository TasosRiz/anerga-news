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

import "./AboutHero.css";

const AboutHero = ({ appName }) => {
    return (
        <section className="about-hero">
            <div className="about-hero-content">
                <h1>Σχετικά με το {appName}</h1>

                <p>
                    Το {appName} είναι μια ψηφιακή πλατφόρμα που ενισχύει την επικοινωνία
                    μεταξύ χρηστών και οργανισμού, με στόχο μια πιο καθαρή, λειτουργική
                    και ανθρώπινη πόλη.
                </p>
            </div>

            <div className="about-hero-visual">
                <div className="about-hero-illustration">
                    <BiMap className="about-hero-map-icon" />

                    <div className="about-city-shapes">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className="about-person about-person-left">🧑‍💻</div>
                    <div className="about-person about-person-right">🧑‍💼</div>
                </div>
            </div>
        </section>


    );
};

export default AboutHero;