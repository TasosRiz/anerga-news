//
//  Custom hook για την αναζήτηση διεύθυνσης μέσω Nominatim.
//
//  Αναλαμβάνει:
//  - τον έλεγχο των βασικών στοιχείων διεύθυνσης
//  - την αναζήτηση συντεταγμένων
//  - την ενημέρωση latitude και longitude
//  - την κανονικοποίηση των στοιχείων διεύθυνσης
//  - τη διαχείριση σφαλμάτων αναζήτησης
//

export const useAddressSearch = ({
    address,
    city,
    postalCode,

    setAddress,
    setCity,
    setPostalCode,

    setLatitude,
    setLongitude,

    setError,
}) => {
    // Εκτελεί αναζήτηση προς τη Nominatim.
    const searchAddress = async (params) => {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?${params.toString()}`,
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                "Δεν ήταν δυνατή η αναζήτηση τοποθεσίας."
            );
        }

        const data = await response.json();

        return Array.isArray(data)
            ? data
            : [];
    };

    // Αναζητά τη διεύθυνση και ενημερώνει
    // τα στοιχεία της φόρμας και του χάρτη.
    const handleAddressSearch = async () => {
        const normalizedAddress =
            address?.trim() || "";

        const normalizedCity =
            city?.trim() || "";

        const normalizedPostalCode =
            postalCode
                ?.replace(/\s/g, "")
                .trim() || "";

        // Η οδός και η πόλη είναι απαραίτητες
        // για να πραγματοποιηθεί η αναζήτηση.
        if (!normalizedAddress || !normalizedCity) {
            setError?.(
                "Συμπλήρωσε οδό και πόλη."
            );
            return;
        }

        try {
            setError?.("");

            // Πρώτη προσπάθεια με structured parameters.
            const params = new URLSearchParams({
                format: "jsonv2",
                street: normalizedAddress,
                city: normalizedCity,
                country: "Greece",
                countrycodes: "gr",
                limit: "1",
                addressdetails: "1",
                "accept-language": "el",
            });

            // Ο ταχυδρομικός κώδικας είναι προαιρετικός.
            if (normalizedPostalCode) {
                params.append(
                    "postalcode",
                    normalizedPostalCode
                );
            }

            let data = await searchAddress(params);

            // Αν η structured αναζήτηση δεν βρει αποτέλεσμα,
            // γίνεται δεύτερη προσπάθεια με ελεύθερο query.
            if (data.length === 0) {
                const fallbackParams =
                    new URLSearchParams({
                        format: "jsonv2",
                        q: [
                            normalizedAddress,
                            normalizedCity,
                            normalizedPostalCode,
                            "Ελλάδα",
                        ]
                            .filter(Boolean)
                            .join(", "),
                        countrycodes: "gr",
                        limit: "1",
                        addressdetails: "1",
                        "accept-language": "el",
                    });

                data = await searchAddress(
                    fallbackParams
                );
            }

            // Δεν επιστράφηκε αποτέλεσμα.
            if (data.length === 0) {
                setError?.(
                    "Δεν βρέθηκε η διεύθυνση."
                );
                return;
            }

            const result = data[0];
            const foundAddress = result.address || {};

            const latitude = Number(result.lat);
            const longitude = Number(result.lon);

            // Ελέγχει ότι οι συντεταγμένες
            // που επέστρεψε η υπηρεσία είναι έγκυρες.
            if (
                !Number.isFinite(latitude) ||
                !Number.isFinite(longitude)
            ) {
                throw new Error(
                    "Η τοποθεσία δεν επέστρεψε έγκυρες συντεταγμένες."
                );
            }

            // Ενημερώνει τη θέση του marker στον χάρτη.
            setLatitude?.(latitude);
            setLongitude?.(longitude);

            // Κανονικοποιεί την οδό.
            const foundStreet = [
                foundAddress.road,
                foundAddress.house_number,
            ]
                .filter(Boolean)
                .join(" ");

            setAddress?.(
                foundStreet ||
                normalizedAddress
            );

            // Κανονικοποιεί την πόλη.
            setCity?.(
                foundAddress.city ||
                foundAddress.town ||
                foundAddress.village ||
                foundAddress.municipality ||
                normalizedCity
            );

            // Κανονικοποιεί τον ταχυδρομικό κώδικα.
            setPostalCode?.(
                foundAddress.postcode ||
                normalizedPostalCode
            );
        } catch (err) {
            setError?.(
                err?.message ||
                "Δεν ήταν δυνατή η εύρεση της διεύθυνσης."
            );
        }
    };

    return {
        handleAddressSearch,
    };
};