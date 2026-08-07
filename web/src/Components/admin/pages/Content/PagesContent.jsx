import React, { useState } from "react";

// CSS
import "./PagesContent.css";

// Layout
import PagesLayout from "../pages-layout/pages-layout";

// Components
// Tabs
import Tabs from '../../../common/components/Tabs/Tabs'
import Posts from "./Posts/Posts";
import OrganizationInfo from "./OrganizationInfo/OrganizationInfo";
import Notifications from "./Notifications/Notifications";



//  Κεντρική σελίδα διαχείρισης περιεχομένου του admin panel.

//  Επιτρέπει στον διαχειριστή να
//  -επιλέγει διαφορετική ενότητα περιεχομένου μέσω tabs,
//  -εμφανίζει το αντίστοιχο component μέσα στο editor panel.

//  Κάθε επιμέρους ενότητα διαχειρίζεται ανεξάρτητα
//  τη φόρτωση και την ενημέρωση των δεδομένων της.


// Διαθέσιμες ενότητες διαχείρισης περιεχομένου.
const sections = [
    { label: "Posts", value: "posts" },
    { label: "Notifications", value: "notifications" },
    { label: "Organization Info", value: "organizationInfo" },



];

const PagesContent = ({ token, user }) => {
    // Αποθηκεύει την ενότητα που έχει επιλέξει ο διαχειριστής.
    const [selectedSection, setSelectedSection] = useState(sections[0].value);


    // Επιστρέφει το component που αντιστοιχεί
    // στην ενεργή ενότητα διαχείρισης.
    const renderSectionContent = () => {
        switch (selectedSection) {
            case "posts":
                return <Posts />;

            case "notifications":
                return <Notifications />;
            case "organizationInfo":
                return <OrganizationInfo />;

            default:
                return (
                    <div className="content-box">
                        Επίλεξε ενότητα περιεχομένου.
                    </div>
                );
        }
    };

    return (
        <PagesLayout
            title="Περιεχόμενο"
            showSearch={false}
            showNotification={false}>

            <div className="page-container">
                <div className="content-page-layout">
                    {/* Tabs με τις διαθέσιμες ενότητες. */}
                    {/* Το Tabs ενημερώνει το selectedSection */}
                    {/* όταν ο διαχειριστής αλλάζει επιλογή. */}
                    <aside className="content-tabs-wrapper">
                        <Tabs
                            tabs={sections}
                            activeTab={selectedSection}
                            onChange={setSelectedSection}
                        />
                    </aside>
                </div>

                {/* Εμφάνιση και επεξεργασία
                    της επιλεγμένης ενότητας. */}
                <div className="content-editor-panel">
                    {renderSectionContent()}
                </div>
            </div>
        </PagesLayout>
    );
};

export default PagesContent;