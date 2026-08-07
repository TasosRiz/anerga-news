# Auth

## Σειρά ελέγχου

1. `auth_page.dart`

   Κεντρική σελίδα authentication.

   Περιλαμβάνει:
   - εναλλαγή login / register
   - brand header
   - auth card
   - sign in / sign up switch
   - responsive scroll
   - κλείσιμο keyboard

2. `login_widgets.dart`

   Widgets του login.

   Περιλαμβάνει:
   - `LoginHeader`

   Δεν χρειάζονται πλέον:
   - `LoginBody`
   - `LoginFormCard`
   - `SocialButton`

3. `login_form.dart`

   Φόρμα σύνδεσης.

   Περιλαμβάνει:
   - email
   - password
   - validation
   - εμφάνιση / απόκρυψη password
   - loading
   - login API request
   - φόρτωση χρήστη
   - ενημέρωση `AuthModel`
   - navigation στο `/main`

4. `register_widgets.dart`

   Widgets του register.

   Περιλαμβάνει:
   - `RegisterHeader`

   Δεν χρειάζονται πλέον:
   - `RegisterBody`
   - `RegisterFormCard`
   - `SocialButton`

5. `register_form.dart`

   Φόρμα εγγραφής.

   Περιλαμβάνει:
   - name
   - email
   - password
   - validation
   - loading
   - register API request
   - εμφάνιση API errors
   - αποθήκευση auth δεδομένων
   - ενημέρωση `AuthModel`
   - navigation στο `/main`

6. `auth_api.dart`

   Επικοινωνία authentication με το API.

   Περιλαμβάνει:
   - login
   - register
   - get current user
   - logout
   - error handling
   - authenticated headers

7. `auth_storage.dart`

   Τοπική αποθήκευση authentication δεδομένων.

   Περιλαμβάνει:
   - αποθήκευση login / register response
   - token
   - user id
   - user name
   - user email
   - user role
   - έλεγχο αν υπάρχει σύνδεση
   - καθαρισμό auth δεδομένων

8. `auth_model.dart`

   Global authentication state.

   Περιλαμβάνει:
   - `isLoggedIn`
   - current user
   - `loginSuccess()`
   - `logout()`
   - ενημέρωση widgets μέσω `ChangeNotifier`

9. `auth_msg_provider.dart`

   Κατάσταση και μηνύματα authentication.

   Περιλαμβάνει:
   - loading
   - error message
   - success message
   - login error messages
   - register error messages
   - SnackBars
   - καθαρισμό μηνυμάτων

10. `auth_gate.dart`

    Έλεγχος authentication κατά το άνοιγμα της εφαρμογής.

    Ροή:

    - δεν υπάρχει token
      → login page

    - υπάρχει token και είναι έγκυρο
      → ενημέρωση `AuthModel`
      → main page

    - υπάρχει άκυρο ή ληγμένο token
      → καθαρισμός storage
      → login page

    - δεν υπάρχει internet αλλά υπάρχει αποθηκευμένο token
      → offline είσοδος στο main page

11. `main.dart`

    Σύνδεση του auth με όλη την εφαρμογή.

    Περιλαμβάνει:
    - `AuthModel` provider
    - `AuthMsgProvider`
    - route για `AuthGate`
    - route για `AuthPage`
    - route για `MainLayout`
    - αρχικό route στο auth check

12. `profile_page.dart`

    Logout flow.

    Ροή:

    - ανάγνωση token
    - logout request στον server
    - καθαρισμός `AuthStorage`
    - `AuthModel.logout()`
    - καθαρισμός navigation stack
    - επιστροφή στο login

---

# Auth Flow

## Login

```text
LoginForm
→ validation
→ AuthApi login
→ αποθήκευση token
→ get current user
→ AuthModel.loginSuccess(user)
→ /main