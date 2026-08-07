# ConfirmDialog

Κοινό component για επιβεβαίωση ενεργειών, π.χ. διαγραφή.

## Παράδειγμα

```jsx
const [postToDelete, setPostToDelete] = useState(null);

const handleDeletePost = (id) => {
    setPostToDelete(id);
};

const handleConfirmDeletePost = async () => {
    if (!postToDelete) return;

    await deletePost(token, postToDelete);

    setPosts((previousPosts) =>
        previousPosts.filter(
            (post) => post.id !== postToDelete
        )
    );

    setPostToDelete(null);
};

<ConfirmDialog
    open={postToDelete !== null}
    title="Διαγραφή Post"
    message="Θέλεις σίγουρα να διαγράψεις αυτό το post;"
    confirmText="Διαγραφή"
    onConfirm={handleConfirmDeletePost}
    onCancel={() => setPostToDelete(null)}
/>