import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-container">

                {/* Left */}
                <div className="hero-left">

                    <span className="hero-badge">
                        Full-Stack SaaS Starter
                    </span>

                    <h1>
                        Ξεκίνα το επόμενο <br />
                        <span>project σου γρηγορότερα</span>
                    </h1>

                    <p>
                        Ένα έτοιμο foundation για σύγχρονες web εφαρμογές,
                        με authentication, dashboard, API, users και reusable
                        components.
                    </p>

                    <div className="hero-buttons">
                        <Link
                            to="/register"
                            className="btn-action btn-md btn-create"
                        >
                            Ξεκίνα τώρα
                        </Link>

                        <a
                            href="#features"
                            className="btn-action btn-back"
                        >
                            Δες τα features
                        </a>
                    </div>

                    <div className="hero-info">
                        <div className="hero-info-item">
                            <strong>Laravel</strong>
                            <span>Backend API</span>
                        </div>

                        <div className="hero-info-item">
                            <strong>React</strong>
                            <span>Web App</span>
                        </div>

                        <div className="hero-info-item">
                            <strong>Flutter</strong>
                            <span>Mobile App</span>
                        </div>
                    </div>

                </div>

                {/* Right */}
                <div className="hero-right">
                    <div className="hero-visual">

                        <div className="hero-phone">
                            <div className="hero-phone-map">

                                <span className="hero-map-pin">
                                    ⚡
                                </span>

                                <div className="hero-report-card">

                                    <span className="hero-report-label">
                                        Your Application
                                    </span>

                                    <div className="hero-report-line large"></div>
                                    <div className="hero-report-line"></div>

                                    <div className="hero-report-bottom">
                                        <div className="hero-report-image"></div>

                                        <button type="button">
                                            Get Started
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="hero-floating hero-floating-camera">
                            ⚙️
                        </div>

                        <div className="hero-floating hero-floating-check">
                            ✓
                        </div>

                        <div className="hero-floating hero-floating-location">
                            🚀
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;