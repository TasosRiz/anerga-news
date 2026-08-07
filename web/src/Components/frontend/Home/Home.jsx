import "../../common/css/style.scss";
import "./Home.css";

import Audience from "./Audience/Audience";
import HowItWorks from "./HowItWorks/HowItWorks";
import Hero from "./Hero/Hero";

//   Αρχική σελίδα της εφαρμογής.
//   Συνθέτει τα βασικά sections του frontend, όπως
//   hero section
//   το κοινό στο οποίο απευθύνεται η εφαρμογή και
//   την παρουσίαση του τρόπου λειτουργίας της υπηρεσίας.

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <Audience />
            <HowItWorks />
        </div>
    );
};

export default Home;