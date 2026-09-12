import { BiGridAlt } from "react-icons/bi";
import "./AboutHero.css";

const AboutHero = ({ appName }) => {
    return (<section className="about-hero"> <div className="about-hero-content"> <h1>Σχετικά με το {appName}</h1>

        <p>
            Το {appName} είναι μια σύγχρονη ψηφιακή εφαρμογή σχεδιασμένη
            για να προσφέρει μια απλή, οργανωμένη και ευέλικτη εμπειρία
            στους χρήστες της.
        </p>
    </div>

        <div className="about-hero-visual">
            <div className="about-hero-illustration">
                <BiGridAlt className="about-hero-map-icon" />

                <div className="about-city-shapes">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className="about-person about-person-left">
                    🧑‍💻
                </div>

                <div className="about-person about-person-right">
                    🧑‍💼
                </div>
            </div>
        </div>
    </section>
    );

};

export default AboutHero;
