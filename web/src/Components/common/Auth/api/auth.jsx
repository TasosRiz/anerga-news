// Επιλέγει το περιβάλλον στο οποίο θα συνδέεται το frontend.
//
// local:
// React και Laravel εκτελούνται στον ίδιο υπολογιστή.
//
// wifi:
// Το frontend χρησιμοποιείται από άλλη συσκευή στο ίδιο δίκτυο.
//
// proxy:
// Η εφαρμογή συνδέεται μέσω εξωτερικού tunnel, όπως ngrok.


const API_MODE = "local"

// const API_MODE = "wifi"
// react-bash: npm run dev -- --host 0.0.0.0
// laravel: php artisan serve --host=0.0.0.0 --port=8000

// const API_MODE = "proxy"



const API_URLS = {
    local: {
        apiUrl: "http://127.0.0.1:8000/api",
        baseUrl: "http://127.0.0.1:8000",
    },

    wifi: {
        baseUrl: "http://192.168.1.29:8000",
        apiUrl: "http://192.168.1.29:8000/api",

        // Απο Κινητο
        // baseUrl: "http://10.223.138.167:8000",
        // apiUrl: "http://10.223.138.167:8000/api",


        // react: npm run dev -- --host 0.0.0.0
        // laravel: php artisan serve --host=0.0.0.0 --port=8000
        // browser κινητού: http://192.168.1.251:5173
        // flutter θελει baseUrl

        // ===== Άλλο WiFi / Hotspot =====
        // apiUrl: "http://10.187.172.167:8000/api",
        // baseUrl: "http://10.187.172.167:8000",


    },

    proxy: {
        apiUrl: "https://rosy-filler-duckbill.ngrok-free.dev/api",
        baseUrl: "https://rosy-filler-duckbill.ngrok-free.dev",
        // ===== Mini Server - Cloudflare + Vite Proxy =====
        // export const apiUrl = "https://rosy-filler-duckbill.ngrok-free.dev/api";
        // export const baseUrl = "https://rosy-filler-duckbill.ngrok-free.dev";

        // --LARAVEL--
        // powershell: php artisan serve --host=0.0.0.0 --port=8000
        // powershell-ngrok: ngrok http 8000

        // --REACT--
        // bash: npm run dev -- --host 0.0.0.0
        // bash-cloudflare: "/c/Program Files (x86)/cloudflared/cloudflared.exe" tunnel --url http://127.0.0.1:5173
        // vite.config.js: proxy "/api" -> το ngrok url

        // browser: ανοίγεις το trycloudflare url (quick tunnel)
    },
};

// Βασικά URLs του backend.
export const apiUrl = API_URLS[API_MODE].apiUrl;
export const baseUrl = API_URLS[API_MODE].baseUrl;

// Κοινά headers για δημόσια API requests.
export const publicHeaders = {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
};

// Headers για requests που στέλνουν JSON δεδομένα.
export const jsonHeaders = {
    ...publicHeaders,
    "Content-Type": "application/json",
};

// Headers για προστατευμένα JSON requests με Bearer token.
export const authHeaders = (token) => ({
    ...jsonHeaders,
    Authorization: `Bearer ${token}`,
});

// Διαβάζει με ασφάλεια το JSON ενός API response.
//
// Αν το response δεν περιέχει JSON,
// επιστρέφει ένα κενό object.
export const parseJsonResponse = async (response) => {
    try {
        return await response.json();
    } catch {
        return {};
    }
};

// Error
// Δημιουργεί κοινό μήνυμα σφάλματος από το API response.
export const getApiErrorMessage = (result, fallback) => {
    if (!result) {
        return fallback;
    }

    if (typeof result.message === "string") {
        return result.message;
    }

    if (result.errors && typeof result.errors === "object") {
        return Object.values(result.errors)
            .flat()
            .join("\n");
    }

    if (result.message && typeof result.message === "object") {
        return Object.values(result.message)
            .flat()
            .join("\n");
    }

    return fallback;
};


// Login User-Εκτελεί login απλού χρήστη.
// Η αποθήκευση του token και του user γίνεται
// από τον AuthProvider μέσω της login function.
export async function loginUser({ email, password }) {
    const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(result, "Σφάλμα σύνδεσης.")
        );
    }

    return result;
}

// Login Admin -Εκτελεί login διαχειριστή.
// Επιβεβαιώνει επιπλέον ότι ο χρήστης έχει ρόλο admin.
// Η αποθήκευση των δεδομένων γίνεται από τον AuthProvider.
export async function loginAdmin({ email, password }) {
    const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                "Σφάλμα σύνδεσης διαχειριστή."
            )
        );
    }

    if (result.user?.role?.toLowerCase() !== "admin") {
        throw new Error(
            "Δεν έχεις δικαιώματα διαχειριστή."
        );
    }

    return result;
}

// Logout -Εκτελεί logout στον server.
//
// Ο καθαρισμός του localStorage και του React state
// πραγματοποιείται από τον AuthProvider.
export async function logoutUser(token) {
    const response = await fetch(`${apiUrl}/logout`, {
        method: "POST",
        headers: authHeaders(token),
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(result, "Σφάλμα αποσύνδεσης.")
        );
    }

    return result;
}

// Register -Δημιουργεί νέο λογαριασμό χρήστη.
//
// Μετά την εγγραφή, ο AuthProvider μπορεί να αποθηκεύσει
// το token και τον χρήστη καλώντας τη login function.
export async function registerUser({
    name,
    email,
    password,
    password_confirmation,
}) {
    const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({
            name,
            email,
            password,
            password_confirmation,
        }),
    });


    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(
                result,
                `Σφάλμα εγγραφής (${response.status}).`
            )
        );
    }

    return result;
}

// Ping
// Ελέγχει αν το backend API είναι διαθέσιμο.
export async function pingApi() {
    const response = await fetch(`${apiUrl}/ping`, {
        headers: publicHeaders,
    });

    const result = await parseJsonResponse(response);

    if (!response.ok) {
        throw new Error(
            getApiErrorMessage(result, "Σφάλμα σύνδεσης με το API.")
        );
    }

    return result;
}

// Login Errors
// Μετατρέπει τεχνικά errors του browser
// σε πιο κατανοητά μηνύματα για τον χρήστη.
export const getFriendlyErrorMessage = (
    error,
    fallback = "Παρουσιάστηκε κάποιο πρόβλημα."
) => {
    const message = error?.message || "";

    if (
        message.includes("NetworkError") ||
        message.includes("Failed to fetch") ||
        message.includes("Load failed")
    ) {
        return "Δεν ήταν δυνατή η σύνδεση με τον server. Έλεγξε τη σύνδεσή σου και προσπάθησε ξανά.";
    }

    return message || fallback;
};