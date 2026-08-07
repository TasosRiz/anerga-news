import ShowImage from "../../Media/ShowImage/ShowImage";

//  Επαναχρησιμοποιήσιμο component εμφάνισης φωτογραφίας αιτήματος.
//
//  Χρησιμοποιεί το κοινό ShowImage και θεωρεί ότι το photo
//  είναι string path από τη Media Library.
//
//  Υποστηρίζει:
//  - διαφορετικά image variants
//  - placeholder όταν δεν υπάρχει φωτογραφία

const ReportImage = ({
    photo,
    alt = "Report photo",
    variant = "preview",
    showPlaceholder = false,
}) => {
    return (
        <ShowImage
            src={photo}
            alt={alt}
            type="media"
            variant={variant}
            showPlaceholder={showPlaceholder}
            placeholderText="Δεν υπάρχει φωτογραφία"
        />
    );
};

export default ReportImage;