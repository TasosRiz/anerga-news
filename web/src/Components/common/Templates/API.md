import { apiUrl, authHeaders } from "../../Auth/api/auth";

/**
 * Template API Factory
 * Χρήση:
 * export const CategoryApi = createTemplateApi("categories", "κατηγορίας", "κατηγοριών");
 */
export function createTemplateApi(endpoint, singleName = "εγγραφής", pluralName = "εγγραφών") {
    return {
        // Create
        async create(token, data) {
            const res = await fetch(`${apiUrl}/${endpoint}`, {
                method: "POST",
                headers: authHeaders(token),
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(
                    getApiError(result) ||
                    `Σφάλμα δημιουργίας ${singleName}.`
                );
            }

            return result.data || result;
        },

        // Update
        async update(token, id, data) {
            const res = await fetch(`${apiUrl}/${endpoint}/${id}`, {
                method: "PUT",
                headers: authHeaders(token),
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(
                    getApiError(result) ||
                    `Σφάλμα ενημέρωσης ${singleName}.`
                );
            }

            return result.data || result;
        },

        // Get All
        async fetchAll(token) {
            const res = await fetch(`${apiUrl}/${endpoint}`, {
                method: "GET",
                headers: authHeaders(token),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(
                    getApiError(result) ||
                    `Σφάλμα φόρτωσης ${pluralName}.`
                );
            }
            return result.data || result;
        },

        // Get One
        async fetchById(token, id) {
            const res = await fetch(`${apiUrl}/${endpoint}/${id}`, {
                method: "GET",
                headers: authHeaders(token),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(
                    getApiError(result) ||
                    `Σφάλμα φόρτωσης ${singleName}.`
                );
            }

            return result.data || result;
        },

        // Delete
        async delete(token, id) {
            const res = await fetch(`${apiUrl}/${endpoint}/${id}`, {
                method: "DELETE",
                headers: authHeaders(token),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(
                    getApiError(result) ||
                    `Σφάλμα διαγραφής ${singleName}.`
                );
            }

            return result.data || result;
        },

        // Get Active
        async fetchActive(token) {
            const items = await this.fetchAll(token);

            return items.filter((item) => Number(item.status) === 1);
        },
    };
}

/**
 * Παίρνει error message από διάφορες πιθανές μορφές API response.
 */
function getApiError(result) {
    if (!result) return null;

    if (typeof result.message === "string") {
        return result.message;
    }

    if (typeof result.errors === "string") {
        return result.errors;
    }

    if (typeof result.message === "object") {
        const firstMessageKey = Object.keys(result.message)[0];
        return result.message[firstMessageKey]?.[0];
    }

    if (typeof result.errors === "object") {
        const firstErrorKey = Object.keys(result.errors)[0];
        return result.errors[firstErrorKey]?.[0];
    }

    return null;
}