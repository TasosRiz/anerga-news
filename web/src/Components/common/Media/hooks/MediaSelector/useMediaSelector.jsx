import { useState } from "react";
import {
    fetchMedia,
    fetchMediaFolders,
} from "../../api/MediaApi";

// Custom hook για τη διαχείριση της Media Library.

// Αναλαμβάνει:
// - τη φόρτωση των διαθέσιμων media
// - τη φόρτωση των φακέλων
// - το άνοιγμα και κλείσιμο του MediaSelector
// - την επιλογή υπάρχοντος media
// - την αυτόματη επιλογή νέου uploaded media

// Το επιλεγμένο path επιστρέφεται στη φόρμα μέσω του onSelect.

export const useMediaSelector = ({
    token,
    onSelect,
}) => {
    // Διαθέσιμα αρχεία της Media Library.
    const [media, setMedia] = useState([]);

    // Διαθέσιμοι φάκελοι της Media Library.
    const [folders, setFolders] = useState([]);

    // Κατάσταση φόρτωσης media και φακέλων.
    const [loadingMedia, setLoadingMedia] =
        useState(false);

    // Σφάλμα που αφορά τη Media Library.
    const [mediaError, setMediaError] =
        useState("");

    // Καθορίζει αν εμφανίζεται ο MediaSelector.
    const [showMediaSelector, setShowMediaSelector] =
        useState(false);

    // Φορτώνει παράλληλα τα media και τους φακέλους
    // της Media Library.
    const loadMediaLibrary = async () => {
        if (!token) {
            setMediaError(
                "Δεν υπάρχει ενεργή σύνδεση χρήστη."
            );

            return false;
        }

        try {
            setLoadingMedia(true);
            setMediaError("");

            const [mediaData, foldersData] =
                await Promise.all([
                    fetchMedia(token),
                    fetchMediaFolders(token),
                ]);

            setMedia(
                Array.isArray(mediaData)
                    ? mediaData
                    : []
            );

            setFolders(
                Array.isArray(foldersData)
                    ? foldersData
                    : []
            );

            return true;
        } catch (error) {
            setMediaError(
                error?.message ||
                "Παρουσιάστηκε σφάλμα κατά τη φόρτωση της Media Library."
            );

            return false;
        } finally {
            setLoadingMedia(false);
        }
    };

    // Φορτώνει τη Media Library και ανοίγει τον selector
    // μόνο όταν η φόρτωση ολοκληρωθεί επιτυχώς.
    const openMediaSelector = async () => {
        const loadedSuccessfully =
            await loadMediaLibrary();

        if (loadedSuccessfully) {
            setShowMediaSelector(true);
        }
    };

    // Κλείνει τον MediaSelector.
    const closeMediaSelector = () => {
        setShowMediaSelector(false);
    };

    // Επιστρέφει το path του επιλεγμένου media
    // στη φόρμα και κλείνει τον selector.
    const selectMedia = (path) => {
        if (!path) {
            return;
        }

        onSelect?.(path);
        closeMediaSelector();
    };

    // Προσθέτει το νέο uploaded media στην αρχή της λίστας,
    // το επιλέγει αυτόματα και κλείνει τον selector.
    const handleUploadedMedia = (uploadedMedia) => {
        if (!uploadedMedia?.path) {
            return;
        }

        setMedia((previousMedia) => [
            uploadedMedia,
            ...previousMedia,
        ]);

        onSelect?.(uploadedMedia.path);
        closeMediaSelector();
    };

    return {
        media,
        folders,
        loadingMedia,
        mediaError,
        showMediaSelector,

        openMediaSelector,
        closeMediaSelector,
        selectMedia,
        handleUploadedMedia,
    };
};