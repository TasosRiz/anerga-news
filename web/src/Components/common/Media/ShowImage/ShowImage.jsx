import { useState, useEffect } from "react";
import { baseUrl } from "../../Auth/api/auth";
import { getImageUrl } from "../api/MediaApi";
import "./ShowImage.css";


//  Επαναχρησιμοποιήσιμο component εικόνας για όλη την εφαρμογή.

//  Χρησιμοποιείται για:
//  - εικόνες δημοσιεύσεων
//  - εικόνες αιτημάτων
//  - media previews
//  - thumbnails
//  - cards
//  - hero και detail εικόνες

//  Υποστηρίζει placeholder, διαφορετικά variants
//  και αυτόματο εντοπισμό προσανατολισμού εικόνας.

const ShowImage = ({
    src,
    alt = "Image",
    type = "upload",
    variant = "preview",
    showPlaceholder = false,
    placeholderText = "Δεν υπάρχει εικόνα",
    className = "",
}) => {
    // Καταγράφει αν απέτυχε η φόρτωση της εικόνας.
    const [hasImageError, setHasImageError] = useState(false);

    // Καθαρίζει το προηγούμενο error όταν αλλάζει η εικόνα.
    useEffect(() => {
        setHasImageError(false);
    }, [src]);

    // Δεν εμφανίζει τίποτα όταν δεν υπάρχει εικόνα,
    // δεν έχει ζητηθεί placeholder και δεν υπάρχει error.
    if (!src && !showPlaceholder) {
        return null;
    }

    // Δημιουργεί το τελικό URL της εικόνας.

    // media: Χρησιμοποιεί το getImageUrl για εικόνες της Media Library.
    // upload: Δημιουργεί URL με βάση το backend baseUrl.
    // url: Χρησιμοποιεί απευθείας το URL που έχει δοθεί.
    const resolveImageSource = () => {
        if (!src) return "";

        if (/^https?:\/\//i.test(src)) {
            return src;
        }

        if (type === "media") {
            return getImageUrl(src);
        }

        if (type === "url") {
            return src;
        }

        const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
        const normalizedPath = String(src).replace(/^\//, "");

        return `${normalizedBaseUrl}/${normalizedPath}`;
    };

    //  Ελέγχει τις φυσικές διαστάσεις της εικόνας
    //  και προσθέτει την αντίστοιχη orientation class.
    const handleImageLoad = (e) => {
        const img = e.currentTarget;

        img.classList.remove(
            "is-landscape",
            "is-portrait",
            "is-square"
        );

        if (img.naturalWidth > img.naturalHeight) {
            img.classList.add("is-landscape");
        } else if (img.naturalHeight > img.naturalWidth) {
            img.classList.add("is-portrait");
        } else {
            img.classList.add("is-square");
        }
    };

    const imageSource = resolveImageSource();

    return (
        <div className={`show-image show-image-${variant} ${className}`.trim()}>
            {src ? (
                <img
                    src={imageSource}
                    alt={alt}
                    onLoad={handleImageLoad}
                    loading="lazy"
                />
            ) : (
                <div
                    className="show-image-placeholder"
                    role="img"
                    aria-label={placeholderText}
                >
                    {placeholderText}
                </div>
            )}
        </div>
    );
};

export default ShowImage;