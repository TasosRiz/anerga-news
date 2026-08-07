import {
    apiUrl,
    authHeaders,
    getApiErrorMessage,
    parseJsonResponse,
} from "../../../common/Auth/api/auth";

/*
|--------------------------------------------------------------------------
| Payload
|--------------------------------------------------------------------------
| Δημιουργεί το payload για create / update notification.
|--------------------------------------------------------------------------
*/
const createNotificationPayload = (data) => ({
    title: data.title?.trim() || "",
    message: data.message?.trim() || "",
    type: data.type || "info",
    recipients: data.recipients || "all",
    status: data.status || "active",
    source_type: data.source_type || "system",
    source_id: data.source_id || null,
});

/*
|--------------------------------------------------------------------------
| Get Notifications
|--------------------------------------------------------------------------
| Φορτώνει όλες τις ειδοποιήσεις για το admin panel.
|--------------------------------------------------------------------------
*/
export async function fetchNotifications(token) {
    const response = await fetch(`${apiUrl}/notifications`, {
        method: "GET",
        headers: authHeaders(token),
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα φόρτωσης ειδοποιήσεων."
            )
        );
    }

    return Array.isArray(result.data)
        ? result.data
        : [];
}

/*
|--------------------------------------------------------------------------
| Create Notification
|--------------------------------------------------------------------------
| Δημιουργεί νέα ειδοποίηση.
|--------------------------------------------------------------------------
*/
export async function createNotification(token, data) {
    const response = await fetch(`${apiUrl}/notifications`, {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(
            createNotificationPayload(data)
        ),
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα δημιουργίας ειδοποίησης."
            )
        );
    }

    return result.data || result;
}

/*
|--------------------------------------------------------------------------
| Update Notification
|--------------------------------------------------------------------------
| Ενημερώνει υπάρχουσα ειδοποίηση.
|--------------------------------------------------------------------------
*/
export async function updateNotification(
    token,
    id,
    data
) {
    const response = await fetch(
        `${apiUrl}/notifications/${id}`,
        {
            method: "PUT",
            headers: authHeaders(token),
            body: JSON.stringify(
                createNotificationPayload(data)
            ),
        }
    );

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα ενημέρωσης ειδοποίησης."
            )
        );
    }

    return result.data || result;
}

/*
|--------------------------------------------------------------------------
| Delete Notification
|--------------------------------------------------------------------------
| Διαγράφει μία ειδοποίηση.
|--------------------------------------------------------------------------
*/
export async function deleteNotification(token, id) {
    const response = await fetch(
        `${apiUrl}/notifications/${id}`,
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
                "Σφάλμα διαγραφής ειδοποίησης."
            )
        );
    }

    return result.data ?? result;
}