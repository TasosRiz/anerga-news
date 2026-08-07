import {
    apiUrl,
    authHeaders,
} from "../../Auth/api/auth";

//  API functions για τη διαχείριση κατηγοριών αιτημάτων.
//
//  Αναλαμβάνει:
//  - δημιουργία κατηγορίας
//  - ενημέρωση κατηγορίας
//  - φόρτωση όλων ή μόνο των ενεργών κατηγοριών
//  - διαγραφή κατηγορίας


// Μετατρέπει με ασφάλεια το response σε JSON.
const parseResponse = async (response) => {
    return response
        .json()
        .catch(() => ({}));
};

// Επιστρέφει το πρώτο διαθέσιμο validation error.
const getCategoryError = (
    result,
    fallbackMessage
) => {
    return (
        result?.errors?.name?.[0] ||
        result?.errors?.status?.[0] ||
        result?.message ||
        fallbackMessage
    );
};

// Create
// Δημιουργεί νέα κατηγορία.
export async function createCategory(
    token,
    data
) {
    const response = await fetch(
        `${apiUrl}/categories`,
        {
            method: "POST",
            headers: authHeaders(token),
            body: JSON.stringify({
                name: data.name?.trim(),
                status: Number(data.status),
            }),
        }
    );

    const result =
        await parseResponse(response);

    if (!response.ok) {
        throw new Error(
            getCategoryError(
                result,
                "Σφάλμα δημιουργίας κατηγορίας."
            )
        );
    }

    return result.data || result;
}

// Update
// Ενημερώνει υπάρχουσα κατηγορία.
export async function updateCategory(
    token,
    id,
    data
) {
    const response = await fetch(
        `${apiUrl}/categories/${id}`,
        {
            method: "PUT",
            headers: authHeaders(token),
            body: JSON.stringify({
                name: data.name?.trim(),
                status: Number(data.status),
            }),
        }
    );

    const result =
        await parseResponse(response);

    if (!response.ok) {
        throw new Error(
            getCategoryError(
                result,
                "Σφάλμα ενημέρωσης κατηγορίας."
            )
        );
    }

    return result.data || result;
}

// Get
// Φορτώνει όλες τις κατηγορίες.
export async function fetchCategories(token) {
    const response = await fetch(
        `${apiUrl}/categories`,
        {
            headers: authHeaders(token),
        }
    );

    const result =
        await parseResponse(response);

    if (!response.ok) {
        throw new Error(
            result?.message ||
            "Σφάλμα φόρτωσης κατηγοριών."
        );
    }

    return result.data || result;
}

// Get active categ
// Φορτώνει μόνο τις ενεργές κατηγορίες.
export async function fetchActiveCategories(token) {
    const categories =
        await fetchCategories(token);

    return categories.filter(
        (category) =>
            Number(category.status) === 1
    );
}

// Delete
// Διαγράφει μία κατηγορία.
export async function deleteCategory(
    token,
    id
) {
    const response = await fetch(
        `${apiUrl}/categories/${id}`,
        {
            method: "DELETE",
            headers: authHeaders(token),
        }
    );

    const result =
        await parseResponse(response);

    if (!response.ok) {
        throw new Error(
            result?.message ||
            "Σφάλμα διαγραφής κατηγορίας."
        );
    }

    return result.data || result;
}