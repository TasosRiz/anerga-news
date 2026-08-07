/*
|--------------------------------------------------------------------------
| Create Report Page
|--------------------------------------------------------------------------
| Σελίδα δημιουργίας νέας αιτήματος από τον χρήστη.
|--------------------------------------------------------------------------
*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ReportForm from "../../../common/Reports/Forms/ReportForm";
import DashHeader from "../../../common/components/DashHeader/dash-header";

import { apiUrl } from "../../../common/Auth/api/auth";
import { fetchActiveCategories } from "../../../common/Categories/api/reportsCategories";
import { useAddressSearch } from "../../../common/Reports/hooks/useAddressSearch";


const CreateReport = ({ token }) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [photo, setPhoto] = useState(null);

    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const { handleAddressSearch } = useAddressSearch({
        address,
        city,
        postalCode,
        setAddress,
        setCity,
        setPostalCode,
        setLatitude,
        setLongitude,
        setError,
    });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setCategoriesLoading(true);
                setError("");

                const data = await fetchActiveCategories(token);
                setCategories(data);
            } catch (err) {
                setError(err?.message || "Σφάλμα φόρτωσης κατηγοριών.");
            } finally {
                setCategoriesLoading(false);
            }
        };

        if (token) loadCategories();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!category) {
            setError("Επίλεξε κατηγορία.");
            return;
        }

        if (!latitude || !longitude) {
            setError("Επίλεξε τοποθεσία στον χάρτη.");
            return;
        }

        try {
            setSaving(true);

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("address", address);
            formData.append("city", city);
            formData.append("postal_code", postalCode.replace(/\s/g, ""));
            formData.append("category_id", category);
            formData.append("lat", latitude);
            formData.append("lng", longitude);

            if (photo) {
                formData.append("photo", photo);
            }

            const res = await fetch(`${apiUrl}/reports`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(
                    result.errors?.photo?.[0] ||
                    result.errors?.title?.[0] ||
                    result.errors?.category_id?.[0] ||
                    result.message ||
                    "Δεν ήταν δυνατή η δημιουργία της αιτήματος."
                );
            }

            navigate("/profile/reports");
        } catch (err) {
            setError(err?.message || "Σφάλμα δημιουργίας αιτήματος.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="create-report-page">
            <DashHeader
                title="Δημιουργία αιτήματος"
                showSearch={false}
                showNotification={false}
            />

            <ReportForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                address={address}
                setAddress={setAddress}
                city={city}
                setCity={setCity}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
                onAddressSearch={handleAddressSearch}
                category={category}
                setCategory={setCategory}
                categories={categories}
                showCategory={true}
                categoriesLoading={categoriesLoading}
                latitude={latitude}
                setLatitude={setLatitude}
                longitude={longitude}
                setLongitude={setLongitude}
                showMap={true}
                showStatus={false}
                showPhoto={true}
                photo={photo}
                setPhoto={setPhoto}
                loading={saving}
                error={error}
                backPath="/profile/reports"
                submitText="Δημιουργία Αιτήματος"
                loadingText="Αποθήκευση..."
                onSubmit={handleSubmit}
            />
        </section>
    );
};

export default CreateReport;