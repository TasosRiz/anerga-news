# Reports

## Σειρά ελέγχου

1. `reports_page.dart`

   Κεντρική σελίδα των αιτημάτων.

   Περιλαμβάνει:
   - αρχικό fetch των αιτημάτων χρήστη
   - φόρτωση report counts
   - φίλτρα ανά status
   - εμφάνιση του `ReportsSummary`
   - εμφάνιση των `ReportCard`
   - navigation για δημιουργία αιτήματος
   - navigation για επεξεργασία αιτήματος
   - διαγραφή αιτήματος

2. `reports_provider.dart`

   Διαχειρίζεται το state των αιτημάτων.

   Περιλαμβάνει:
   - λίστα αιτημάτων
   - loading state
   - saving state
   - error messages
   - report counts
   - φόρτωση όλων των αιτημάτων
   - φόρτωση αιτημάτων χρήστη
   - δημιουργία αιτήματος
   - ενημέρωση αιτήματος
   - διαγραφή αιτήματος
   - ανανέωση λίστας και counts μετά από αλλαγές

3. `reports_api.dart`

   Διαχειρίζεται την επικοινωνία με το backend.

   Περιλαμβάνει:
   - fetch αιτημάτων
   - fetch αιτημάτων χρήστη
   - create report
   - update report
   - delete report
   - fetch report counts
   - αποστολή φωτογραφίας
   - authentication headers

4. `report_model.dart`

   Model μιας αιτήματος.

   Περιλαμβάνει:
   - id
   - title
   - description
   - status
   - photo
   - category
   - address
   - city
   - postal code
   - latitude
   - longitude
   - ημερομηνίες
   - μετατροπή από JSON

5. `report_counts_model.dart`

   Model των report counts.

   Περιλαμβάνει:
   - συνολικές αιτήματα
   - αιτήματα σε εξέλιξη
   - ολοκληρωμένες αιτήματα
   - μετατροπή από JSON

6. `reports_summary.dart`

   Εμφανίζει τη σύνοψη των αιτημάτων.

   Περιλαμβάνει:
   - όλες τις αιτήματα
   - αιτήματα σε εξέλιξη
   - ολοκληρωμένες αιτήματα
   - επιλογή ενεργού φίλτρου
   - χρήση των `SummaryCard`

7. `summary_card.dart`

   Κοινό card για τα report counts.

   Περιλαμβάνει:
   - count
   - τίτλο
   - background color
   - text color
   - προαιρετικό `onTap`
   - centered layout χωρίς icon

8. `report_card.dart`

   Κοινό card για την εμφάνιση μιας αιτήματος.

   Περιλαμβάνει:
   - φωτογραφία ή fallback
   - τίτλο
   - κατηγορία
   - status
   - προβολή λεπτομερειών
   - επεξεργασία
   - διαγραφή

9. `new_report.dart`

   Σελίδα δημιουργίας νέας αιτήματος.

   Περιλαμβάνει:
   - φόρτωση κατηγοριών
   - κενές αρχικές τιμές
   - επιλογή φωτογραφίας
   - στοιχεία αιτήματος
   - στοιχεία διεύθυνσης
   - αναζήτηση τοποθεσίας
   - επιλογή σημείου στον χάρτη
   - validation
   - δημιουργία μέσω `ReportsProvider`
   - επιστροφή στη λίστα μετά την επιτυχία

10. `edit_report.dart`

    Σελίδα επεξεργασίας υπάρχουσας αιτήματος.

    Περιλαμβάνει:
    - φόρτωση αρχικών τιμών
    - αλλαγή κατηγορίας
    - αλλαγή τίτλου και περιγραφής
    - αλλαγή διεύθυνσης
    - αλλαγή τοποθεσίας
    - αλλαγή ή αφαίρεση φωτογραφίας
    - validation
    - ενημέρωση αιτήματος
    - επιστροφή στη λίστα μετά την επιτυχία

11. `report_form.dart`

    Κοινή φόρμα για create και edit.

    Περιλαμβάνει:
    - `PhotoPickerSection`
    - επιλογή κατηγορίας
    - τίτλο
    - περιγραφή
    - στοιχεία διεύθυνσης
    - αναζήτηση στον χάρτη
    - `MapPicker`
    - submit button
    - loading state κατά την αποθήκευση

12. `view_report.dart`

    Εμφανίζει όλες τις λεπτομέρειες μιας αιτήματος.

    Περιλαμβάνει:
    - φωτογραφία
    - κατηγορία
    - τίτλο
    - περιγραφή
    - κατάσταση
    - στοιχεία διεύθυνσης
    - τοποθεσία στον χάρτη
    - fallback σε αποτυχία φόρτωσης εικόνας

13. `categories_api.dart`

    Φορτώνει τις κατηγορίες από το backend.

    Περιλαμβάνει:
    - authentication token
    - GET request στις κατηγορίες
    - έλεγχο response
    - μετατροπή δεδομένων σε `CategoryModel`

14. `category_model.dart`

    Model μιας κατηγορίας.

    Περιλαμβάνει:
    - id
    - name
    - status
    - μετατροπή από JSON

15. `address_geocoding_helper.dart`

    Μετατρέπει μια διεύθυνση σε συντεταγμένες.

    Περιλαμβάνει:
    - address
    - city
    - postal code
    - αναζήτηση μέσω Nominatim
    - latitude
    - longitude
    - διαχείριση αποτυχίας αναζήτησης

16. `map_picker.dart`

    Χάρτης επιλογής τοποθεσίας.

    Περιλαμβάνει:
    - εμφάνιση χάρτη
    - επιλογή σημείου
    - marker
    - επιστροφή latitude και longitude
    - χρήση σε create και edit

17. `view_map.dart`

    Read-only προβολή τοποθεσίας.

    Περιλαμβάνει:
    - αρχικό κέντρο χάρτη
    - marker στο σημείο της αιτήματος
    - map tiles
    - χρήση μόνο για προβολή

18. `image_picker_helper.dart`

    Βοηθητική κλάση για επιλογή εικόνας.

    Περιλαμβάνει:
    - άνοιγμα gallery
    - επιλογή φωτογραφίας
    - μείωση ποιότητας εικόνας
    - επιστροφή `File`

19. `photo_picker_section.dart`

    Κοινό UI για τη φωτογραφία της αιτήματος.

    Περιλαμβάνει:
    - preview νέας φωτογραφίας
    - preview υπάρχουσας φωτογραφίας
    - επιλογή φωτογραφίας
    - αφαίρεση φωτογραφίας
    - fallback εμφάνισης

20. `info_row.dart`

    Κοινό widget για στοιχεία διεύθυνσης.

    Περιλαμβάνει:
    - icon
    - label
    - value
    - προαιρετικό icon color

21. `report_helpers.dart`

    Κοινές βοηθητικές συναρτήσεις των αιτημάτων.

    Περιλαμβάνει:
    - μετατροπή status σε κείμενο
    - χρώμα ανά status
    - κοινή μορφοποίηση κατάστασης

22. `app_card.dart`

    Κοινό card που χρησιμοποιείται στα report sections.

    Περιλαμβάνει:
    - `child`
    - padding
    - margin
    - προαιρετικό `onTap`
    - κοινό border και shadow

---

