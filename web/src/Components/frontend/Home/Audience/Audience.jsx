import React from "react";
import "./Audience.css";
import { audienceItems } from "./audienceItems";

// Generic section for presenting the types of users
// or use cases supported by the template.
const Audience = () => {
    return (
        <section className="audience-container">
            <h2>Ένα starter kit για διαφορετικές ανάγκες</h2>

            <div className="audience-box">
                {audienceItems.map((item) => (
                    <div className="audience-card" key={item.id}>
                        <div className="audience-card-left">
                            <div className="card-photo">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="audience-image"
                                />
                            </div>
                        </div>

                        <div className="audience-card-right">
                            <div className="card-title">
                                <h3>{item.title}</h3>
                            </div>

                            <div className="card-text">
                                <p>{item.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Audience;