import { apiUrl, authHeaders, publicHeaders, getApiErrorMessage } from "../../Auth/api/auth";

// Get Info
export async function fetchOrganizationInfo() {
    const res = await fetch(`${apiUrl}/organization-info`, {
        method: "GET",
        headers: publicHeaders,
    });

    let result = {};

    try {
        result = await res.json();
    } catch {
        result = {};
    }

    if (!res.ok) {
        throw new Error(
            getApiErrorMessage(result, "Σφάλμα φόρτωσης στοιχείων οργανισμού.")
        );
    }

    return result.data || null;
}

// Update
export async function updateOrganizationInfo(token, data) {
    const payload = {
        app_name: data.app_name?.trim(),
        organization_name: data.organization_name?.trim(),
        city: data.city?.trim(),
        email: data.email?.trim() || null,
        phone: data.phone?.trim() || null,
        address: data.address?.trim() || null,
        primary_color: data.primary_color?.trim(),
        secondary_color: data.secondary_color?.trim(),
        logo: data.logo?.trim() || null,
    };

    const res = await fetch(`${apiUrl}/organization-info`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });

    let result = {};

    try {
        result = await res.json();
    } catch {
        result = {};
    }

    if (!res.ok) {
        throw new Error(
            getApiErrorMessage(result, "Σφάλμα ενημέρωσης στοιχείων οργανισμού.")
        );
    }

    return result.data || result;
}