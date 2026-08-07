/*
|--------------------------------------------------------------------------
| Organization Info Context
|--------------------------------------------------------------------------
| Το OrganizationInfoContext χρησιμοποιείται για την κεντρική διαχείριση
| των βασικών στοιχείων ταυτότητας του οργανισμού μέσα στην εφαρμογή.
|
| Αντί κάθε component να καλεί ξεχωριστά το API, ο Provider φορτώνει
| τα στοιχεία του οργανισμού μία φορά από το endpoint `/organization-info`
| και τα αποθηκεύει σε κοινό state.
|
| Έτσι components όπως το Navbar, το Footer, το Hero και η σελίδα
| διαχείρισης Organization Info μπορούν να χρησιμοποιούν τα ίδια δεδομένα
| χωρίς επαναλαμβανόμενα API calls.
|
| Όταν ο admin ενημερώνει τα στοιχεία του οργανισμού, το Context μπορεί να
| ενημερωθεί με `setOrganizationInfo(updatedInfo)`, ώστε οι αλλαγές να
| εμφανίζονται άμεσα σε όλη την εφαρμογή χωρίς refresh.
|
| Με αυτόν τον τρόπο η πλατφόρμα μπορεί να προσαρμοστεί εύκολα από έναν
| οργανισμό σε άλλον, π.χ. από "ServiceKit" σε "ServiceKit Βόλος",
| αλλάζοντας τα στοιχεία από το admin panel και όχι από τον κώδικα.
|--------------------------------------------------------------------------
*/

import { createContext, useContext, useEffect, useState } from "react";
import { fetchOrganizationInfo } from "../api/OrganizationInfoApi";

const OrganizationInfoContext = createContext(null);

export const OrganizationInfoProvider = ({ children }) => {
    const [organizationInfo, setOrganizationInfo] = useState(null);
    const [loadingOrganizationInfo, setLoadingOrganizationInfo] = useState(false);
    const [organizationInfoError, setOrganizationInfoError] = useState("");

    const loadOrganizationInfo = async () => {
        try {
            setLoadingOrganizationInfo(true);
            setOrganizationInfoError("");

            const data = await fetchOrganizationInfo();
            setOrganizationInfo(data);
        } catch (err) {
            setOrganizationInfoError(
                err?.message || "Σφάλμα φόρτωσης στοιχείων οργανισμού."
            );
        } finally {
            setLoadingOrganizationInfo(false);
        }
    };

    useEffect(() => {
        loadOrganizationInfo();
    }, []);

    const value = {
        organizationInfo,
        loadingOrganizationInfo,
        organizationInfoError,
        setOrganizationInfo,
        reloadOrganizationInfo: loadOrganizationInfo,
    };

    return (
        <OrganizationInfoContext.Provider value={value}>
            {children}
        </OrganizationInfoContext.Provider>
    );
};

export const useOrganizationInfo = () => {
    const context = useContext(OrganizationInfoContext);

    if (!context) {
        throw new Error(
            "useOrganizationInfo must be used inside OrganizationInfoProvider"
        );
    }

    return context;
};