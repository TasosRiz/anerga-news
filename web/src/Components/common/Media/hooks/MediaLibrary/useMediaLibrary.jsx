import { useEffect, useRef, useState } from "react";

import { useAuth } from "../../../Auth/provider/AuthProvider";

import {
    fetchMedia,
    uploadMedia,
    deleteMedia,
    fetchMediaFolders,
    createMediaFolder,
    updateMediaFolder,
    deleteMediaFolder,
    moveMediaToFolder,
} from "../../api/MediaApi";

// Συγκεντρώνει όλη τη λογική της Media Library.
//
// Διαχειρίζεται:
// - εικόνες
// - φακέλους
// - upload
// - διαγραφή
// - μεταφορά εικόνων
// - μηνύματα και καταστάσεις φόρτωσης

export const useMediaLibrary = () => {
    // Παίρνει το token από τον κεντρικό AuthProvider.
    const { token } = useAuth();

    // Δεδομένα εικόνων και φακέλων.
    const [media, setMedia] = useState([]);
    const [folders, setFolders] = useState([]);

    // Επιλεγμένο αρχείο για upload.
    const [selectedFile, setSelectedFile] = useState(null);

    // Ενεργός φάκελος για φιλτράρισμα.
    const [activeFolderId, setActiveFolderId] = useState("all");

    // Καταστάσεις φόρτωσης και μηνύματα.
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Αίτημα στο input αρχείου.
    const fileInputRef = useRef(null);

    // Επιστρέφει όλες τις εικόνες ή μόνο
    // τις εικόνες του ενεργού φακέλου.
    const filteredMedia =
        activeFolderId === "all"
            ? media
            : media.filter(
                (item) =>
                    String(item.media_folder_id) ===
                    String(activeFolderId)
            );

    // Φορτώνει τους φακέλους από το API.
    const loadFolders = async () => {
        try {
            const data = await fetchMediaFolders(token);
            setFolders(data);
        } catch (error) {
            setError(
                error?.message ||
                "Σφάλμα φόρτωσης φακέλων."
            );
        }
    };

    // Φορτώνει τις εικόνες από το API.
    const loadMedia = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await fetchMedia(token);
            setMedia(data);
        } catch (error) {
            setError(
                error?.message ||
                "Σφάλμα φόρτωσης εικόνων."
            );
        } finally {
            setLoading(false);
        }
    };

    // Αποθηκεύει το αρχείο που επιλέχθηκε.
    const handleFileChange = (event) => {
        setSelectedFile(
            event.target.files?.[0] || null
        );

        setError("");
        setSuccessMessage("");
    };

    // Ανεβάζει νέα εικόνα.
    const handleUpload = async () => {
        if (!selectedFile) {
            return;
        }

        try {
            setUploading(true);
            setError("");
            setSuccessMessage("");

            const generalFolder = folders.find(
                (folder) => folder.slug === "general"
            );

            const uploadFolderId =
                activeFolderId !== "all"
                    ? activeFolderId
                    : generalFolder?.id || null;

            await uploadMedia(
                token,
                selectedFile,
                uploadFolderId
            );

            await Promise.all([
                loadMedia(),
                loadFolders(),
            ]);

            setSelectedFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            setSuccessMessage(
                "Η εικόνα ανέβηκε επιτυχώς."
            );
        } catch (error) {
            setError(
                error?.message ||
                "Σφάλμα ανεβάσματος εικόνας."
            );
        } finally {
            setUploading(false);
        }
    };

    // Διαγράφει μία εικόνα.
    const handleDelete = async (mediaId) => {
        const confirmed = window.confirm(
            "Να διαγραφεί αυτή η εικόνα;"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccessMessage("");

            await deleteMedia(token, mediaId);

            await Promise.all([
                loadMedia(),
                loadFolders(),
            ]);

            setSuccessMessage(
                "Η εικόνα διαγράφηκε επιτυχώς."
            );
        } catch (error) {
            setError(
                error?.message ||
                "Σφάλμα διαγραφής εικόνας."
            );
        }
    };

    // Δημιουργεί νέο φάκελο.
    const handleCreateFolder = async () => {
        const name = window.prompt(
            "Όνομα νέου φακέλου:"
        );

        if (!name?.trim()) {
            return;
        }

        try {
            setError("");
            setSuccessMessage("");

            const newFolder = await createMediaFolder(
                token,
                name.trim()
            );

            await loadFolders();

            setActiveFolderId(
                String(newFolder.id)
            );

            setSuccessMessage(
                "Ο φάκελος δημιουργήθηκε επιτυχώς."
            );
        } catch (error) {
            setError(
                error?.message ||
                "Σφάλμα δημιουργίας φακέλου."
            );
        }
    };

    // Μετονομάζει έναν φάκελο.
    const handleRenameFolder = async (folder) => {
        const name = window.prompt(
            "Νέο όνομα φακέλου:",
            folder.name
        );

        if (!name?.trim()) {
            return;
        }

        try {
            setError("");
            setSuccessMessage("");

            await updateMediaFolder(
                token,
                folder.id,
                name.trim()
            );

            await loadFolders();

            setSuccessMessage(
                "Ο φάκελος ενημερώθηκε επιτυχώς."
            );
        } catch (error) {
            setError(
                error?.message ||
                "Σφάλμα ενημέρωσης φακέλου."
            );
        }
    };

    // Διαγράφει έναν φάκελο.
    const handleDeleteFolder = async (folder) => {
        const confirmed = window.confirm(
            `Να διαγραφεί ο φάκελος "${folder.name}";`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccessMessage("");

            await deleteMediaFolder(
                token,
                folder.id
            );

            await Promise.all([
                loadMedia(),
                loadFolders(),
            ]);

            if (
                String(activeFolderId) ===
                String(folder.id)
            ) {
                setActiveFolderId("all");
            }

            setSuccessMessage(
                "Ο φάκελος διαγράφηκε επιτυχώς."
            );
        } catch (error) {
            setError(
                error?.message ||
                "Σφάλμα διαγραφής φακέλου."
            );
        }
    };

    // Μεταφέρει εικόνα σε διαφορετικό φάκελο.
    const handleMoveMedia = async (
        mediaId,
        folderId
    ) => {
        if (!folderId) {
            return;
        }

        try {
            setError("");
            setSuccessMessage("");

            await moveMediaToFolder(
                token,
                mediaId,
                folderId
            );

            await Promise.all([
                loadMedia(),
                loadFolders(),
            ]);

            setSuccessMessage(
                "Η εικόνα μεταφέρθηκε επιτυχώς."
            );
        } catch (error) {
            setError(
                error?.message ||
                "Σφάλμα μεταφοράς εικόνας."
            );
        }
    };

    // Φορτώνει τα αρχικά δεδομένα όταν υπάρχει token.
    useEffect(() => {
        if (!token) {
            return;
        }

        loadMedia();
        loadFolders();
    }, [token]);

    // Επιστρέφει όσα χρειάζεται το Media.jsx.
    return {
        folders,
        activeFolderId,
        filteredMedia,
        selectedFile,
        loading,
        uploading,
        error,
        successMessage,
        fileInputRef,
        setActiveFolderId,
        handleFileChange,
        handleUpload,
        handleDelete,
        handleCreateFolder,
        handleRenameFolder,
        handleDeleteFolder,
        handleMoveMedia,
    };
};