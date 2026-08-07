export const categoryColors = [
    "#2563eb",
    "#22c55e",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#94a3b8",
    "#06b6d4",
    "#ec4899",
];

export const getCategoryColor = (index) => {
    return categoryColors[index % categoryColors.length];
};