import ShowImage from "../../Media/ShowImage/ShowImage";

// Εξειδικευμένο component εικόνας για δημοσιεύσεις.

// Χρησιμοποιεί το κοινό ShowImage component.
// Oρίζει προεπιλεγμένες ρυθμίσεις για εικόνες ανακοινώσεων.
const PostImage = ({
    photo,
    alt = "Post image",
    variant = "hero",
    showPlaceholder = false,
}) => {
    return (
        <ShowImage
            src={photo}
            alt={alt}
            type="media"
            variant={variant}
            showPlaceholder={showPlaceholder}
            placeholderText="Δεν υπάρχει εικόνα"
        />
    );
};

export default PostImage;