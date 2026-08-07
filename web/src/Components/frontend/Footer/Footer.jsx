import React, { useState, useEffect } from "react";
import './footer.css';
import fb from './FooterAssets/fb.svg';
import twitter from './FooterAssets/twitter.svg';
import linkedin from './FooterAssets/linkedin.svg';
import insta from './FooterAssets/insta.svg';

// Icons
import {
    BiMap,
    BiMapPin,
    BiPhone,
    BiEnvelope,
    BiTimeFive,
} from "react-icons/bi";


// API
import { useOrganizationInfo } from '../../common/OrganizationInfo/Context/OrganizationInfoContext'

const Footer = () => {
    const [form, setForm] = useState({
        app_name: "",
        organization_name: "",
        city: "",
        email: "",
        phone: "",
        address: "",
        primary_color: "#526d82",
        secondary_color: "#e86f2f",
        logo: "",
    });

    // Load Info
    const { organizationInfo } = useOrganizationInfo();

    const appName = organizationInfo?.app_name || "ServiceKit";
    const organizationName = organizationInfo?.organization_name || "Your Organization";
    const city = organizationInfo?.city || "Your City";
    const email = organizationInfo?.email || "";
    const phone = organizationInfo?.phone || "";
    const address = organizationInfo?.address || "";


    return (
        <section className="footer-section">
            <div className="footer-container">
                <div className="footer-links">
                    <div className="footer-links-buttons">
                        <h4>Το {appName} είναι η πλατφόρμα επικοινωνίας μεταξύ χρηστών και οργανισμού,
                            για μια πιο καθάρη, λειτουργίκη και ανθρώπινη πόλη.</h4>
                        <div className="socialmedia">
                            <p><img src={fb} alt="" /></p>
                            <p><img src={twitter} alt="" /></p>
                            <p><img src={linkedin} alt="" /></p>
                            <p><img src={insta} alt="" /></p>
                        </div>
                    </div>

                    <div className="footer-links-buttons">
                        <h4>Πλοήγηση</h4>
                        <a href="/about">
                            <p>Αρχική</p>
                        </a>
                        <a href="/press">
                            <p>Αιτήματα</p>
                        </a>
                        <a href="/career">
                            <p>Σχετικά</p>
                        </a>
                        <a href="/contact">
                            <p>Επικοινωνία</p>
                        </a>
                    </div>

                    <div className="footer-links-buttons">
                        <h4>Χρήσιμοι Σύνδεσμοι</h4>
                        <a href="/employer">
                            <p>Οδηγίες Χρήσης</p>
                        </a>
                        <a href="/healthplan">
                            <p>Συχνές Ερωτήσεις</p>
                        </a>
                        <a href="/individual">
                            <p>Όροι Χρήσης</p>
                        </a>
                        <a href="/individual">
                            <p>Πολιτική Απορρήτου</p>
                        </a>
                    </div>

                    <div className="footer-links-buttons footer-contacts">
                        <h4>Επικοινωνία</h4>

                        <p className=" footer-contact-item">
                            <BiMap />
                            {organizationName || "-"}
                        </p>

                        <p className="footer-contact-item">
                            <BiMapPin />
                            {address || "-"}
                        </p>

                        <p className="footer-contact-item">
                            <BiPhone />
                            <a href={`tel:${phone}`}>{phone || "-"}</a>
                        </p>

                        <p className="footer-contact-item">
                            <BiEnvelope />
                            <a href={`mailto:${form.email}`}>{email || "-r"}</a>
                        </p>

                        <p className="footer-contact-item">
                            <BiTimeFive />
                            Δευ-Παρ 8:00-16:00
                        </p>
                    </div>
                </div>
                <hr></hr>

                <div className="footer-below">
                    <div className="footer-copyright">
                        <p>
                            © {new Date().getFullYear()} {appName}. Όλα τα δικαιώματα διατηρούνται.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Footer;