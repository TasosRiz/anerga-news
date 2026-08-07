import {
    apiUrl,
    getApiErrorMessage,
    parseJsonResponse,
    publicHeaders,
    jsonHeaders,
    authHeaders
} from "../../Auth/api/auth";



// GetUrl
// Δημιουργεί το URL προβολής μιας εικόνας
// με βάση το path που επιστρέφει το backend.
export const getImageUrl = (path) => {
    if (!path) return "";

    if (
        path.startsWith("http://") ||
        path.startsWith("https://")
    ) {
        return path;
    }

    const filename = path.split("/").pop();

    return `${apiUrl}/media-file/${filename}`;
};

// Get Media
// Φορτώνει όλες τις εικόνες της Media Library.
export async function fetchMedia(token) {
    const response = await fetch(`${apiUrl}/media`, {
        method: "GET",
        headers: authHeaders(token),
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα φόρτωσης media."
            )
        );
    }

    return Array.isArray(result.data)
        ? result.data
        : [];
}

// upload -Ανεβάζει νέα εικόνα στη Media Library.
//
// Χρησιμοποιεί FormData, επομένως δεν ορίζουμε
// χειροκίνητα το Content-Type header.
export async function uploadMedia(
    token,
    file,
    mediaFolderId = null
) {
    const formData = new FormData();

    formData.append("image", file);

    if (mediaFolderId) {
        formData.append("media_folder_id", mediaFolderId);
    }

    const response = await fetch(`${apiUrl}/media`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα upload εικόνας."
            )
        );
    }

    return result.data || result;
}

// delete
// Διαγράφει μία εικόνα από τη Media Library.
export async function deleteMedia(token, mediaId) {
    const response = await fetch(`${apiUrl}/media/${mediaId}`, {
        method: "DELETE",
        headers: authHeaders(token),
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα διαγραφής εικόνας."
            )
        );
    }

    return result.data ?? result;
}

// === FOLDERS ===

// Get Folders
// Φορτώνει όλους τους φακέλους της Media Library.
export async function fetchMediaFolders(token) {
    const response = await fetch(`${apiUrl}/media-folders`, {
        method: "GET",
        headers: authHeaders(token),
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα φόρτωσης φακέλων."
            )
        );
    }

    return Array.isArray(result.data)
        ? result.data
        : [];
}

// Create Folder
// Δημιουργεί νέο φάκελο εικόνων.
export async function createMediaFolder(token, name) {
    const response = await fetch(
        `${apiUrl}/media-folders`,
        {
            method: "POST",
            headers: authHeaders(token),
            body: JSON.stringify({
                name: name.trim(),
            }),
        }
    );

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα δημιουργίας φακέλου."
            )
        );
    }

    return result.data || result;
}


// Update Folder
export async function updateMediaFolder(
    token,
    id,
    name
) {
    const response = await fetch(
        `${apiUrl}/media-folders/${id}`,
        {
            method: "PUT",
            headers: authHeaders(token),
            body: JSON.stringify({
                name: name.trim(),
            }),
        }
    );

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα ενημέρωσης φακέλου."
            )
        );
    }

    return result.data || result;
}

// Delete Folder
// Διαγράφει έναν φάκελο της Media Library.
export async function deleteMediaFolder(token, id) {
    const response = await fetch(
        `${apiUrl}/media-folders/${id}`,
        {
            method: "DELETE",
            headers: authHeaders(token),
        }
    );

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα διαγραφής φακέλου."
            )
        );
    }

    return result.data ?? result;
}

// Moves to folder
// Μεταφέρει μία εικόνα σε διαφορετικό φάκελο.
export async function moveMediaToFolder(token, mediaId, mediaFolderId) {
    const response = await fetch(
        `${apiUrl}/media/${mediaId}/move`,
        {
            method: "PUT",
            headers: authHeaders(token),
            body: JSON.stringify({
                media_folder_id:
                    mediaFolderId || null,
            }),
        }
    );

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα μεταφοράς εικόνας."
            )
        );
    }

    return result.data || result;
}