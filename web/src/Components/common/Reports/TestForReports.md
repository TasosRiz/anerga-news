## 1. User Reports Page

### Create Report
- Δημιουργία report με όλα τα απαιτούμενα πεδία
- Δημιουργία report χωρίς φωτογραφία
- Δημιουργία report με φωτογραφία
- Εμφάνιση του νέου report αμέσως στη λίστα
- Άνοιγμα του νέου report σε view mode μετά το create
- Διατήρηση της φωτογραφίας μετά από refresh
- Σωστή εμφάνιση κατηγορίας μετά το create
- Σωστή εμφάνιση διεύθυνσης και χάρτη μετά το create

### Create Validation
- Κενός τίτλος
- Κενή περιγραφή
- Κενή κατηγορία
- Κενή διεύθυνση
- Κενή πόλη
- Κενές συντεταγμένες
- Μη έγκυρη φωτογραφία
- Πολύ μεγάλη φωτογραφία
- Αποτυχία API κατά το create
- Το κουμπί αποθήκευσης επανέρχεται μετά από error

### View Report
-  Άνοιγμα report από card
-  Σωστή εμφάνιση τίτλου
-  Σωστή εμφάνιση περιγραφής
-  Σωστή εμφάνιση κατηγορίας
-  Σωστή εμφάνιση τοποθεσίας
-  Σωστή εμφάνιση status
-  Σωστή εμφάνιση ημερομηνίας
-  Σωστή εμφάνιση φωτογραφίας
-  Σωστό κλείσιμο του SidePanel

### Edit Report
-  Άνοιγμα edit από card
-  Άνοιγμα edit από view mode
-  Προσυμπλήρωση όλων των πεδίων
-  Αλλαγή τίτλου
-  Αλλαγή περιγραφής
-  Αλλαγή κατηγορίας
-  Αλλαγή διεύθυνσης
-  Αλλαγή φωτογραφίας
-  Αποθήκευση χωρίς αλλαγή φωτογραφίας
-  Ενημέρωση card μετά το edit
-  Ενημέρωση SidePanel μετά το edit
-  Διατήρηση αλλαγών μετά από refresh
-  Το status δεν εμφανίζεται στον user
-  Το υπάρχον status διατηρείται στο update

### Cancel Edit
-  Αλλαγή πεδίων χωρίς αποθήκευση
-  Πάτημα ακύρωσης
-  Επιστροφή σε view mode
-  Οι αλλαγές δεν αποθηκεύονται
-  Νέο άνοιγμα edit με τις αρχικές τιμές

### Search
-  Αναζήτηση με τίτλο
-  Αναζήτηση με περιγραφή
-  Αναζήτηση με πόλη
-  Αναζήτηση με διεύθυνση
-  Αναζήτηση με κατηγορία
-  Αναζήτηση με κεφαλαία και πεζά
-  Αναζήτηση με κενά πριν ή μετά
-  Μήνυμα όταν δεν υπάρχουν αποτελέσματα
-  Καθαρισμός search και επαίτημα λίστας

### Status Filters
-  Προβολή όλων των reports
-  Φίλτρο νέων reports
-  Φίλτρο reports σε εξέλιξη
-  Φίλτρο ολοκληρωμένων reports
-  Συνδυασμός search και status filter
-  Σωστό query parameter στο URL
-  Διατήρηση φίλτρου μετά από refresh

---

## 2. Front Dashboard

-  Φόρτωση πρόσφατων reports
-  Εμφάνιση έως 4 reports
-  Άνοιγμα report σε view mode
-  Άνοιγμα edit από το SidePanel
-  Ενημέρωση report μετά το edit
-  Ενημέρωση φωτογραφίας μετά το edit
-  Δεν εμφανίζεται create mode
-  Δεν εμφανίζεται αλλαγή status
-  Σωστή εμφάνιση report count cards
-  Σωστό empty state όταν δεν υπάρχουν reports
-  Σωστό loading state
-  Σωστό error state

---

## 3. Admin Reports Page

### Reports List
-  Φόρτωση όλων των reports
-  Εμφάνιση χρήστη
-  Εμφάνιση ID report
-  Εμφάνιση κατηγορίας
-  Εμφάνιση τοποθεσίας
-  Εμφάνιση status badge
-  Εμφάνιση ημερομηνίας
-  Σωστό empty state
-  Σωστό loading state
-  Σωστό error state

### View
-  Άνοιγμα report από το κουμπί Προβολή
-  Άνοιγμα σε view mode
-  Εμφάνιση στοιχείων χρήστη
-  Εμφάνιση φωτογραφίας
-  Κλείσιμο SidePanel

### Edit
-  Άνοιγμα edit απευθείας από το table
-  Άνοιγμα edit από view mode
-  Προσυμπλήρωση όλων των πεδίων
-  Αλλαγή τίτλου
-  Αλλαγή περιγραφής
-  Αλλαγή κατηγορίας
-  Αλλαγή διεύθυνσης
-  Αλλαγή φωτογραφίας
-  Αλλαγή status
-  Ενημέρωση row μετά το edit
-  Ενημέρωση status badge
-  Ενημέρωση SidePanel
-  Διατήρηση αλλαγών μετά από refresh

### Filters
-  Φίλτρο ανά status
-  Σωστό query parameter
-  Empty state όταν δεν υπάρχουν αποτελέσματα
-  Επαίτημα όλων των reports

---

## 4. Admin Dashboard

-  Εμφάνιση έως 5 νέων reports
-  Άνοιγμα report σε view mode
-  Άνοιγμα report σε edit mode
-  Ενημέρωση report μετά το edit
-  Αλλαγή status
-  Αφαίρεση report από τη λίστα νέων όταν αλλάξει status
-  Σωστή εμφάνιση admin profile
-  Σωστό loading state
-  Σωστό error state

---

## 5. Address Search

-  Αναζήτηση με οδό και πόλη
-  Αναζήτηση με ταχυδρομικό κώδικα
-  Αναζήτηση χωρίς ταχυδρομικό κώδικα
-  Εμφάνιση error όταν λείπει οδός
-  Εμφάνιση error όταν λείπει πόλη
-  Εμφάνιση error όταν δεν βρεθεί διεύθυνση
-  Ενημέρωση latitude
-  Ενημέρωση longitude
-  Ενημέρωση marker στον χάρτη
-  Κανονικοποίηση οδού
-  Κανονικοποίηση πόλης
-  Κανονικοποίηση ταχυδρομικού κώδικα
-  Χειρισμός αποτυχίας Nominatim

---

## 6. Photo Upload

-  Upload JPG
-  Upload JPEG
-  Upload PNG
-  Upload WEBP
-  Απόρριψη μη υποστηριζόμενου τύπου
-  Απόρριψη πολύ μεγάλου αρχείου
-  Preview πριν την αποθήκευση
-  Create χωρίς photo
-  Create με photo
-  Edit χωρίς αλλαγή photo
-  Edit με νέα photo
-  Διατήρηση υπάρχουσας photo όταν δεν επιλέγεται νέα
-  Σωστή εμφάνιση photo μετά από refresh

---

## 7. API / Network

### Create
-  Request: `POST /reports`
-  Body: `FormData`
-  Δεν ορίζεται χειροκίνητα `Content-Type`
-  Υπάρχει `Authorization: Bearer <token>`
-  Υπάρχει `Accept: application/json`
-  Η photo αποστέλλεται μόνο όταν είναι `File`

### Update
-  Request: `POST /reports/{id}`
-  Body: `FormData`
-  Υπάρχει `_method=PUT`
-  Δεν ορίζεται χειροκίνητα `Content-Type`
-  Υπάρχει `Authorization: Bearer <token>`
-  Το status αποστέλλεται στο update
-  Η photo αποστέλλεται μόνο όταν επιλέγεται νέα

### Fetch
-  Admin reports: `GET /reports`
-  User reports: `GET /user-reports`
-  Report details: `GET /reports/{id}`
-  Admin counts: `GET /dashboard/counts`
-  User counts: `GET /dashboard/user-counts`

---

## 8. Permissions

-  Ο user μπορεί να δημιουργήσει report
-  Ο user μπορεί να επεξεργαστεί δικό του report
-  Ο user δεν βλέπει αλλαγή status
-  Ο admin δεν βλέπει create mode
-  Ο admin βλέπει στοιχεία χρήστη
-  Ο admin μπορεί να αλλάξει status
-  Μη εξουσιοδοτημένος χρήστης δεν μπορεί να κάνει update
-  Μη εξουσιοδοτημένος χρήστης δεν μπορεί να δει ξένα reports

---

## 9. Error Handling

-  401 Unauthorized
-  403 Forbidden
-  404 Report not found
-  422 Validation error
-  500 Server error
-  Αποτυχία φόρτωσης categories
-  Αποτυχία φόρτωσης reports
-  Αποτυχία create
-  Αποτυχία update
-  Αποτυχία delete
-  Αποτυχία address search
-  Το loading σταματά μετά από error
-  Το error message εμφανίζεται στον σωστό χώρο

---

## 10. UI / UX

-  Το SidePanel ανοίγει σωστά
-  Το SidePanel κλείνει σωστά
-  Το layout προσαρμόζεται όταν ανοίγει το panel
-  Το panel λειτουργεί σε μικρή οθόνη
-  Το table έχει horizontal scroll
-  Τα cards εμφανίζονται σωστά
-  Τα κουμπιά απενεργοποιούνται κατά την αποθήκευση
-  Δεν γίνεται διπλό submit
-  Τα labels και τα messages είναι σωστά
-  Τα empty states είναι σωστά
-  Τα loading states είναι σωστά
-  Τα status badges έχουν σωστή εμφάνιση

---

## 11. Regression Tests

-  Το create συνεχίζει να λειτουργεί μετά την ενοποίηση του SidePanel
-  Το edit συνεχίζει να λειτουργεί για user
-  Το edit συνεχίζει να λειτουργεί για admin
-  Το FrontDashboard ανοίγει σωστά reports
-  Το AdminDashboard ανοίγει σωστά reports
-  Τα filters δεν επηρεάζουν το ανοιχτό report
-  Το search δεν επηρεάζει το panel state
-  Το cancel δεν αλλάζει τη λίστα
-  Το refresh διατηρεί τα αποθηκευμένα δεδομένα
-  Δεν εμφανίζονται console errors
-  Δεν εμφανίζονται React warnings