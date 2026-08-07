import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// API
import 'package:service_management_mobile/components/Auth/api/auth_api.dart';
import 'package:service_management_mobile/components/Auth/api/auth_storage.dart';
import 'package:service_management_mobile/components/Auth/model/auth_model.dart';

// Provider
import 'package:service_management_mobile/components/Auth/provider/auth_msg_provider.dart';

// Config
import 'package:service_management_mobile/utils/config.dart';

// Login Form

// Φόρμα σύνδεσης χρήστη στη Flutter εφαρμογή.
//
// Περιλαμβάνει πεδία για email και password, validation των πεδίων
// και κουμπί σύνδεσης. Το password μπορεί να εμφανιστεί ή να κρυφτεί
// μέσω του suffix icon.
//
// Η φόρμα δεν κάνει απευθείας navigation, αλλά χρησιμοποιεί το
// SignInButton component, το οποίο αναλαμβάνει την επικοινωνία με το API.

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  // Form key για validation των πεδίων
  final _formKey = GlobalKey<FormState>();

  // Controllers για ανάγνωση των τιμών email και password
  final _emailController = TextEditingController();
  final _passController = TextEditingController();

  // Καθορίζει αν το password εμφανίζεται ή κρύβεται
  bool obscurePassword = true;

  // Καθαρισμός controllers όταν καταστρέφεται το widget
  @override
  void dispose() {
    _emailController.dispose();
    _passController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          _emailSection(),
          Config.spaceSmall,
          _passSection(),
          Config.spaceSmall,
          // _signInButton(),
          SignInButton(
            formKey: _formKey,
            emailController: _emailController,
            passController: _passController,
          ),
        ],
      ),
    );
  }

  // Πεδίο email με βασικό validation
  Widget _emailSection() {
    return TextFormField(
      controller: _emailController,
      keyboardType: TextInputType.emailAddress,
      cursorColor: Config.primaryColor,
      validator: (value) {
        if (value == null || value.trim().isEmpty) {
          return 'Το email είναι υποχρεωτικό.';
        }

        if (!value.contains('@')) {
          return 'Το email δεν είναι έγκυρο.';
        }

        return null;
      },
      decoration: const InputDecoration(
        hintText: 'Email Address',
        labelText: 'Email',
        alignLabelWithHint: true,
        prefixIcon: Icon(Icons.email_outlined),
        prefixIconColor: Config.primaryColor,
      ),
    );
  }

  // Πεδίο password με δυνατότητα εμφάνισης/απόκρυψη
  Widget _passSection() {
    return TextFormField(
      controller: _passController,
      obscureText: obscurePassword,
      cursorColor: Config.primaryColor,
      validator: (value) {
        if (value == null || value.trim().isEmpty) {
          return 'Ο κωδικός είναι υποχρεωτικός.';
        }

        return null;
      },
      decoration: InputDecoration(
        hintText: 'Password',
        labelText: 'Password',
        alignLabelWithHint: true,
        prefixIcon: const Icon(Icons.lock_outline),
        prefixIconColor: Config.primaryColor,
        suffixIcon: IconButton(
          onPressed: () {
            setState(() {
              obscurePassword = !obscurePassword;
            });
          },
          icon: obscurePassword
              ? const Icon(Icons.visibility_off_outlined, color: Colors.black38)
              : const Icon(
                  Icons.visibility_outlined,
                  color: Config.primaryColor,
                ),
        ),
      ),
    );
  }
}

/*
|--------------------------------------------------------------------------
| Sign In Button
|--------------------------------------------------------------------------
| Κουμπί σύνδεσης που διαχειρίζεται τη διαδικασία login.
|
| Χρησιμοποιεί Provider για πρόσβαση στο AuthModel και στο
| AuthMsgProvider. Κατά το πάτημα του κουμπιού γίνεται:
| - validation της φόρμας
| - αποστολή email και password στο API
| - αποθήκευση / ανάγνωση token
| - φόρτωση στοιχείων χρήστη
| - ενημέρωση authentication state
| - μετάβαση στην κύρια σελίδα της εφαρμογής
|--------------------------------------------------------------------------
*/

class SignInButton extends StatelessWidget {
  const SignInButton({
    super.key,
    required this.formKey,
    required this.emailController,
    required this.passController,
  });

  final GlobalKey<FormState> formKey;
  final TextEditingController emailController;
  final TextEditingController passController;

  @override
  Widget build(BuildContext context) {
    // Consumer για πρόσβαση στα authentication και message providers
    return Consumer2<AuthModel, AuthMsgProvider>(
      builder: (context, auth, messageProvider, child) {
        return ElevatedButton(
          // Αν υπάρχει loading, απενεργοποιείται το κουμπί
          onPressed: messageProvider.isLoading
              ? null
              : () => _handleSignIn(context, auth, messageProvider),
          style: ElevatedButton.styleFrom(
            backgroundColor: Config.primaryColor,
            minimumSize: const Size(double.infinity, 50),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          child: messageProvider.isLoading
              ? const CircularProgressIndicator(color: Colors.white)
              : const Text('Sign In'),
        );
      },
    );
  }

  // Διαχείριση ολόκληρης της διαδικασίας σύνδεσης
  // Future<void> γιατί η μέθοδος κάνει async δουλειά,
  // αλλά δεν επιστρέφει κάποια τιμή.
  // Χειρίζεται το login flow: validation, API call, errors και navigation.
  Future<void> _handleSignIn(
    BuildContext context,
    AuthModel auth,
    AuthMsgProvider messageProvider,
  ) async {
    final isValid = formKey.currentState?.validate() ?? false;

    if (!isValid) {
      return;
    }

    messageProvider.startLoading();

    // Εδώ περιμένουμε την απάντηση από το API.
    // Το await λέει: περίμενε μέχρι να τελειώσει το getToken.
    try {
      final success = await AuthApi().getToken(
        emailController.text.trim(),
        passController.text,
      );

      if (!context.mounted) return;

      if (!success) {
        messageProvider.showError(context, 'Λάθος email ή κωδικός.');
        return;
      }

      await _loadUserAndNavigate(context, auth, messageProvider);
    } catch (error) {
      if (!context.mounted) {
        return;
      }

      final message = messageProvider.loginErrorMessage(error);

      messageProvider.showError(context, message);
    } finally {
      if (context.mounted && messageProvider.isLoading) {
        messageProvider.stopLoading();
      }
    }
  }

  // Φόρτωση token, ανάκτηση χρήστη και navigation στο main screen
  // Future<void> γιατί κάνει async δουλειά,
  // αλλά δεν επιστρέφει τιμή.
  // Παίρνει το token, φορτώνει τα στοιχεία χρήστη και κάνει navigation.
  Future<void> _loadUserAndNavigate(
    BuildContext context,
    AuthModel auth,
    AuthMsgProvider messageProvider,
  ) async {
    // Περιμένουμε να διαβάσουμε το token από storage.
    final tokenValue = await AuthStorage.token();

    if (tokenValue == null || tokenValue.isEmpty) {
      messageProvider.showError(context, 'Δεν βρέθηκε token σύνδεσης.');
      return;
    }

    // Περιμένουμε το API να μας φέρει τα στοιχεία του χρήστη.
    final user = await AuthApi().getUser(tokenValue);

    if (!context.mounted) return;

    if (user == null) {
      messageProvider.showError(context, 'Αποτυχία φόρτωσης χρήστη.');
      return;
    }

    auth.loginSuccess(user);
    Navigator.of(context).pushReplacementNamed('/main');
  }
}
