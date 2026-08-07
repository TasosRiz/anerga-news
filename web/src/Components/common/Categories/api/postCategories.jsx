import {
    apiUrl,
    authHeaders,
} from "../../Auth/api/auth";

//  API functions για τη διαχείριση κατηγοριών άρθρων.
//
//  Αναλαμβάνει:
//  - δημιουργία κατηγορίας άρθρου
//  - φόρτωση κατηγοριών άρθρων
//  - ενημέρωση κατηγορίας άρθρου
//  - διαγραφή κατηγορίας άρθρου

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
// Δημιουργεί νέα κατηγορία άρθρου.
export async function createPostCategory(
    token,
    data
) {
    const response = await fetch(
        `${apiUrl}/post-categories`,
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

// Get
// Φορτώνει όλες τις κατηγορίες άρθρων.
export async function fetchPostCategories(
    token
) {
    const response = await fetch(
        `${apiUrl}/post-categories`,
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

// Update
// Ενημερώνει υπάρχουσα κατηγορία άρθρου.
export async function updatePostCategory(
    token,
    id,
    data
) {
    const response = await fetch(
        `${apiUrl}/post-categories/${id}`,
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

// Delete
// Διαγράφει μία κατηγορία άρθρου.
export async function deletePostCategory(
    token,
    id
) {
    const response = await fetch(
        `${apiUrl}/post-categories/${id}`,
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