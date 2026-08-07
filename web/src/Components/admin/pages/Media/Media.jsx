import "./Media.css";

// Layout
import PagesLayout from "../pages-layout/pages-layout";

// Components
import MediaFolders from "./Toolbar/MediaFolders";
import MediaGrid from "./MediaGrid/MediaGrid";
import MediaUploadBar from "../../../common/Media/UploadBar/MediaUploadBar";
import AppStatus from "../../../common/components/Alerts/AppStatus";


import { useMediaLibrary } from "../../../common/Media/hooks/MediaLibrary/useMediaLibrary";

// Σελίδα παρουσίασης της Media Library.
//
// Η λογική διαχείρισης βρίσκεται στο useMediaLibrary hook.
const Media = () => {
    const {
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
    } = useMediaLibrary();

    return (
        <PagesLayout
            title="Βιβλιοθήκη Πολυμέσων"
            showSearch={false}
            showNotification={false}
        >
            <div className="media-page-container">
                <div className="media-toolbar box scrollable-y">
                    <MediaFolders
                        folders={folders}
                        activeFolderId={activeFolderId}
                        onSelectFolder={setActiveFolderId}
                        onCreateFolder={handleCreateFolder}
                        onRenameFolder={handleRenameFolder}
                        onDeleteFolder={handleDeleteFolder}
                    />

                    <MediaUploadBar
                        fileInputRef={fileInputRef}
                        selectedFile={selectedFile}
                        uploading={uploading}
                        onFileChange={handleFileChange}
                        onUpload={handleUpload}
                    />
                </div>

                <AppStatus
                    loading={loading}
                    error={error}
                    success={successMessage}
                    loadingMessage="Φόρτωση εικόνων..."
                />

                {!loading && (
                    <MediaGrid
                        media={filteredMedia}
                        folders={folders}
                        onDelete={handleDelete}
                        onMove={handleMoveMedia}
                    />
                )}
            </div>
        </PagesLayout>
    );
};

export default Media;