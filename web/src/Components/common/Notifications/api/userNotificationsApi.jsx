import {
    apiUrl,
    authHeaders,
    getApiErrorMessage,
    parseJsonResponse,
} from "../../../common/Auth/api/auth";

// Διαχειρίζεται τα requests των ειδοποιήσεων
// για τον συνδεδεμένο χρήστη.
//
// Περιλαμβάνει:
// - φόρτωση ειδοποιήσεων
// - φόρτωση unread count
// - mark μίας ειδοποίησης ως read
// - mark όλων των ειδοποιήσεων ως read
export async function fetchUserNotifications(token) {
    const response = await fetch(
        `${apiUrl}/user/notifications`,
        {
            method: "GET",
            headers: authHeaders(token),
        }
    );

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
| Get Unread Count
|--------------------------------------------------------------------------
| Επιστρέφει τον αριθμό των μη διαβασμένων ειδοποιήσεων.
|--------------------------------------------------------------------------
*/
export async function fetchUnreadNotificationsCount(token) {
    const response = await fetch(
        `${apiUrl}/user/notifications/unread-count`,
        {
            method: "GET",
            headers: authHeaders(token),
        }
    );

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα φόρτωσης unread count."
            )
        );
    }

    return Number(result.count) || 0;
}

/*
|--------------------------------------------------------------------------
| Mark As Read
|--------------------------------------------------------------------------
| Σημειώνει μία ειδοποίηση ως διαβασμένη.
|--------------------------------------------------------------------------
*/
export async function markNotificationAsRead(
    token,
    notificationId
) {
    const response = await fetch(
        `${apiUrl}/user/notifications/${notificationId}/read`,
        {
            method: "PUT",
            headers: authHeaders(token),
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

    return result;
}

/*
|--------------------------------------------------------------------------
| Mark All As Read
|--------------------------------------------------------------------------
| Σημειώνει όλες τις ειδοποιήσεις του χρήστη ως διαβασμένες.
|--------------------------------------------------------------------------
*/
export async function markAllNotificationsAsRead(token) {
    const response = await fetch(
        `${apiUrl}/user/notifications/read-all`,
        {
            method: "PUT",
            headers: authHeaders(token),
        }
    );

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα ενημέρωσης ειδοποιήσεων."
            )
        );
    }

    return result;
}