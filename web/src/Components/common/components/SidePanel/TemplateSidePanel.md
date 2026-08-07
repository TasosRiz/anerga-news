/*
|--------------------------------------------------------------------------
| SidePanel Usage Pattern
|--------------------------------------------------------------------------
| 1. State
|--------------------------------------------------------------------------
*/

const [selectedItem, setSelectedItem] = useState(null);

/*
|--------------------------------------------------------------------------
| 2. Open handlers
|--------------------------------------------------------------------------
*/

const handleViewItem = (item) => {
    setSelectedItem(item);
};

const handleEditItem = (item) => {
    setSelectedItem(item);
};

/*
|--------------------------------------------------------------------------
| 3. Close handler
|--------------------------------------------------------------------------
*/

const handleClosePanel = () => {
    setSelectedItem(null);
};

/*
|--------------------------------------------------------------------------
| 4. Layout wrapper
|--------------------------------------------------------------------------
| Το SidePanel πρέπει να είναι direct child του .with-side-panel,
| δηλαδή δίπλα από το βασικό content και όχι μέσα στο table/card.
|--------------------------------------------------------------------------
*/

return (
    <div
    className={`with-side-panel ${selectedItem ? "has-panel" : ""}`}
    style={{ "--side-panel-width": "380px" }}
>
    <div className="main-page-content">
        <ItemsTable
            items={items}
            onView={handleViewItem}
        />
    </div>

    <SidePanel
        open={!!selectedItem}
        title="Λεπτομέρειες"
        subtitle={selectedItem?.title || selectedItem?.name}
        onClose={() => setSelectedItem(null)}
    >
        <ViewItem item={selectedItem} />
    </SidePanel>
</div>
);