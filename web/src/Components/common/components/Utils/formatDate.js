/**
 * Μορφοποιεί μια ημερομηνία σύμφωνα με το ελληνικό locale.
 *
 * @param {string | Date | null | undefined} dateValue
 * @param {string} fallback
 * @returns {string}
 */
export const formatDate = (
    dateValue,
    fallback = "Χωρίς ημερομηνία"
) => {
    if (!dateValue) {
        return fallback;
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Μη έγκυρη ημερομηνία";
    }

    return date.toLocaleDateString("el-GR");
};