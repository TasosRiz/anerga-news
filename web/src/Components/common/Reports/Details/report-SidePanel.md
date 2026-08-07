## Σκοπός

Το `ReportSidePanel` είναι το κοινό component για προβολή, δημιουργία και επεξεργασία αιτημάτων.

Χρησιμοποιείται σε σελίδες όπως:

- User Reports
- Front Dashboard
- Admin Reports
- Admin Dashboard
- Stats

Η βασική ιδέα είναι:

```text
Parent Page
→ κρατά τη λίστα αιτημάτων
→ διαχειρίζεται το panel state με hooks
→ περνά το selected report στο ReportSidePanel
→ ενημερώνει τη λίστα μετά από edit/create
```

---

## 1. Βασικά imports

```jsx
import ReportSidePanel from "../../../common/Reports/Details/ReportSidePanel";

import { useReportsPanel } from "../../../common/Reports/hooks/useReportsPanel";
import { useReportsPanelHandlers } from "../../../common/Reports/hooks/useReportsPanelHandlers";
```

---

## 2. Panel state

```jsx
const {
    selectedReport,
    panelMode,
    panelIsOpen,

    openView,
    openEdit,
    closePanel,
    cancelEdit,
} = useReportsPanel();
```

Το hook αναλαμβάνει:

```text
selectedReport
→ η ενεργή αίτημα

panelMode
→ "create" | "view" | "edit"

panelIsOpen
→ αν το SidePanel είναι ανοιχτό
```

---

## 3. Panel handlers

```jsx
const {
    handleViewReport,
    handleEditReport,
    handleClosePanel,
    handleCancelEdit,
} = useReportsPanelHandlers({
    reports,
    setPageError,

    openView,
    openEdit,
    closePanel,
    cancelEdit,
});
```

Το hook συνδέει cards, tables και buttons με το panel.

---

## 4. Parent wrapper

Το layout πρέπει να γνωρίζει αν το panel είναι ανοιχτό:

```jsx
<div
    className={`with-side-panel ${
        panelIsOpen
            ? "has-panel"
            : ""
    }`}
    style={{
        "--side-panel-width": "620px",
    }}
>
    {/* Page content */}

    <ReportSidePanel />
</div>
```

---

## 5. View από cards

```jsx
<ReportsCards
    reports={reports}
    onView={handleViewReport}
/>
```

Το `onView` μπορεί να δέχεται report id:

```jsx
onClick={() => onView(report.id)}
```

Ο handler βρίσκει το report μέσα στη φορτωμένη λίστα και ανοίγει το panel.

---

## 6. View και edit από table

```jsx
<AdminReportsTable
    reports={reports}
    showId
    showUser
    showEdit
    onView={handleViewReport}
    onEdit={handleEditReport}
/>
```

Προτεινόμενη χρήση μέσα στο table:

```jsx
<button
    type="button"
    onClick={() => onView(report.id)}
>
    Προβολή
</button>

<button
    type="button"
    onClick={() => onEdit(report)}
>
    Επεξεργασία
</button>
```

---

## 7. ReportSidePanel για user

```jsx
<ReportSidePanel
    open={panelIsOpen}
    mode={panelMode}
    report={selectedReport}

    allowCreate
    allowEdit

    showUser={false}
    showStatus={false}

    mediaUploadOnly
    mediaFolderSlug="reports"

    onClose={handleClosePanel}
    onEdit={handleEditReport}
    onCancelEdit={handleCancelEdit}
    onCreated={handleCreatedReport}
    onUpdated={handleUpdatedReport}
/>
```

Χρήση:

```text
User Reports Page
→ allowCreate
→ allowEdit
→ χωρίς user details
→ χωρίς status edit
```

---

## 8. ReportSidePanel για user dashboard

```jsx
<ReportSidePanel
    open={panelIsOpen}
    mode={panelMode}
    report={selectedReport}

    allowEdit

    showUser={false}
    showStatus={false}

    mediaUploadOnly
    mediaFolderSlug="reports"

    onClose={handleClosePanel}
    onEdit={handleEditReport}
    onCancelEdit={handleCancelEdit}
    onUpdated={handleUpdatedReport}
/>
```

Χρήση:

```text
Front Dashboard
→ μόνο view/edit
→ χωρίς create
→ χωρίς status
```

---

## 9. ReportSidePanel για admin

```jsx
<ReportSidePanel
    open={panelIsOpen}
    mode={panelMode}
    report={selectedReport}

    allowEdit

    showUser
    showStatus

    mediaUploadOnly
    mediaFolderSlug="reports"

    onClose={handleClosePanel}
    onEdit={handleEditReport}
    onCancelEdit={handleCancelEdit}
    onUpdated={handleUpdatedReport}
/>
```

Χρήση:

```text
Admin Reports
Admin Dashboard
Stats
→ view/edit
→ εμφανίζει user
→ εμφανίζει status
→ χωρίς create
```

---

## 10. Update handler

Μετά το edit, ενημερώνουμε τη λίστα και επιστρέφουμε σε view mode.

```jsx
const handleUpdatedReport = (updatedReport) => {
    if (!updatedReport?.id) {
        return;
    }

    const currentReport = reports.find(
        (report) =>
            String(report.id) ===
            String(updatedReport.id)
    );

    const mergedReport = {
        ...(currentReport || {}),
        ...updatedReport,
    };

    updateReportInList(mergedReport);
    openView(mergedReport);
};
```

Αν δεν υπάρχει helper `updateReportInList`:

```jsx
const handleUpdatedReport = (updatedReport) => {
    if (!updatedReport?.id) {
        return;
    }

    let mergedReport = updatedReport;

    setReports((previousReports) =>
        previousReports.map((report) => {
            if (
                String(report.id) !==
                String(updatedReport.id)
            ) {
                return report;
            }

            mergedReport = {
                ...report,
                ...updatedReport,
            };

            return mergedReport;
        })
    );

    openView(mergedReport);
};
```

---

## 11. Create handler

Για σελίδες που επιτρέπουν create:

```jsx
const handleCreatedReport = (newReport) => {
    if (!newReport?.id) {
        return;
    }

    setReports((previousReports) => [
        newReport,
        ...previousReports,
    ]);

    openView(newReport);
};
```

---

## 12. Permissions ανά σελίδα

| Σελίδα | Create | Edit | User Info | Status |
|---|---:|---:|---:|---:|
| User Reports | Ναι | Ναι | Όχι | Όχι |
| Front Dashboard | Όχι | Ναι | Όχι | Όχι |
| Admin Reports | Όχι | Ναι | Ναι | Ναι |
| Admin Dashboard | Όχι | Ναι | Ναι | Ναι |
| Stats | Όχι | Ναι | Ναι | Ναι |

---

## 13. Props αιτήματος

```jsx
open
```

Αν το panel είναι ανοιχτό.

```jsx
mode
```

Τρέχον mode:

```text
create
view
edit
```

```jsx
report
```

Η ενεργή αίτημα.

```jsx
allowCreate
allowEdit
```

Permissions ενεργειών.

```jsx
showUser
showStatus
```

Admin-specific πληροφορίες.

```jsx
mediaUploadOnly
mediaFolderSlug="reports"
```

Ρυθμίσεις media upload.

```jsx
onClose
onEdit
onCancelEdit
onCreated
onUpdated
```

Callbacks προς το parent page.



## 15. Πλήρες παράδειγμα

```jsx
const {
    selectedReport,
    panelMode,
    panelIsOpen,
    openView,
    openEdit,
    closePanel,
    cancelEdit,
} = useReportsPanel();

const {
    handleViewReport,
    handleEditReport,
    handleClosePanel,
    handleCancelEdit,
} = useReportsPanelHandlers({
    reports,
    setPageError: setReportsError,
    openView,
    openEdit,
    closePanel,
    cancelEdit,
});

const handleUpdatedReport = (updatedReport) => {
    if (!updatedReport?.id) {
        return;
    }

    let mergedReport = updatedReport;

    setReports((previousReports) =>
        previousReports.map((report) => {
            if (
                String(report.id) !==
                String(updatedReport.id)
            ) {
                return report;
            }

            mergedReport = {
                ...report,
                ...updatedReport,
            };

            return mergedReport;
        })
    );

    openView(mergedReport);
};

return (
    <div
        className={`with-side-panel ${
            panelIsOpen
                ? "has-panel"
                : ""
        }`}
        style={{
            "--side-panel-width": "620px",
        }}
    >
        <AdminReportsTable
            reports={reports}
            showId
            showUser
            showEdit
            onView={handleViewReport}
            onEdit={handleEditReport}
        />

        <ReportSidePanel
            open={panelIsOpen}
            mode={panelMode}
            report={selectedReport}

            allowEdit
            showUser
            showStatus

            mediaUploadOnly
            mediaFolderSlug="reports"

            onClose={handleClosePanel}
            onEdit={handleEditReport}
            onCancelEdit={handleCancelEdit}
            onUpdated={handleUpdatedReport}
        />
    </div>
);
```

---

