import "./Hero.css";

// Buttons
import { Link } from 'react-router-dom';


const Hero = () => {

    return (
        <section className="hero-section" >
            <div className="hero-container">
                {/* Left Section */}
                {/* Badge-Buttons-Info */}
                <div className="hero-left">
                    <span className="hero-badge">
                        Ψηφιακή πλατφόρμα αιτημάτων
                    </span>
                    <h1>
                        Η πόλη σου, <br />
                        <span>σε ένα κλικ</span>
                    </h1>

                    <p>
                        Ανέφερε προβλήματα της πόλης εύκολα και παρακολούθησε
                        την πορεία τους.
                    </p>


                    <div className="hero-buttons">
                        <Link to="/profile/reports/create" className="btn-action btn-md btn-create">
                            Δημιουργια Αιτήματος
                        </Link>

                        <a href="#how-it-works" className="btn-action btn-back">
                            Δες πώς λειτουργεί
                        </a>

                    </div>

                    <div className="hero-info">
                        <div className="hero-info-item">
                            <strong>2.345+</strong>
                            <span>Αιτήματα</span>
                        </div>

                        <div className="hero-info-item">
                            <strong>1.874</strong>
                            <span>Επιλυμένες</span>
                        </div>

                        <div className="hero-info-item">
                            <strong>98%</strong>
                            <span>Ικανοποίηση</span>
                        </div>
                    </div>

                </div>

                {/* Right Section */}
                {/* Image */}
                <div className="hero-right">
                    <div className="hero-visual">
                        <div className="hero-phone">
                            <div className="hero-phone-map">
                                <span className="hero-map-pin">📍</span>

                                {/* Προσομοίωση κάρτας δημιουργίας νέας αιτήματος. */}
                                <div className="hero-report-card">
                                    <span className="hero-report-label">
                                        Νέα αίτημα
                                    </span>

                                    <div className="hero-report-line large"></div>
                                    <div className="hero-report-line"></div>

                                    <div className="hero-report-bottom">
                                        <div className="hero-report-image"></div>
                                        <button type="button">
                                            Υποβολή
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hero-floating hero-floating-camera">
                            📷
                        </div>

                        <div className="hero-floating hero-floating-check">
                            ✓
                        </div>

                        <div className="hero-floating hero-floating-location">
                            📍
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );

}

export default Hero;
