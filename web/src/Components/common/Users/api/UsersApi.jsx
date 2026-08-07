import { apiUrl, authHeaders } from "../../Auth/api/auth";

export async function fetchUserStats(token) {
    const res = await fetch(`${apiUrl}/user-stats`, {
        method: "GET",
        headers: authHeaders(token),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Σφάλμα φόρτωσης στατιστικών χρηστών");
    }

    return result.data;
}

// Get all users (Admin)
export async function getAllUsers(token) {

    const res = await fetch(`${apiUrl}/users`, {
        method: "GET",
        headers: authHeaders(token),
    });

    const result = await res.json();

    if (res.status === 401) {
        localStorage.removeItem("adminInfo");
        throw new Error("Η σύνδεση έληξε. Κάνε ξανά login.");
    }

    if (!res.ok) {
        throw new Error(result.message || "Σφάλμα φόρτωσης χρηστών");
    }

    return result.data || [];
}

// Update Users
export async function updateUser(token, id, data) {
    // body
    const payload = {
        name: data.name?.trim(),
        email: data.email?.trim(),
        role: data.role,
        status: data.status,
    };

    const res = await fetch(`${apiUrl}/user/${id}`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Σφάλμα ενημέρωσης χρήστη.");
    }

    return result.data || result;
}