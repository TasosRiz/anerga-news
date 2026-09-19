import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="hero-section box">
            <div className="hero-container">

                {/* LEFT */}
                <div className="hero-intro">

                    <span className="hero-eyebrow">
                        Η ελληνική creator σκηνή, σε ένα μέρος
                    </span>

                    <h1>Τι παίζει σήμερα;</h1>

                    <p>
                        Νέα, videos, συζητήσεις και ό,τι κινεί
                        την ελληνική creator κοινότητα.
                    </p>

                    <div className="hero-stats">

                        <div className="hero-stat-card">
                            <span className="hero-stat-icon">🔥</span>

                            <div>
                                <strong>124</strong>
                                <span>Trending</span>
                            </div>
                        </div>

                        <div className="hero-stat-card">
                            <span className="hero-stat-icon">👥</span>

                            <div>
                                <strong>3.2K</strong>
                                <span>Μέλη</span>
                            </div>
                        </div>

                        <div className="hero-stat-card">
                            <span className="hero-stat-icon">💬</span>

                            <div>
                                <strong>856</strong>
                                <span>Συζητήσεις</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT */}
                <article className="hero-featured">

                    <img
                        src="/images/hackypixelz.jpg"
                        alt="HackyPixelz"
                        className="hero-image"
                    />

                    <div className="hero-overlay" />

                    <div className="hero-featured-content">

                        <span className="hero-badge">
                            ΚΥΡΙΟ ΘΕΜΑ
                        </span>

                        <h2>
                            HackyPixelz: Νέο βίντεο –
                            «Η Ανεργία Συνεχίζεται»
                        </h2>

                        <p>
                            Ο HackyPixelz επιστρέφει με νέο βίντεο και
                            η κοινότητα ήδη συζητάει τα highlights.
                        </p>

                        <div className="hero-featured-bottom">

                            <div className="hero-meta">
                                <span>Πριν 2 ώρες</span>
                                <span>12.4K προβολές</span>
                                <span>287 σχόλια</span>
                            </div>

                            <Link
                                to="/post/hackypixelz"
                                className="hero-button"
                            >
                                Δες περισσότερα
                                <span aria-hidden="true">→</span>
                            </Link>

                        </div>

                    </div>
                </article>

            </div>
        </section>
    );
};

export default Hero;