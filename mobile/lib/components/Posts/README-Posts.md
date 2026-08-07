# Posts

## Σειρά ελέγχου

1. `announcements_page.dart`

   Κεντρική σελίδα των ανακοινώσεων.

   Περιλαμβάνει:
   - αρχικό fetch των δημόσιων posts
   - refresh action
   - loading state
   - error state
   - empty state
   - εμφάνιση όλων των ενεργών ανακοινώσεων
   - navigation στο `ViewPost`

2. `post_card.dart`

   Κοινό card για την εμφάνιση μιας ανακοίνωσης.

   Χρησιμοποιείται:
   - στο dashboard για τις τελευταίες ανακοινώσεις
   - στη σελίδα όλων των ανακοινώσεων

   Περιλαμβάνει:
   - φωτογραφία ή fallback icon
   - τίτλο
   - κατηγορία
   - ημερομηνία δημοσίευσης
   - προεπισκόπηση περιεχομένου
   - compact mode
   - προαιρετικό `onTap`

3. `view_post.dart`

   Εμφανίζει όλες τις λεπτομέρειες μιας ανακοίνωσης.

   Περιλαμβάνει:
   - φωτογραφία
   - τίτλο
   - κατηγορία
   - ημερομηνία δημοσίευσης
   - πλήρες περιεχόμενο
   - fallback αν η φωτογραφία δεν φορτωθεί
   - fallback αν το body είναι κενό

4. `post_model.dart`

   Περιλαμβάνει τα models των posts.

   Περιλαμβάνει:
   - `PostCategoryModel`
   - `PostModel`
   - `PostsCountsModel`
   - μετατροπή δεδομένων από JSON

5. `PostCategoryModel`

   Model της κατηγορίας μιας ανακοίνωσης.

   Περιλαμβάνει:
   - id
   - name
   - status
   - μετατροπή από JSON

6. `PostModel`

   Model μιας ανακοίνωσης.

   Περιλαμβάνει:
   - id
   - title
   - status
   - published date
   - body
   - photo
   - category id
   - category object
   - μετατροπή από JSON

7. `PostsCountsModel`

   Model των συνολικών counts των ανακοινώσεων.

   Περιλαμβάνει:
   - total
   - active
   - inactive
   - new posts
   - μετατροπή από JSON

8. `posts_provider.dart`

   Διαχειρίζεται το state των ανακοινώσεων.

   Περιλαμβάνει:
   - λίστα posts
   - loading state
   - error messages
   - ενεργές ανακοινώσεις
   - τελευταίες ανακοινώσεις
   - posts counts
   - φόρτωση posts από το `PostsApi`
   - ενημέρωση UI μέσω `notifyListeners()`

9. `posts_api.dart`

   Διαχειρίζεται την επικοινωνία με το backend.

   Περιλαμβάνει:
   - φόρτωση δημόσιων ανακοινώσεων
   - φόρτωση posts counts
   - public request χωρίς token
   - authenticated request για counts
   - μετατροπή response σε models
   - διαχείριση API errors

10. `latest_announcements.dart`

    Εμφανίζει τις τελευταίες ανακοινώσεις στο dashboard.

    Περιλαμβάνει:
    - loading state
    - error state
    - empty state
    - περιορισμό αποτελεσμάτων με `limit`
    - χρήση του `PostCard`
    - navigation στο `ViewPost`

11. `info_row.dart`

    Κοινό widget για στοιχεία μιας ανακοίνωσης.

    Χρησιμοποιείται για:
    - κατηγορία
    - ημερομηνία δημοσίευσης

    Περιλαμβάνει:
    - icon
    - label
    - value
    - προαιρετικό icon color

12. `app_card.dart`

    Κοινό card που χρησιμοποιείται στα posts.

    Περιλαμβάνει:
    - `child`
    - padding
    - margin
    - προαιρετικό `onTap`
    - κοινό border και shadow

---

## Ροή λειτουργίας

`AnnouncementsPage`
→ `PostsProvider.fetchPublicPosts()`
→ `PostsApi.fetchPublicPosts()`
→ `PostModel.fromJson()`
→ `PostCard`
→ `ViewPost`

---
