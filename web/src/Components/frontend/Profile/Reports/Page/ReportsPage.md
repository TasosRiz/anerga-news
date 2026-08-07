ReportsPage
│
├── κρατά reports, loading και API errors
│
├── useReportForm
│   └── κρατά τα δεδομένα της φόρμας
│
├── useReportsPanel
│   └── κρατά selectedReport και panelMode
│
├── useReportsPanelHandlers
│   └── συντονίζει φόρμα και panel
│
├── useAddressSearch
│   └── ενημερώνει location fields
│
├── ReportForm
│   └── εμφανίζει και αλλάζει τα πεδία
│
├── ReportDetailsLayout
│   └── εμφανίζει το selectedReport
│
└── API handlers
    └── δημιουργούν ή ενημερώνουν reports

Τα hooks δεν επικοινωνούν απευθείας μεταξύ τους.

Το ReportsPage παίρνει τις λειτουργίες τους
και τις περνά στο useReportsPanelHandlers,
ώστε αυτό να τα συντονίσει.