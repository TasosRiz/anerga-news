# React Project Review

Το αρχείο αυτό παρουσιάζει τη σειρά με την οποία εξετάζονται οι βασικές σελίδες, τα layouts και οι providers του React project.

Στην ενότητα **Τοποθεσία** αναφέρεται ο φάκελος ή το αρχείο στο οποίο βρίσκεται κάθε μέρος του project.

Στην ενότητα **Common** αναφέρονται τα reusable components και hooks που χρησιμοποιεί κάθε αρχείο.
Οι αριθμοί αντιστοιχούν στις εγγραφές του `ProjectReviewCommon.md`.

---

## 1. External

**Τοποθεσία:** `src/App.jsx`

Βασικό αρχείο στο οποίο δηλώνονται τα routes και συνδέονται τα κύρια μέρη της εφαρμογής.

**Common:**
Δεν χρησιμοποιεί κοινά components ή hooks.

---

## 2. Main

**Τοποθεσία:** `src/main.jsx`

Βασικό entry point του React project.

Αναλαμβάνει την εκκίνηση της εφαρμογής και την απόδοσή της στο DOM.

**Common:**
Δεν χρησιμοποιεί κοινά components ή hooks.

---

## 3. AuthProvider

**Τοποθεσία:** `src/Components/common/Auth/provider/AuthProvider.jsx`

Provider για τη διαχείριση του authentication state.

Αναλαμβάνει:

- την αποθήκευση του συνδεδεμένου χρήστη
- τη διαχείριση του authentication token
- το login
- το logout
- την παροχή των authentication δεδομένων στην εφαρμογή

**Common:**
Δεν χρησιμοποιεί κοινά components ή hooks.

---

## 4. FrontendLayout

**Τοποθεσία:** `src/Components/frontend/FrontendLayout.jsx`

Βασικό layout για τις δημόσιες σελίδες του frontend.

Περιλαμβάνει τη βασική δομή της εφαρμογής, το navigation και το περιεχόμενο των frontend routes.

**Common:**
Δεν χρησιμοποιεί κοινά components ή hooks.

---

## 5. FrontNavbar

**Τοποθεσία:** `src/Components/frontend/Navbar/FrontNavbar.jsx`

Navigation bar του frontend.

Αναλαμβάνει:

- την εμφάνιση των βασικών συνδέσμων
- την πλοήγηση στις δημόσιες σελίδες
- την εμφάνιση επιλογών ανάλογα με το authentication state

**Common:**
Δεν χρησιμοποιεί κοινά components ή hooks.

---

## 6. ProfileLayout

**Τοποθεσία:** `src/Components/frontend/Profile/layout/profile-layout.jsx`

Layout για τις σελίδες του προφίλ χρήστη.

Περιλαμβάνει τη δομή του profile section, το sidebar και το περιεχόμενο της ενεργής σελίδας.

**Common:**
Δεν χρησιμοποιεί κοινά components ή hooks.

---

## 7. Sidebar User

**Τοποθεσία:** `src/Components/frontend/Profile/Sidebar/Sidebar.jsx`

Sidebar πλοήγησης για τον απλό χρήστη.

Αναλαμβάνει την πλοήγηση μεταξύ:

- dashboard
- reports
- profile
- settings

**Common:**
Δεν χρησιμοποιεί κοινά components ή hooks.

---

## 8. Home

**Τοποθεσία:** `src/Components/frontend/Home/Home.jsx`

Αρχική σελίδα του frontend.

Περιλαμβάνει τα βασικά sections παρουσίασης της εφαρμογής.

**Common:**
Δεν χρησιμοποιεί κοινά components ή hooks.

---

## 9. Posts

**Τοποθεσία:** `src/Components/frontend/Posts/PostsPage.jsx`

Σελίδα προβολής των δημοσιευμένων ανακοινώσεων.

Αναλαμβάνει:

- τη φόρτωση των posts
- το φιλτράρισμα των ανακοινώσεων
- την εμφάνιση των διαθέσιμων posts
- τη μετάβαση στην αναλυτική προβολή ενός post

**Common:**

- 1) AppStatus
- 2) SelectFilter
- 3) PostImage
- 4) ShowImage

---

## 10. PageWrapper

**Τοποθεσία:** `src/Components/admin/pages/Content/PagesContent.jsx`

Wrapper για τη βασική δομή των σελίδων περιεχομένου του admin.

Αναλαμβάνει:

- την κοινή διάταξη των content pages
- την εμφάνιση των διαθέσιμων tabs
- την εναλλαγή μεταξύ των sections

**Common:**

- 5) PagesLayout
- 6) Tabs

---

## 11. Posts Admin

**Τοποθεσία:** `src/Components/admin/pages/Content/Posts/Posts.jsx`

Σελίδα διαχείρισης ανακοινώσεων από τον διαχειριστή.

Αναλαμβάνει:

- τη φόρτωση των posts
- τη δημιουργία νέου post
- την προβολή ενός post
- την επεξεργασία υπάρχοντος post
- την επιλογή και το upload εικόνας
- το φιλτράρισμα των ανακοινώσεων

**Common:**

- 1) AppStatus
- 2) SelectFilter
- 3) PostImage
- 4) ShowImage
- 7) SidePanel
- 8) Card
- 9) MediaSelector
- 10) MediaUploadBox
- 13) useMediaSelector

---

## 12. Media

**Τοποθεσία:** `src/Components/admin/pages/Media/Media.jsx`

Σελίδα διαχείρισης αρχείων και εικόνων.

Αναλαμβάνει:

- τη φόρτωση του Media Library
- την εμφάνιση των διαθέσιμων εικόνων
- το upload νέων εικόνων
- το φιλτράρισμα ανά folder
- την επιλογή media

**Common:**

- 1) AppStatus
- 5) PagesLayout
- 10) MediaUploadBox
- 13) useMediaSelector

---

## 13. ViewPost

**Τοποθεσία:** `src/Components/admin/pages/Content/Posts/Actions/View/ViewPost.jsx`

Σελίδα ή panel προβολής μίας ανακοίνωσης.

Αναλαμβάνει:

- την εμφάνιση του τίτλου
- την εμφάνιση του περιεχομένου
- την εμφάνιση της κατηγορίας
- την εμφάνιση της εικόνας
- την εμφάνιση των υπόλοιπων στοιχείων του post

**Common:**

- 3) PostImage
- 4) ShowImage
- 7) SidePanel

---

## 14. User Auth

**Τοποθεσία:** `src/Components/frontend/Auth/UserAuth.jsx`

Σελίδα authentication για τον απλό χρήστη.

Αναλαμβάνει:

- την εμφάνιση της φόρμας σύνδεσης
- την αποστολή των login δεδομένων
- την εμφάνιση authentication errors
- τη μετάβαση στη φόρμα εγγραφής

**Common:**
Δεν χρησιμοποιεί κοινά components ή hooks.

---

## 15. Admin Auth

**Τοποθεσία:** `src/Components/admin/Auth/AdminAuth.jsx`

Σελίδα authentication για τον διαχειριστή.

Αναλαμβάνει:

- την είσοδο του διαχειριστή
- τον έλεγχο των στοιχείων σύνδεσης
- την εμφάνιση authentication errors
- την ανακατεύθυνση στο admin dashboard

**Common:**
Δεν χρησιμοποιεί κοινά components ή hooks.

---

## 16. Admin Layout

**Τοποθεσία:** `src/Components/admin/AdminLayout.jsx`

Βασικό layout για τις σελίδες διαχείρισης.

Περιλαμβάνει:

- το admin navigation
- το admin sidebar
- το βασικό περιεχόμενο των admin routes
- την κοινή διάταξη των admin pages

**Common:**
Δεν χρησιμοποιεί κοινά components ή hooks.

---

## 17. Reports Page Front

**Τοποθεσία:** `src/Components/frontend/Profile/Reports/Page/ReportsPage.jsx`

Σελίδα αιτημάτων για τον απλό χρήστη.

Αναλαμβάνει:

- τη φόρτωση των αιτημάτων του χρήστη
- την εμφάνιση των report statistics
- το φιλτράρισμα των reports
- τη δημιουργία νέας αιτήματος
- την προβολή υπάρχουσας αιτήματος
- την επεξεργασία αιτήματος
- την αναζήτηση διεύθυνσης και τοποθεσίας

**Common:**

- 1) AppStatus
- 5) PagesLayout
- 7) SidePanel
- 8) Card
- 12) useReportCountsCards
- 14) useReportForm
- 15) useReportsPanel
- 16) useReportsPanelHandlers
- 17) useAddressSearch
- 18) ReportsFilter
- 19) ReportDetailsLayout
- 20) ReportForm
- 21) ReportImage
- 22) ReportSidePanel

---

## 18. Admin Reports Page

**Τοποθεσία:** `src/Components/admin/pages/Reports/AdminReportsPage.jsx`

Σελίδα διαχείρισης αιτημάτων από τον διαχειριστή.

Αναλαμβάνει:

- τη φόρτωση όλων των αιτημάτων
- την εμφάνιση των report statistics
- το φιλτράρισμα των reports
- την προβολή μιας αιτήματος
- την επεξεργασία των στοιχείων και του status
- τη διαχείριση του report SidePanel

**Common:**

- 1) AppStatus
- 5) PagesLayout
- 7) SidePanel
- 8) Card
- 12) useReportCountsCards
- 15) useReportsPanel
- 16) useReportsPanelHandlers
- 18) ReportsFilter
- 19) ReportDetailsLayout
- 20) ReportForm
- 21) ReportImage
- 22) ReportSidePanel

---

## 19. Front Dashboard

**Τοποθεσία:** `src/Components/frontend/Profile/Dashboard/FrontDashboard.jsx`

Dashboard του απλού χρήστη.

Αναλαμβάνει:

- την εμφάνιση συνοπτικών στοιχείων αιτημάτων
- την εμφάνιση report statistics
- την εμφάνιση πρόσφατων αιτημάτων
- την προβολή μιας αιτήματος στο SidePanel
- την πλοήγηση στις βασικές λειτουργίες του χρήστη

**Common:**

- 1) AppStatus
- 8) Card
- 12) useReportCountsCards
- 15) useReportsPanel
- 16) useReportsPanelHandlers
- 22) ReportSidePanel
- 25) DashHeader

---

## 20. Admin Dashboard

**Τοποθεσία:** `src/Components/admin/pages/Dashboard/AdminDashboard.jsx`

Dashboard του διαχειριστή.

Αναλαμβάνει:

- την εμφάνιση συνοπτικών report statistics
- την εμφάνιση πρόσφατων αιτημάτων
- την προβολή report μέσα στο SidePanel
- την εμφάνιση στοιχείων του διαχειριστή
- την πλοήγηση στις βασικές admin λειτουργίες

**Common:**

- 1) AppStatus
- 8) Card
- 12) useReportCountsCards
- 15) useReportsPanel
- 16) useReportsPanelHandlers
- 22) ReportSidePanel
- 25) DashHeader
- 31) UserProfile

---

## 21. Categories Page

**Τοποθεσία:** `src/Components/admin/pages/Categories/CategoriesPage.jsx`

Σελίδα διαχείρισης κατηγοριών.

Αναλαμβάνει:

- την εναλλαγή μεταξύ report και post categories
- τη φόρτωση των κατηγοριών
- τη δημιουργία νέας κατηγορίας
- την επεξεργασία υπάρχουσας κατηγορίας
- την εμφάνιση της φόρμας μέσα σε SidePanel

**Common:**

- 1) AppStatus
- 5) PagesLayout
- 6) Tabs
- 7) SidePanel
- 23) CategoryEditForm

---

## 22. Categories Table

**Τοποθεσία:** `src/Components/admin/pages/Categories/CategoriesTable.jsx`

Πίνακας εμφάνισης και επεξεργασίας κατηγοριών.

Αναλαμβάνει:

- την εμφάνιση των κατηγοριών
- την επιλογή κατηγορίας
- το άνοιγμα του edit panel
- την ενημέρωση υπάρχουσας κατηγορίας

**Common:**

- 1) AppStatus
- 7) SidePanel
- 23) CategoryEditForm

---

## 23. Users

**Τοποθεσία:** `src/Components/admin/Users/Users.jsx`

Σελίδα διαχείρισης χρηστών.

Αναλαμβάνει:

- τη φόρτωση των χρηστών
- την εμφάνιση των user statistics
- την αναζήτηση και το φιλτράρισμα χρηστών
- την προβολή των στοιχείων ενός χρήστη
- την επεξεργασία των στοιχείων του χρήστη

**Common:**

- 1) AppStatus
- 5) PagesLayout
- 7) SidePanel
- 8) Card
- 24) UserEditForm

---

## 24. User

**Τοποθεσία:** `src/Components/frontend/Profile/User/User.jsx`

Σελίδα προφίλ και ρυθμίσεων χρήστη.

Αναλαμβάνει:

- την εμφάνιση των στοιχείων του χρήστη
- τη διαχείριση των profile settings
- την αλλαγή κωδικού
- την εμφάνιση πληροφοριών για reports
- την εμφάνιση πληροφοριών συστήματος
- την εναλλαγή μεταξύ των διαθέσιμων tabs

**Common:**

- 6) Tabs
- 25) DashHeader
- 26) Settings
- 27) ProfileSettings
- 28) ProfilePassword
- 29) ProfileReports
- 30) ProfileInfo
- 31) UserProfile

---

## 25. Stats

**Τοποθεσία:** `src/Components/admin/pages/Stats/Stats.jsx`

Σελίδα στατιστικών αιτημάτων.

Αναλαμβάνει:

- τη φόρτωση των report statistics
- την εμφάνιση συνοπτικών cards
- την εμφάνιση αιτημάτων ανά κατηγορία
- την εμφάνιση αιτημάτων ανά τοποθεσία
- την εμφάνιση αιτημάτων ανά χρονική περίοδο
- την προβολή μιας αιτήματος στο SidePanel

**Common:**

- 1) AppStatus
- 5) PagesLayout
- 8) Card
- 12) useReportCountsCards
- 15) useReportsPanel
- 16) useReportsPanelHandlers
- 22) ReportSidePanel

## 26. Notifications (Πρώτα Admin)

**Τοποθεσία:** `src/Components/admin/pages/Content/Notifications/Notifications.jsx`

Αναλαμβάνει:

- τη φόρτωση των ειδοποιήσεων
- τη δημιουργία νέας ειδοποίησης
- την προβολή υπάρχουσας ειδοποίησης
- την επεξεργασία ειδοποίησης
- τη διαγραφή ειδοποίησης
- την εμφάνιση loading, error και empty states
- τη διαχείριση του SidePanel και του ConfirmDialog

**Sections:**
- 27) NotificationsHeader
- 28) NotificationsTable
- 29) ViewNotification



**Common:**
- 35) useNotificationsPanel
- 1) AppStatus
- 7) SidePanel
- 33) NotificationForm
- 34) ConfirmDialog


## 27. NotificationsHeader

**Τοποθεσία:** `src/Components/admin/pages/Content/Notifications/Header/NotificationsHeader.jsx`

Header της σελίδας διαχείρισης ειδοποιήσεων.

Αναλαμβάνει:

- την εμφάνιση του τίτλου της σελίδας
- την ενεργοποίηση της δημιουργίας νέας ειδοποίησης

**Common:**

Δεν χρησιμοποιεί κοινά components ή hooks.

---

## 28. NotificationsTable

**Τοποθεσία:** `src/Components/admin/pages/Content/Notifications/Table/NotificationsTable.jsx`

// Πίνακας διαχείρισης ειδοποιήσεων του admin.
// Εμφανίζει:
// - βασικά στοιχεία της ειδοποίησης
// - τύπο και κατάσταση
// - αριθμό παραληπτών
// - πόσοι χρήστες την έχουν διαβάσει
// - ημερομηνία δημιουργίας
// - actions για προβολή, επεξεργασία και διαγραφή

**Common:**
- 32) DataTable


## 29. ViewNotification

**Τοποθεσία:** `src/Components/admin/pages/Content/Notifications/Actions/ViewNotification.jsx`

- Προβάλλει τα πλήρη στοιχεία της επιλεγμένης ειδοποίησης.
- Χρησιμοποιείται μέσα στο SidePanel
- για την προβολή ειδοποίησης από το admin panel.

**Common:**

Δεν χρησιμοποιεί κοινά components ή hooks.


## 30. Notifications (Front)
##     NotificationBell

**Τοποθεσία:** `src/Components/common/Notifications/NotificationBell/NotificationBell.jsx`

Bell ειδοποιήσεων για τον συνδεδεμένο χρήστη.

Αναλαμβάνει:

- το άνοιγμα και κλείσιμο του dropdown
- την εμφάνιση των ειδοποιήσεων
- την εμφάνιση του unread count
- την πλοήγηση ανάλογα με το `source_type`

**Common:**
- 38) useUserNotifications
- 36) NotificationsList
