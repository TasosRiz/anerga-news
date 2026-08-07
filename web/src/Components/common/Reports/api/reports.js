import { apiUrl } from "../../Auth/api/auth";

//  API functions για τη διαχείριση αιτημάτων.

//  Αναλαμβάνει:
//  - φόρτωση admin και user reports
//  - φόρτωση συγκεκριμένης αιτήματος
//  - δημιουργία και ενημέρωση με FormData
//  - διαγραφή αιτήματος
//  - φόρτωση dashboard counts


// Βασικά headers για authenticated requests.
const authHeaders = (token) => ({
  Accept: "application/json",
  "ngrok-skip-browser-warning": "true",
  Authorization: `Bearer ${token}`,
});

// Μετατρέπει με ασφάλεια το response body σε JSON.
const parseResponse = async (response) => {
  return response
    .json()
    .catch(() => ({}));
};

// Επιστρέφει το πρώτο διαθέσιμο validation error.
const getReportError = (
  data,
  fallbackMessage
) => {
  return (
    data?.errors?.photo?.[0] ||
    data?.errors?.title?.[0] ||
    data?.errors?.description?.[0] ||
    data?.errors?.address?.[0] ||
    data?.errors?.city?.[0] ||
    data?.errors?.postal_code?.[0] ||
    data?.errors?.category_id?.[0] ||
    data?.errors?.lat?.[0] ||
    data?.errors?.lng?.[0] ||
    data?.errors?.status?.[0] ||
    data?.message ||
    fallbackMessage
  );
};

// Get Reports
// Admin: φορτώνει όλες τις αιτήματα.
export async function fetchReports(token) {
  const response = await fetch(
    `${apiUrl}/reports`,
    {
      headers: authHeaders(token),
    }
  );

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Σφάλμα φόρτωσης reports (${response.status})`
    );
  }

  return data?.data || data;
}

// Get User Reports
// User: φορτώνει μόνο τις δικές του αιτήματα.
export async function fetchUserReports(token) {
  const response = await fetch(
    `${apiUrl}/user-reports`,
    {
      headers: authHeaders(token),
    }
  );

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Σφάλμα φόρτωσης user reports (${response.status})`
    );
  }

  return data?.data || data;
}

// Get 1 Report
// Φορτώνει μία συγκεκριμένη αίτημα.
export async function fetchReportById(
  token,
  reportId
) {
  const response = await fetch(
    `${apiUrl}/reports/${reportId}`,
    {
      headers: authHeaders(token),
    }
  );

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Σφάλμα φόρτωσης report (${response.status})`
    );
  }

  return data?.data || data;
}


// Create Report
// Δημιουργεί αίτημα με FormData.
export async function createReport(
  token,
  formData
) {
  const response = await fetch(
    `${apiUrl}/reports`,
    {
      method: "POST",
      headers: authHeaders(token),
      body: formData,
    }
  );

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(
      getReportError(
        data,
        `Σφάλμα δημιουργίας report (${response.status})`
      )
    );
  }

  return data?.data || data;
}


// Update Report
// Ενημερώνει αίτημα με FormData.
//
// Χρησιμοποιεί POST με method spoofing, επειδή το update
// στέλνει FormData και πιθανό αρχείο εικόνας.
// Το Laravel διαβάζει το πεδίο _method ως πραγματικό PUT.
export async function updateReport(
  token,
  reportId,
  formData
) {
  const response = await fetch(
    `${apiUrl}/reports/${reportId}`,
    {
      method: "POST",
      headers: authHeaders(token),
      body: formData,
    }
  );

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(
      getReportError(
        data,
        `Σφάλμα ενημέρωσης report (${response.status})`
      )
    );
  }

  return data?.data || data;
}

// Delete Report
// Διαγράφει μία αίτημα.
export async function deleteReport(
  token,
  reportId
) {
  const response = await fetch(
    `${apiUrl}/reports/${reportId}`,
    {
      method: "DELETE",
      headers: authHeaders(token),
    }
  );

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Σφάλμα διαγραφής report (${response.status})`
    );
  }

  return true;
}

// Get Counts
// Admin: φορτώνει counts όλων των αιτημάτων.
export async function fetchReportCounts(token) {
  const response = await fetch(
    `${apiUrl}/dashboard/counts`,
    {
      headers: authHeaders(token),
    }
  );

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Σφάλμα φόρτωσης report counts (${response.status})`
    );
  }

  return data;
}

// User: φορτώνει counts μόνο των δικών του αιτημάτων.
export async function fetchUserReportCounts(token) {
  const response = await fetch(
    `${apiUrl}/dashboard/user-counts`,
    {
      headers: authHeaders(token),
    }
  );

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Σφάλμα φόρτωσης user report counts (${response.status})`
    );
  }

  return data;
}