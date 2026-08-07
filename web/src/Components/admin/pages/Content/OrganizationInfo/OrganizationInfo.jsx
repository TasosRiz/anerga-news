import { useEffect, useState } from "react";
import "./OrganizationInfo.css";

// API
import { updateOrganizationInfo } from "../../../../common/OrganizationInfo/api/OrganizationInfoApi";

// Components
import OrganizationInfoHeader from "./Header/OrganizationInfoHeader";
import OrganizationInfoForm from "./Form/OrganizationInfoForm";

// Context
import { useOrganizationInfo } from "../../../../common/OrganizationInfo/Context/OrganizationInfoContext";
import AppStatus from "../../../../common/components/Alerts/AppStatus";
import { useAuth } from "../../../../common/Auth/provider/AuthProvider";

const OrganizationInfo = () => {
    // Παίρνει το token του συνδεδεμένου χρήστη από το AuthProvider.
    const { token } = useAuth();

    // Messages
    const [successMessage, setSuccessMessage] = useState("");

    // Load Info from context
    const {
        organizationInfo,
        loadingOrganizationInfo,
        organizationInfoError,
        setOrganizationInfo,
    } = useOrganizationInfo();

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

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!organizationInfo) return;

        setForm({
            app_name: organizationInfo.app_name || "",
            organization_name: organizationInfo.organization_name || "",
            city: organizationInfo.city || "",
            email: organizationInfo.email || "",
            phone: organizationInfo.phone || "",
            address: organizationInfo.address || "",
            primary_color: organizationInfo.primary_color || "#526d82",
            secondary_color: organizationInfo.secondary_color || "#e86f2f",
            logo: organizationInfo.logo || "",
        });
    }, [organizationInfo]);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const updatedInfo = await updateOrganizationInfo(token, form);

            setForm({
                app_name: updatedInfo.app_name || "",
                organization_name: updatedInfo.organization_name || "",
                city: updatedInfo.city || "",
                email: updatedInfo.email || "",
                phone: updatedInfo.phone || "",
                address: updatedInfo.address || "",
                primary_color: updatedInfo.primary_color || "#526d82",
                secondary_color: updatedInfo.secondary_color || "#e86f2f",
                logo: updatedInfo.logo || "",
            });

            setOrganizationInfo(updatedInfo);

            setSuccessMessage("Τα στοιχεία οργανισμού ενημερώθηκαν!");
        } catch (err) {
            alert(err?.message || "Σφάλμα ενημέρωσης στοιχείων οργανισμού.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="organization-info-page box">
            <OrganizationInfoHeader />

            <AppStatus
                loading={loadingOrganizationInfo}
                error={organizationInfoError}
                success={successMessage}
                loadingMessage="Φόρτωση στοιχείων οργανισμού..."
                center
            />



            {!loadingOrganizationInfo && !organizationInfoError && (
                <OrganizationInfoForm
                    info={form}
                    saving={saving}
                    onSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            )}
        </div>
    );
};

export default OrganizationInfo;