# Flutter Project Review

Το αρχείο αυτό παρουσιάζει τη σειρά με την οποία εξετάζονται οι βασικές screens, τα layouts, τα widgets και οι providers του Flutter project.

Στην ενότητα **Τοποθεσία** αναφέρεται το αρχείο στο οποίο βρίσκεται κάθε μέρος της εφαρμογής.

Στην ενότητα **Common** αναφέρονται τα reusable widgets, models, providers, APIs και helpers που χρησιμοποιεί κάθε αρχείο.
Οι αριθμοί αντιστοιχούν στις εγγραφές του `ProjectReviewCommon.md`.

---

## 1. Main

**Τοποθεσία:** `lib/main.dart`

Το entry point της Flutter εφαρμογής.

Αναλαμβάνει:

- την εκκίνηση της εφαρμογής
- την αρχικοποίηση των global providers
- τη ρύθμιση του theme
- τη δήλωση των routes
- τη ρύθμιση του navigation
- την υποστήριξη scrolling σε mobile, web και desktop

**Common:**

- 2) AuthModel
- 4) AuthMsgProvider
- 15) ReportsProvider
- 28) PostsProvider
- Config

---

## 2. MainLayout

**Τοποθεσία:** `lib/main_layout.dart`

Το βασικό layout της συνδεδεμένης εφαρμογής.

Αναλαμβάνει:

- την εμφάνιση του κύριου περιεχομένου
- την αλλαγή ενεργής screen
- τη διαχείριση του bottom navigation
- τη σύνδεση των βασικών screens της εφαρμογής

Screens:

- Home Dashboard
- Reports
- Announcements
- Profile

**Common:**

- 3) AuthService
- Config

---

## 3. AuthPage

**Τοποθεσία:** `lib/components/screens/auth_page.dart`

Η βασική screen του authentication.

Αναλαμβάνει:

- την εμφάνιση login και register
- την αλλαγή μεταξύ login και register form
- την εμφάνιση authentication messages
- τη σύνδεση με το authentication API

Περιλαμβάνει:

- AuthCard
- LoginHeader
- LoginForm
- RegisterHeader
- RegisterForm

Σχετικά αρχεία:

- `lib/components/Auth/login_widgets.dart`
- `lib/components/Auth/login_form.dart`
- `lib/components/Auth/register_widgets.dart`
- `lib/components/Auth/register_form.dart`

**Common:**

- 1) AuthApi
- 2) AuthModel
- 3) AuthService
- 4) AuthMsgProvider
- 5) Config

---

## 4. Home Dashboard

**Τοποθεσία:** `lib/components/screens/home_dashboard.dart`

Η κεντρική screen του συνδεδεμένου χρήστη.

Αναλαμβάνει:

- την εμφάνιση βασικών ενεργειών
- την εμφάνιση συνοπτικών στατιστικών
- την εμφάνιση πρόσφατων αιτημάτων
- την εμφάνιση τελευταίων ανακοινώσεων

**Common:**

- 3) AuthService
- 5) Config
- 6) SectionTitle
- 7) ActionCard
- 9) AppCard
- 10) ReportCard
- 15) ReportsProvider
- 25) PostCard
- 28) PostsProvider

### 4.1 DashboardHeader

**Τοποθεσία:** `lib/components/Dashboard/dashboard_header.dart`

Εμφανίζει:

- το header του dashboard
- τα στοιχεία ή το menu του χρήστη
- τις βασικές ενέργειες της αρχικής screen

**Common:**

- 3) AuthService

### 4.2 QuickActions

**Τοποθεσία:** `lib/components/Dashboard/quick_actions.dart`

Εμφανίζει τα βασικά action buttons.

Παραδείγματα:

- δημιουργία νέας αιτήματος
- μετάβαση στις αιτήματα
- μετάβαση στις ανακοινώσεις

**Common:**

- 5) Config
- 6) SectionTitle
- 7) ActionCard

### 4.3 DashboardSummary

**Τοποθεσία:** `lib/components/Dashboard/dashboard_summary.dart`

Εμφανίζει συνοπτικά στοιχεία της εφαρμογής.

Παραδείγματα:

- συνολικό πλήθος αιτημάτων
- αιτήματα ανά status
- πλήθος ανακοινώσεων

**Common:**

- 6) SectionTitle
- 9) AppCard
- 15) ReportsProvider
- 28) PostsProvider

### 4.4 RecentReports

**Τοποθεσία:** `lib/components/Dashboard/recent_reports.dart`

Εμφανίζει τις πιο πρόσφατες αιτήματα του χρήστη.

Αναλαμβάνει:

- την εμφάνιση έως 5 πρόσφατων αιτημάτων
- την εμφάνιση βασικών στοιχείων κάθε αιτήματος
- τη μετάβαση στην προβολή αιτήματος

**Common:**

- 6) SectionTitle
- 9) AppCard
- 10) ReportCard
- 15) ReportsProvider

### 4.5 LatestAnnouncements

**Τοποθεσία:** `lib/components/Dashboard/latest_announcements.dart`

Εμφανίζει τις τελευταίες ανακοινώσεις.

Αναλαμβάνει:

- την εμφάνιση των τελευταίων ανακοινώσεων
- την εμφάνιση βασικών στοιχείων κάθε post
- τη μετάβαση στην προβολή ανακοίνωσης

**Common:**

- 6) SectionTitle
- 9) AppCard
- 25) PostCard
- 28) PostsProvider

---

## 5. Reports Page

**Τοποθεσία:** `lib/components/screens/reports_page.dart`

Η βασική screen των αιτημάτων του χρήστη.

Αναλαμβάνει:

- την εμφάνιση της λίστας αιτημάτων
- την εμφάνιση συνοπτικών στοιχείων
- τη δημιουργία νέας αιτήματος
- την προβολή υπάρχουσας αιτήματος
- την επεξεργασία αιτήματος

Περιλαμβάνει:

- New Report
- View Report
- Edit Report

**Common:**

- 5) Config
- 9) AppCard
- 10) ReportCard
- 12) ReportModel
- 14) ReportsSummary
- 15) ReportsProvider

### 5.1 New Report

**Τοποθεσία:** `lib/components/Reports/new_report.dart`

Η screen δημιουργίας νέας αιτήματος.

Αναλαμβάνει:

- τη συμπλήρωση των στοιχείων της αιτήματος
- την επιλογή κατηγορίας
- την αναζήτηση διεύθυνσης
- την επιλογή φωτογραφίας
- την αποστολή της νέας αιτήματος στο API

**Common:**

- 5) Config
- 14) CategoryModel
- 15) ReportsProvider
- 19) CategoriesApi
- 20) AddressGeocodingHelper
- 21) ReportForm
- 22) ImagePickerHelper

### 5.2 View Report

**Τοποθεσία:** `lib/components/Reports/view_report.dart`

Η screen προβολής μίας αιτήματος.

Αναλαμβάνει:

- την εμφάνιση των στοιχείων της αιτήματος
- την εμφάνιση της τοποθεσίας
- την εμφάνιση του χάρτη
- την εμφάνιση της εικόνας
- τη μετάβαση σε edit mode

**Common:**

- 5) Config
- 9) AppCard
- 11) ApiConfig
- 12) ReportModel
- 13) ReportMapper
- 23) InfoRow
- 24) ViewMap

### 5.3 Edit Report

**Τοποθεσία:** `lib/components/Reports/edit_report.dart`

Η screen επεξεργασίας υπάρχουσας αιτήματος.

Αναλαμβάνει:

- την προσυμπλήρωση των στοιχείων
- την αλλαγή τίτλου και περιγραφής
- την αλλαγή κατηγορίας
- την αλλαγή διεύθυνσης
- την αλλαγή φωτογραφίας
- την ενημέρωση της αιτήματος μέσω API

**Common:**

- 5) Config
- 11) ApiConfig
- 12) ReportModel
- 14) CategoryModel
- 16) ReportsApi
- 19) CategoriesApi
- 20) AddressGeocodingHelper
- 21) ReportForm
- 22) ImagePickerHelper

---

## 6. Announcements Page

**Τοποθεσία:** `lib/components/screens/announcements_page.dart`

Η screen εμφάνισης των ανακοινώσεων.

Αναλαμβάνει:

- τη φόρτωση των ανακοινώσεων
- την εμφάνιση των posts σε cards
- τη μετάβαση στην προβολή ανακοίνωσης
- τη διαχείριση loading και empty states

**Common:**

- 5) Config
- 9) AppCard
- 25) PostCard
- 27) ViewPost
- 28) PostsProvider

---

## 7. Profile Page

**Τοποθεσία:** `lib/components/screens/profile_page.dart`

Η screen προβολής των στοιχείων του συνδεδεμένου χρήστη.

Αναλαμβάνει:

- τη φόρτωση των στοιχείων χρήστη
- την εμφάνιση ονόματος και email
- την εμφάνιση του ρόλου
- την ανάγνωση των αποθηκευμένων auth δεδομένων
- τη σύνδεση με το authentication API

**Common:**

- 1) AuthApi
- 2) AuthModel
- 3) AuthStorage
- 5) Config

## 8. Notifications

**Τοποθεσία:** `lib/components/screens/profile_page.dart`

