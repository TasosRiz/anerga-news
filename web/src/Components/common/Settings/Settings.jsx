//
//  Κοινό component ρυθμίσεων χρήστη και admin.
//
//  Αναλαμβάνει:
//  - επιλογή διαθέσιμων sections ανά variant
//  - διαχείριση ενεργού tab
//  - εμφάνιση του αντίστοιχου περιεχομένου
//

import { useEffect, useState } from "react";

// Components
import Tabs from "../components/Tabs/Tabs";
import ProfileSettings from "./Profile/ProfileSettings";
import ProfilePassword from "./Password/ProfilePassword";
import ProfileInfo from "./Info/ProfileInfo";
import ProfileReports from "./Reports/ProfileReports";

// CSS
import "./Settings.css";

const adminSections = [
    {
        label: "Προφίλ",
        value: "profile",
    },
    {
        label: "Κωδικός",
        value: "password",
    },
    {
        label: "Αιτήματα",
        value: "reports",
    },
    {
        label: "Πληροφορίες Συστήματος",
        value: "systeminfo",
    },
];

const userSections = [
    {
        label: "Προφίλ",
        value: "profile",
    },
    {
        label: "Κωδικός",
        value: "password",
    },
];

const Settings = ({
    token,
    user,
    variant = "admin",
}) => {
    // Διαθέσιμα sections ανάλογα με τον τύπο χρήστη.
    const sections =
        variant === "admin"
            ? adminSections
            : userSections;

    // Ενεργό section των ρυθμίσεων.
    const [selectedSection, setSelectedSection] =
        useState("profile");

    // Επαναφέρει το ενεργό section όταν αλλάζει το variant
    // και το προηγούμενο section δεν είναι πλέον διαθέσιμο.
    useEffect(() => {
        const sectionExists = sections.some(
            (section) => section.value === selectedSection
        );

        if (!sectionExists) {
            setSelectedSection("profile");
        }
    }, [variant, selectedSection]);

    // Επιστρέφει το περιεχόμενο του ενεργού section.
    const renderSectionContent = () => {
        switch (selectedSection) {
            case "profile":
                return (
                    <ProfileSettings
                        token={token}
                        user={user}
                        variant={variant}
                    />
                );

            case "password":
                return (
                    <ProfilePassword
                        token={token}
                        user={user}
                    />
                );

            case "reports":
                return variant === "admin"
                    ? <ProfileReports />
                    : null;

            case "systeminfo":
                return variant === "admin"
                    ? <ProfileInfo />
                    : null;

            default:
                return null;
        }
    };

    return (
        <div className="settings-container">
            <div className="content-page-layout">
                <aside className="content-tabs-wrapper">
                    <Tabs
                        tabs={sections}
                        activeTab={selectedSection}
                        onChange={setSelectedSection}
                    />
                </aside>

                <div className="content-editor-panel">
                    {renderSectionContent()}
                </div>
            </div>
        </div>
    );
};

export default Settings;