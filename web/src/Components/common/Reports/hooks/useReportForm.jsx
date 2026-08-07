import { useState } from "react";

// Custom hook για τη διαχείριση της φόρμας αιτήματος.
//
// Αναλαμβάνει:
// - τα πεδία της φόρμας
// - τον καθαρισμό της φόρμας
// - τη συμπλήρωση δεδομένων για επεξεργασία
// - την επικύρωση των υποχρεωτικών πεδίων
// - τη δημιουργία FormData για create και update

export const useReportForm = () => {
    // Βασικά στοιχεία αιτήματος.
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    // Κατάσταση αιτήματος.
    const [status, setStatus] = useState("");

    // Στοιχεία τοποθεσίας.
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");

    // Συντεταγμένες χάρτη.
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    // Path εικόνας από τη Media Library.
    const [photo, setPhoto] = useState("");

    // Καθαρίζει όλα τα πεδία της φόρμας.
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setCategory("");
        setStatus("");

        setAddress("");
        setCity("");
        setPostalCode("");

        setLatitude("");
        setLongitude("");

        setPhoto("");
    };

    // Συμπληρώνει τη φόρμα με τα δεδομένα αιτήματος.
    const fillForm = (report) => {
        setTitle(report?.title || "");
        setDescription(report?.description || "");
        setStatus(report?.status || "");

        setCategory(
            report?.category_id !== null &&
                report?.category_id !== undefined
                ? String(report.category_id)
                : report?.category?.id
                    ? String(report.category.id)
                    : ""
        );

        setAddress(report?.address || "");
        setCity(report?.city || "");
        setPostalCode(report?.postal_code || "");

        setLatitude(
            report?.lat !== null &&
                report?.lat !== undefined
                ? String(report.lat)
                : ""
        );

        setLongitude(
            report?.lng !== null &&
                report?.lng !== undefined
                ? String(report.lng)
                : ""
        );

        // Δεν αντιγράφουμε την υπάρχουσα εικόνα.
        // Το currentPhoto εμφανίζεται ξεχωριστά στο ReportForm.
        setPhoto("");
    };

    // Ελέγχει τα υποχρεωτικά πεδία.
    const validateForm = () => {
        if (!title.trim()) {
            return "Συμπλήρωσε τίτλο.";
        }

        if (!description.trim()) {
            return "Συμπλήρωσε περιγραφή.";
        }

        if (!address.trim()) {
            return "Συμπλήρωσε διεύθυνση.";
        }

        if (!city.trim()) {
            return "Συμπλήρωσε πόλη.";
        }

        if (!category) {
            return "Επίλεξε κατηγορία.";
        }

        if (!latitude || !longitude) {
            return "Επίλεξε τοποθεσία στον χάρτη.";
        }

        return "";
    };

    // Προσθέτει τα κοινά πεδία στο FormData.
    const appendCommonFields = (formData) => {
        formData.append("title", title.trim());
        formData.append("description", description.trim());
        formData.append("address", address.trim());
        formData.append("city", city.trim());
        formData.append(
            "postal_code",
            postalCode.replace(/\s/g, "")
        );
        formData.append("category_id", category);
        formData.append("lat", latitude);
        formData.append("lng", longitude);

        // Το photo είναι string path από τη Media Library.
        if (photo) {
            formData.append("photo", photo);
        }
    };

    // Δημιουργεί FormData για νέα αίτημα.
    const buildCreateFormData = () => {
        const formData = new FormData();

        appendCommonFields(formData);

        return formData;
    };

    // Δημιουργεί FormData για ενημέρωση αιτήματος.
    const buildUpdateFormData = () => {
        const formData = new FormData();

        // Laravel method spoofing για multipart request.
        formData.append("_method", "PUT");

        appendCommonFields(formData);

        // Το backend απαιτεί status στο update.
        if (status) {
            formData.append("status", status);
        }

        return formData;
    };

    return {
        title,
        setTitle,

        description,
        setDescription,

        category,
        setCategory,

        status,
        setStatus,

        address,
        setAddress,

        city,
        setCity,

        postalCode,
        setPostalCode,

        latitude,
        setLatitude,

        longitude,
        setLongitude,

        photo,
        setPhoto,

        resetForm,
        fillForm,
        validateForm,
        buildCreateFormData,
        buildUpdateFormData,
    };
};