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

import "./About.css";

// Sections
import AboutHero from "./Hero/AboutHero";
import AboutSection from "./Hero/AboutSection/AboutSection";
import AboutImportance from "./Importance/AboutImportance";
import AboutMobile from "./Mobile/AboutMobile";
import { useOrganizationInfo } from "../../common/OrganizationInfo/Context/OrganizationInfoContext";

const About = () => {

    // Load Info
    const { organizationInfo } = useOrganizationInfo();
    const appName = organizationInfo?.app_name || "ServiceKit";

    return (
        <main className="about-page">
            <AboutHero appName={appName} />
            <AboutSection />
            <AboutMobile appName={appName} />
            <AboutImportance />
        </main>
    );
};

export default About;