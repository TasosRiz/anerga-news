# React Project Review Common

Το αρχείο αυτό περιγράφει τα κοινά reusable components και hooks που χρησιμοποιούνται στο React project.

Τα περισσότερα αρχεία βρίσκονται στον φάκελο:

`src/Components/common`

Οι αριθμοί παραμένουν σταθεροί και χρησιμοποιούνται ως αίτημα μέσα στο `ProjectReview.md`.

---

## 1. AppStatus

**Τοποθεσία:** `src/Components/common/components/Alerts/AppStatus.jsx`

Κοινό component για την εμφάνιση της κατάστασης μιας σελίδας ή ενός request.

Αναλαμβάνει:

- την εμφάνιση loading state
- την εμφάνιση error state
- την εμφάνιση empty state

---

## 2. SelectFilter

**Τοποθεσία:** `src/Components/common/components/Filters/SelectFilter.jsx`

Κοινό component για select filters.

Αναλαμβάνει:

- την εμφάνιση επιλογών σε dropdown
- την αλλαγή της ενεργής επιλογής
- το φιλτράρισμα δεδομένων

Χρησιμοποιείται σε φίλτρα επιλογής.

---

## 3. PostImage

**Τοποθεσία:** `src/Components/common/Posts/Image/PostImage.jsx`

Component εικόνας για posts.

Αναλαμβάνει:

- την εμφάνιση εικόνας post
- την εμφάνιση preview
- τη διαχείριση υπάρχουσας εικόνας

Χρησιμοποιείται:

- στο post form
- στην προβολή post

---

## 4. ShowImage

**Τοποθεσία:** `src/Components/common/Media/ShowImage/ShowImage.jsx`

Component για την εμφάνιση προεπισκόπησης εικόνας.

Αναλαμβάνει:

- την εμφάνιση υπάρχουσας εικόνας
- την εμφάνιση image preview
- την ασφαλή διαχείριση κενής εικόνας

Χρησιμοποιείται όταν θέλουμε να εμφανίσουμε ήδη αποθηκευμένη εικόνα.

---

## 5. PagesLayout

**Τοποθεσία:** Δεν υπάρχει ξεχωριστό αρχείο με όνομα `PagesLayout` στο συγκεκριμένο zip.

Η λειτουργία του layout χρησιμοποιείται μέσα στις σελίδες του admin και σχετίζεται κυρίως με τη δομή των content pages.

Reusable layout για admin pages.

Περιλαμβάνει:

- τίτλο σελίδας
- search
- notifications
- κοινή διάταξη περιεχομένου

Χρησιμοποιείται για την ομοιόμορφη εμφάνιση των admin σελίδων.

---

## 6. Tabs

**Τοποθεσία:** `src/Components/common/components/Tabs/Tabs.jsx`

Reusable component για tabs.

Αναλαμβάνει:

- την εμφάνιση διαθέσιμων tabs
- την επιλογή ενεργού tab
- την εναλλαγή μεταξύ διαφορετικών sections

---

## 7. SidePanel

**Τοποθεσία:** `src/Components/common/components/SidePanel/SidePanel.jsx`

Reusable δεξί panel.

Αναλαμβάνει:

- την προβολή δεδομένων
- τη δημιουργία νέων εγγραφών
- την επεξεργασία εγγραφών
- το άνοιγμα και το κλείσιμο του panel

Ανοίγει μαζί με την κλάση:

```css
with-side-panel

```

---

## 8. Card

**Τοποθεσία:** `src/Components/common/components/Card/Card.jsx`

Reusable component για την εμφάνιση καρτών.

Αναλαμβάνει:

- την εμφάνιση εικονιδίου
- την εμφάνιση τίτλου
- την εμφάνιση τιμής
- την εμφάνιση συνδέσμου
- την κοινή μορφοποίηση των cards

Χρησιμοποιείται κυρίως σε:

- dashboard pages
- reports pages
- users pages
- statistics pages

---

## 9. MediaSelector

**Τοποθεσία:** `src/Components/common/Media/MediaSelector/MediaSelector.jsx`

Component για την επιλογή εικόνας από το Media Library.

Αναλαμβάνει:

- την εμφάνιση των διαθέσιμων media
- το φιλτράρισμα ανά folder
- την επιλογή εικόνας
- την επιστροφή του επιλεγμένου media
- το κλείσιμο του selector μετά την επιλογή

---

## 10. MediaUploadBox

**Τοποθεσία:** `src/Components/common/Media/UploadBar/MediaUploadBar.jsx`

Στο project το αντίστοιχο αρχείο ονομάζεται `MediaUploadBar.jsx`.

Component για upload εικόνας.

Αναλαμβάνει:

- την επιλογή αρχείου
- την εμφάνιση preview
- την αλλαγή του επιλεγμένου αρχείου
- την αφαίρεση της επιλεγμένης εικόνας
- την προετοιμασία του αρχείου για αποστολή

---

## 11. UserReportDetailsPanel

**Τοποθεσία:** `src/Components/common/Reports/Details/useReportDetailsPanel.jsx`

Παλιό panel προβολής report χρήστη.

Χρησιμοποιούνταν για:

- την εμφάνιση των στοιχείων μιας αιτήματος
- την προβολή report μέσα σε side panel

Έχει αντικατασταθεί από:

- 22) ReportSidePanel

---

## 12. useReportCountsCards

**Τοποθεσία:** `src/Components/common/Reports/hooks/userReportCountsCards.jsx`

Hook για τη φόρτωση των report statistics.

Αναλαμβάνει:

- τη φόρτωση των συνολικών αιτημάτων
- τον υπολογισμό των αιτημάτων ανά status
- τη δημιουργία των δεδομένων για τα cards
- την ενημέρωση των statistics όταν αλλάζουν τα reports

---

## 13. useMediaSelector

**Τοποθεσία:** `src/Components/common/Media/hooks/MediaSelector/useMediaSelector.jsx`

Hook για τη διαχείριση του Media Library.

Αναλαμβάνει:

- το άνοιγμα του media selector
- το κλείσιμο του media selector
- τη φόρτωση των διαθέσιμων media
- την επιλογή media
- την αποθήκευση του επιλεγμένου αρχείου
- το φιλτράρισμα ανά folder

---

## 14. useReportForm

**Τοποθεσία:** `src/Components/common/Reports/hooks/useReportForm.jsx`

Hook για τη διαχείριση του report form.

Αναλαμβάνει:

- την αποθήκευση των form δεδομένων
- την ενημέρωση των πεδίων
- το γέμισμα της φόρμας στο edit mode
- τον καθαρισμό της φόρμας
- τη δημιουργία create payload
- τη δημιουργία update payload
- τη διαχείριση της επιλεγμένης εικόνας
- τη διαχείριση της τοποθεσίας

---

## 15. useReportsPanel

**Τοποθεσία:** `src/Components/common/Reports/hooks/useReportsPanel.jsx`

Hook για τη διαχείριση του state του report SidePanel.

Αναλαμβάνει:

- το άνοιγμα του panel
- το κλείσιμο του panel
- τη διαχείριση create mode
- τη διαχείριση view mode
- τη διαχείριση edit mode
- την αποθήκευση του επιλεγμένου report
- την αλλαγή μεταξύ των διαφορετικών modes

---

## 16. useReportsPanelHandlers

**Τοποθεσία:** `src/Components/common/Reports/hooks/useReportsPanelHandlers.jsx`

Hook για τους handlers του report SidePanel.

Αναλαμβάνει:

- την προβολή report
- την επεξεργασία report
- το άνοιγμα create mode
- το κλείσιμο του panel
- την ακύρωση του edit
- την επιστροφή από edit σε view mode
- την ενημέρωση του επιλεγμένου report

---

## 17. useAddressSearch

**Τοποθεσία:** `src/Components/common/Reports/hooks/useAddressSearch.jsx`

Hook για την αναζήτηση διεύθυνσης.

Αναλαμβάνει:

- την αναζήτηση τοποθεσίας
- την επιστροφή προτεινόμενων διευθύνσεων
- την επιλογή διεύθυνσης
- την επιστροφή latitude και longitude
- την ενημέρωση της θέσης στον χάρτη
- την ενημέρωση των πεδίων της φόρμας

---

## 18. ReportsFilter

**Τοποθεσία:** `src/Components/common/Reports/Filter/ReportsFilter.jsx`

Component για τα φίλτρα αιτημάτων.

Περιλαμβάνει:

- search
- status filter
- καθαρισμό φίλτρων
- ενημέρωση της λίστας αιτημάτων

Χρησιμοποιείται για το φιλτράρισμα των reports με βάση:

- τον τίτλο
- την περιγραφή
- το status
- άλλα διαθέσιμα πεδία

---

## 19. ReportDetailsLayout

**Τοποθεσία:** `src/Components/common/Reports/Details/ReportDetailsLayout.jsx`

Κοινό layout για την προβολή report.

Αναλαμβάνει:

- την εμφάνιση των βασικών στοιχείων της αιτήματος
- την εμφάνιση της κατηγορίας
- την εμφάνιση του status
- την εμφάνιση της περιγραφής
- την εμφάνιση της διεύθυνσης
- την εμφάνιση των στοιχείων τοποθεσίας
- την κοινή μορφοποίηση του view mode

Χρησιμοποιείται μέσα στο:

- 22) ReportSidePanel

---

## 20. ReportForm

**Τοποθεσία:** `src/Components/common/Reports/Forms/ReportForm.jsx`

Κοινό form για τη δημιουργία και την επεξεργασία report.

Περιλαμβάνει:

- τίτλο
- περιγραφή
- κατηγορία
- διεύθυνση
- πόλη
- ταχυδρομικό κώδικα
- latitude
- longitude
- status, όπου επιτρέπεται
- εικόνα αιτήματος
- validation errors
- submit button

Χρησιμοποιείται σε:

- create mode
- edit mode

---

## 21. ReportImage

**Τοποθεσία:** `src/Components/common/Reports/Image/ReportImage.jsx`

Reusable component εικόνας report.

Αναλαμβάνει:

- την εμφάνιση υπάρχουσας εικόνας
- την εμφάνιση preview νέας εικόνας
- την επιλογή εικόνας
- την αλλαγή εικόνας
- την αφαίρεση εικόνας
- την ασφαλή διαχείριση report χωρίς εικόνα

Χρησιμοποιείται μέσα στο:

- 20) ReportForm

---

## 22. ReportSidePanel

**Τοποθεσία:** `src/Components/common/Reports/Details/ReportSidePanel.jsx`

Κοινό SidePanel για reports.

Χρησιμοποιείται από:

- admin pages
- user pages
- dashboard pages
- reports pages
- statistics pages

Υποστηρίζει:

- create mode
- view mode
- edit mode
- close panel
- cancel edit
- επιστροφή από edit σε view mode

Αναλαμβάνει:

- την εμφάνιση του επιλεγμένου report
- την εμφάνιση του report form
- την αλλαγή μεταξύ view και edit
- την εφαρμογή permissions μέσω props
- την εμφάνιση διαφορετικών actions ανάλογα με τον χρήστη

Χρησιμοποιεί:

- 7) SidePanel
- 14) useReportForm
- 19) ReportDetailsLayout
- 20) ReportForm
- 21) ReportImage

---

## 23. CategoryEditForm

**Τοποθεσία:** `src/Components/common/Categories/Forms/CategoryEditForm.jsx`

Form δημιουργίας και επεξεργασίας κατηγορίας.

Αναλαμβάνει:

- την εισαγωγή ονόματος κατηγορίας
- την επιλογή τύπου κατηγορίας
- την ενημέρωση υπάρχουσας κατηγορίας
- τη δημιουργία νέας κατηγορίας
- την εμφάνιση validation errors
- την υποβολή της φόρμας

Χρησιμοποιείται για:

- report categories
- post categories

---

## 24. UserEditForm

**Τοποθεσία:** `src/Components/common/Users/Forms/UserEditForm.jsx`

Form επεξεργασίας χρήστη.

Αναλαμβάνει:

- την ενημέρωση του ονόματος
- την ενημέρωση του email
- την αλλαγή role
- την αλλαγή status
- την εμφάνιση validation errors
- την υποβολή των αλλαγών

Χρησιμοποιείται από τις σελίδες διαχείρισης χρηστών.

---

## 25. DashHeader

**Τοποθεσία:** `src/Components/common/components/DashHeader/dash-header.jsx`

Κοινό header για dashboard pages.

Αναλαμβάνει:

- την εμφάνιση τίτλου
- την εμφάνιση σύντομης περιγραφής
- την εμφάνιση search
- την εμφάνιση notifications
- την κοινή μορφοποίηση του dashboard header

---

## 26. Settings

**Τοποθεσία:** `src/Components/common/Settings/Settings.jsx`

Κοινό component ρυθμίσεων.

Αναλαμβάνει:

- τη διαχείριση των διαθέσιμων tabs
- την επιλογή ενεργού section
- την εμφάνιση του αντίστοιχου περιεχομένου
- την κοινή χρήση από admin και user pages

---

## 27. ProfileSettings

**Τοποθεσία:** `src/Components/common/Settings/Profile/ProfileSettings.jsx`

Section προβολής και διαχείρισης προφίλ.

Αναλαμβάνει:

- την εμφάνιση των στοιχείων χρήστη
- την εμφάνιση βασικών πληροφοριών προφίλ
- την ενσωμάτωση του `UserProfile`

Χρησιμοποιεί:

- 31) UserProfile

---

## 28. ProfilePassword

**Τοποθεσία:** `src/Components/common/Settings/Password/ProfilePassword.jsx`

Form αλλαγής κωδικού χρήστη.

Περιλαμβάνει:

- current password
- new password
- confirm password
- validation errors
- submit button

Αναλαμβάνει:

- τον έλεγχο των πεδίων
- την αποστολή του request αλλαγής κωδικού
- την εμφάνιση success ή error message

---

## 29. ProfileReports

**Τοποθεσία:** `src/Components/common/Settings/Reports/ProfileReports.jsx`

Section ρυθμίσεων και πληροφοριών reports.

Αναλαμβάνει:

- την εμφάνιση στατικών πληροφοριών
- την εμφάνιση διαθέσιμων report statuses
- την παρουσίαση βασικών πληροφοριών για τις αιτήματα

---

## 30. ProfileInfo

**Τοποθεσία:** `src/Components/common/Settings/Info/ProfileInfo.jsx`

Section πληροφοριών συστήματος.

Αναλαμβάνει:

- τον έλεγχο σύνδεσης με το API
- την εμφάνιση API status
- την εμφάνιση system information
- την εμφάνιση βασικών πληροφοριών της εφαρμογής

---

## 31. UserProfile

**Τοποθεσία:** `src/Components/common/Users/UserProfile/UserProfile.jsx`

Κοινή κάρτα προφίλ χρήστη.

Αναλαμβάνει:

- την εμφάνιση ονόματος
- την εμφάνιση email
- την εμφάνιση role
- την εμφάνιση status
- την εμφάνιση ημερομηνίας εγγραφής
- την κοινή παρουσίαση των στοιχείων χρήστη

Χρησιμοποιείται σε:

- admin pages
- user pages
- profile pages
- dashboard pages

## 32. DataTable

**Τοποθεσία:** `src/Components/common/components/DataTable/DataTable.jsx`

Reusable table component.

- Το component δεν γνωρίζει τι είδους δεδομένα εμφανίζει.
- Οι στήλες, τα δεδομένα και ο τρόπος εμφάνισης κάθε κελιού
- περνάνε από το parent component μέσω props.

## 33. NotificationForm

**Τοποθεσία:** `src/Components/common/components/Notifications/NotificationForm.jsx`

- Κοινή φόρμα δημιουργίας και επεξεργασίας ειδοποίησης.
-
- Αναλαμβάνει:
- - αρχικοποίηση των πεδίων για create / edit
- - validation των βασικών πεδίων
- - επιλογή τύπου και κατάστασης
- - επιλογή παραληπτών μόνο κατά τη δημιουργία
- - δημιουργία του payload και αποστολή του στο parent μέσω onSave

## 34. ConfirmDialog

**Τοποθεσία:** `src/Components/common/components/ConfirmDialog/ConfirmDialog.jsx`

- Κοινό modal επιβεβαίωσης ενεργειών.
-
- Χρησιμοποιείται κυρίως πριν από διαγραφές
- ή άλλες ενέργειες που χρειάζονται επιβεβαίωση.

---

## 35. useNotificationsPanel

**Τοποθεσία:** `src/Components/common/Notifications/hooks/useNotificationsPanel.js`

Hook για τη διαχείριση της λογικής των ειδοποιήσεων στο admin panel.

Αναλαμβάνει:

- τη φόρτωση των ειδοποιήσεων
- τη διαχείριση του επιλεγμένου notification
- το create / view / edit mode
- τη δημιουργία νέας ειδοποίησης
- την ενημέρωση υπάρχουσας ειδοποίησης
- τη διαγραφή ειδοποίησης
- τη διαχείριση loading, saving και error states
- τη διαχείριση του ConfirmDialog για delete


---

## 36. NotificationsList

**Τοποθεσία:** `src/Components/common/Notifications/List/NotificationsList.jsx`

Reusable λίστα ειδοποιήσεων για τον απλό χρήστη.

Αναλαμβάνει:

- την εμφάνιση λίστας notifications
- την εμφάνιση unread / read κατάστασης
- την εμφάνιση τύπου και ημερομηνίας
- την εκτέλεση callback όταν επιλέγεται ειδοποίηση
- την προαιρετική εμφάνιση περιορισμένου αριθμού notifications

Χρησιμοποιείται:

- στο NotificationBell
- στο Front Dashboard

---

## 37. FormCheckbox

**Τοποθεσία:** `src/Components/common/Notifications/FormCheckbox/FormCheckbox.jsx`

Reusable checkbox component για φόρμες.

Αναλαμβάνει:

- την εμφάνιση checkbox
- την εμφάνιση label
- την εμφάνιση βοηθητικού κειμένου
- disabled state
- την επιστροφή της αλλαγής μέσω `onChange`

Χρησιμοποιείται αυτή τη στιγμή στο PostForm για την επιλογή `notify_users`.

## 38. useUserNotifications

**Τοποθεσία:** `src/Components/common/Notifications/NotificationBell/NotificationBell.jsx`

- Διαχειρίζεται τη λογική των ειδοποιήσεων
- του συνδεδεμένου χρήστη.
-
- Αναλαμβάνει:
- - τη φόρτωση των notifications
- - τη φόρτωση του unread count
- - το mark μιας notification ως read
- - το mark όλων των notifications ως read
- - loading state

**Common:**
- 39) userNotificationsApi


## 39. userNotificationsApi

**Τοποθεσία:** `src/Components/common/Notifications/api/userNotificationsApi.jsx`


- Διαχειρίζεται τα requests των ειδοποιήσεων
- για τον συνδεδεμένο χρήστη.
-
- Περιλαμβάνει:
- - φόρτωση ειδοποιήσεων
- - φόρτωση unread count
- - mark μίας ειδοποίησης ως read
- - mark όλων των ειδοποιήσεων ως read

