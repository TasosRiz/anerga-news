import React from "react";
import "./HowItWorks.css";
import { howItWorksItems } from "./howItWorksItems";


//  Ενότητα παρουσίασης του τρόπου λειτουργίας της εφαρμογής.

//  Δημιουργεί δυναμικά τα βασικά βήματα της διαδικασίας
//  από το array howItWorksItems.
const HowItWorks = () => {
    return (
        <section className="howitworks-section" >
            <div className="howitworks-header">
                <h2>Πώς λειτουργεί</h2>
                <p>Μόλις λίγα βήματα για να κάνεις την πόλη σου καλύτερη.</p>
            </div>

            <div className="howitworks-box">
                {howItWorksItems.map((item) => (
                    <div className="howitworks-card" key={item.id}>
                        <span className="howitworks-number">
                            {item.number}
                        </span>

                        <div className="howitworks-photo">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                />
                            ) : (
                                <span>No Image</span>
                            )}
                        </div>

                        <h3>{item.title}</h3>

                        <p>{item.text}</p>

                        <div className="howitworks-line"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;