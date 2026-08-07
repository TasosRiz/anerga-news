import React from "react";
import "./Audience.css";
import { audienceItems } from "./audienceItems";

//  Ενότητα παρουσίασης του κοινού στο οποίο απευθύνεται η εφαρμογή.

//  Δημιουργεί δυναμικά τις κάρτες χρηστών από το array audienceItems,
//  ώστε το περιεχόμενο να παραμένει οργανωμένο και εύκολα επεκτάσιμο.
const Audience = () => {

    return (
        <section className="audience-container">
            <h2>Το ServiceKit προσαρμόζεται στις ανάγκες σας</h2>

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