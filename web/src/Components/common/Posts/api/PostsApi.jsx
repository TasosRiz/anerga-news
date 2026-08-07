import {
    apiUrl,
    authHeaders,
    publicHeaders,
    getApiErrorMessage,
    parseJsonResponse,
} from "../../../common/Auth/api/auth";

// Δημιουργεί το payload για δημιουργία ή ενημέρωση post.
const createPostPayload = (data) => ({
    title: data.title?.trim() || "",
    body: data.body?.trim() || "",
    category_id: data.category_id
        ? Number(data.category_id)
        : null,
    photo: data.photo || null,
    status: data.status || "active",
    published_at: data.published_at || null,

    // Αν θα σταλεί notification στους χρήστες.
    notify_users: Boolean(data.notify_users),
});

// Get Posts
// Φορτώνει όλες τις δημοσιεύσεις για admin panel .
export async function fetchPosts(token) {

    const response = await fetch(`${apiUrl}/posts`, {
        method: "GET",
        headers: authHeaders(token),
    });
    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα φόρτωσης posts."
            )
        );
    }

    return Array.isArray(result.data)
        ? result.data
        : [];
}

// Create
// Δημιουργεί νέα δημοσίευση.
export async function createPost(token, data) {

    const response = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(createPostPayload(data)),
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα δημιουργίας post."
            )
        );
    }

    return result.data || result;
}

// Edit
// Ενημερώνει υπάρχουσα δημοσίευση.
export async function updatePost(token, id, data) {

    const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(createPostPayload(data)),
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα ενημέρωσης post."
            )
        );
    }

    return result.data || result;


}

// Delete
// Διαγράφει μία δημοσίευση.
export async function deletePost(token, id) {
    const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "DELETE",
        headers: authHeaders(token),
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα διαγραφής post."
            )
        );
    }

    return result.data ?? result;
}

// FOR USERS
// Φορτώνει τις δημόσιες δημοσιεύσεις.
export async function fetchPublicPosts() {
    const response = await fetch(`${apiUrl}/public/posts`, {
        method: "GET",
        headers: publicHeaders,
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα φόρτωσης δημοσιεύσεων."
            )
        );
    }

    return Array.isArray(result.data)
        ? result.data
        : [];
}


// byID
// Φορτώνει μία δημόσια δημοσίευση με βάση το id.
export async function fetchPublicPostById(id) {

    if (!id) {
        return null;
    }

    const response = await fetch(
        `${apiUrl}/public/posts/${id}`,
        {
            method: "GET",
            headers: publicHeaders,
        }
    );

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα φόρτωσης post."
            )
        );
    }

    return result.data || null;
}

// Posts Counts
// Φορτώνει τα στατιστικά των δημοσιεύσεων.
export async function fetchPostCounts(token) {
    const response = await fetch(`${apiUrl}/posts/counts`, {
        method: "GET",
        headers: authHeaders(token),
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα φόρτωσης στατιστικών posts."
            )
        );
    }

    return result;
}