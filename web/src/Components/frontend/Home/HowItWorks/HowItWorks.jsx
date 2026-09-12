import React from "react";
import "./HowItWorks.css";
import { howItWorksItems } from "./howItWorksItems";

// Generic section that presents the basic workflow
// for getting started with the starter kit.
const HowItWorks = () => {
    return (<section className="howitworks-section"> <div className="howitworks-header"> <h2>Πώς ξεκινάς</h2> <p>
        Από το setup μέχρι το δικό σου προϊόν, σε λίγα απλά βήματα. </p> </div>

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
