# ServiceKit

Το ServiceKit είναι μια εφαρμογή διαχείρισης αιτημάτων πολιτών προς τον οργανισμό.

Οι χρήστες μπορούν να δημιουργούν αιτήματα για προβλήματα της πόλης, να προσθέτουν φωτογραφία, διεύθυνση και τοποθεσία στον χάρτη και να παρακολουθούν την κατάστασή τους.

Το project αποτελείται από:

- Flutter mobile application
- Laravel REST API
- Laravel Sanctum authentication
- Admin panel για διαχείριση περιεχομένου

---

## Features

### Authentication

- εγγραφή χρήστη
- σύνδεση με email και password
- Sanctum token authentication
- αποσύνδεση
- αποθήκευση auth δεδομένων στη συσκευή
- έλεγχος ενεργού ή ανενεργού λογαριασμού

### Dashboard

- βασικά report counts
- βασικά post counts
- πρόσφατες αιτήματα
- τελευταίες ανακοινώσεις
- quick actions
- στοιχεία συνδεδεμένου χρήστη

### Reports

- δημιουργία αιτήματος
- επεξεργασία αιτήματος
- προβολή αιτήματος
- διαγραφή αιτήματος
- κατηγορίες αιτημάτων
- φωτογραφία
- διεύθυνση
- γεωγραφικές συντεταγμένες
- επιλογή σημείου στον χάρτη
- geocoding μέσω Nominatim
- φίλτρα ανά status
- counts ανά status

### Announcements

- δημόσια λίστα ανακοινώσεων
- προβολή ανακοίνωσης
- φωτογραφία ανακοίνωσης
- κατηγορίες ανακοινώσεων
- active / inactive status
- ημερομηνία δημοσίευσης
- posts counts

### Profile

- εμφάνιση ονόματος και email
- logout
- προετοιμασία για:
  - επεξεργασία προφίλ
  - αλλαγή κωδικού
  - ρυθμίσεις

### Organization Information

- όνομα εφαρμογής
- όνομα οργανισμού
- πόλη
- email
- τηλέφωνο
- διεύθυνση
- βασικά χρώματα
- logo

### Media Library

- upload εικόνων
- διαγραφή εικόνων
- media folders
- μετακίνηση εικόνων σε folders
- default General folder
- σύνδεση εικόνων με reports, posts και organization info

---

## Technologies

### Frontend

- Flutter
- Dart
- Provider
- HTTP
- Flutter Map
- OpenStreetMap
- Nominatim
- Image Picker
- Shared Preferences

### Backend

- Laravel
- PHP
- Laravel Sanctum
- Eloquent ORM
- MySQL
- REST API
- Token-based authentication

---

