const {
    media,
    folders,
    loadingMedia,
    mediaError,
    showMediaSelector,
    openMediaSelector,
    closeMediaSelector,
    selectMedia,
    handleUploadedMedia,
} = useMediaSelector({
    token,
    onSelect: setPhoto,
});

return (
    <>
        <button
            type="button"
            onClick={openMediaSelector}
            disabled={loadingMedia}
        >
            {loadingMedia
                ? "Φόρτωση..."
                : "Επιλογή εικόνας"}
        </button>

        {mediaError && <p>{mediaError}</p>}

        {showMediaSelector && (
            <MediaSelector
                media={media}
                folders={folders}
                onSelect={selectMedia}
                onUploaded={handleUploadedMedia}
                onClose={closeMediaSelector}
            />
        )}
    </>
);