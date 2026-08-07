import 'package:service_management_mobile/components/Auth/api/auth_api.dart';
import 'package:service_management_mobile/components/Auth/api/auth_storage.dart';
import 'package:service_management_mobile/utils/config.dart';
import 'package:flutter/material.dart';

// Φόρμα εγγραφής νέου χρήστη.

// Αναλαμβάνει:
// - validation των πεδίων
// - αποστολή των στοιχείων στο API
// - αποθήκευση των authentication δεδομένων
// - εμφάνιση loading και error μηνυμάτων
// - μετάβαση στην κύρια σελίδα μετά την εγγραφή
class RegisterForm extends StatefulWidget {
  const RegisterForm({super.key});

  @override
  State<RegisterForm> createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
  // Key της φόρμας για το validation.
  final _formKey = GlobalKey<FormState>();

  // Controllers των πεδίων.
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passController = TextEditingController();

  // Κατάσταση της φόρμας.
  bool isLoading = false;
  bool obscurePassword = true;
  String errorMessage = '';

  // Διαχειρίζεται την εγγραφή του χρήστη.
  Future<void> handleRegister() async {
    final isValid = _formKey.currentState?.validate() ?? false;

    if (!isValid) {
      return;
    }

    // Παίρνει τις τιμές των πεδίων.
    final name = _nameController.text.trim();
    final email = _emailController.text.trim();
    final password = _passController.text;

    // Ενεργοποιεί το loading και καθαρίζει το παλιό error.
    setState(() {
      isLoading = true;
      errorMessage = '';
    });

    try {
      // Στέλνει τα στοιχεία εγγραφής στο API.
      final data = await AuthApi().registerUser(
        name: name,
        email: email,
        password: password,
      );

      // Αποθηκεύει token και authentication δεδομένα.
      await AuthStorage.saveAuthInfo(data);

      if (!mounted) {
        return;
      }

      // Εμφανίζει μήνυμα επιτυχίας.
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Η εγγραφή ολοκληρώθηκε.')));

      // Μεταφέρει τον χρήστη στην κύρια σελίδα.
      Navigator.of(context).pushReplacementNamed('/main');
    } catch (error) {
      if (!mounted) {
        return;
      }

      // Εμφανίζει το μήνυμα λάθους του API.
      setState(() {
        errorMessage = error.toString().replaceFirst('Exception: ', '');
      });
    } finally {
      if (mounted) {
        // Απενεργοποιεί το loading όταν ολοκληρωθεί το request.
        setState(() {
          isLoading = false;
        });
      }
    }
  }

  @override
  void dispose() {
    // Καθαρίζει τους controllers όταν κλείσει το widget.
    _nameController.dispose();
    _emailController.dispose();
    _passController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          // Όνομα χρήστη.
          TextFormField(
            controller: _nameController,
            textInputAction: TextInputAction.next,
            decoration: const InputDecoration(
              labelText: 'Όνομα',
              hintText: 'Username',
              prefixIcon: Icon(Icons.person_outline),
            ),
            validator: (value) {
              if (value == null || value.trim().isEmpty) {
                return 'Το όνομα είναι υποχρεωτικό.';
              }

              return null;
            },
          ),

          Config.spaceSmall,

          // Email χρήστη.
          TextFormField(
            controller: _emailController,
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            autofillHints: const [AutofillHints.email],
            decoration: const InputDecoration(
              labelText: 'Email',
              hintText: 'Email Address',
              prefixIcon: Icon(Icons.email_outlined),
            ),
            validator: (value) {
              final email = value?.trim() ?? '';

              if (email.isEmpty) {
                return 'Το email είναι υποχρεωτικό.';
              }

              if (!email.contains('@')) {
                return 'Το email δεν είναι έγκυρο.';
              }

              return null;
            },
          ),

          Config.spaceSmall,

          // Κωδικός χρήστη.
          TextFormField(
            controller: _passController,
            obscureText: obscurePassword,
            textInputAction: TextInputAction.done,
            autofillHints: const [AutofillHints.newPassword],
            onFieldSubmitted: (_) {
              if (!isLoading) {
                handleRegister();
              }
            },
            decoration: InputDecoration(
              labelText: 'Password',
              hintText: 'Password',
              prefixIcon: const Icon(Icons.lock_outline),
              suffixIcon: IconButton(
                onPressed: () {
                  // Εμφανίζει ή κρύβει το password.
                  setState(() {
                    obscurePassword = !obscurePassword;
                  });
                },
                icon: Icon(
                  obscurePassword
                      ? Icons.visibility_off_outlined
                      : Icons.visibility_outlined,
                ),
              ),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Ο κωδικός είναι υποχρεωτικός.';
              }

              if (value.length < 6) {
                return 'Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες.';
              }

              return null;
            },
          ),

          Config.spaceSmall,

          // Μήνυμα λάθους από το API.
          if (errorMessage.isNotEmpty) ...[
            Text(
              errorMessage,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: Colors.red,
                fontWeight: FontWeight.w600,
              ),
            ),
            Config.spaceSmall,
          ],

          // Κουμπί εγγραφής.
          ElevatedButton(
            onPressed: isLoading ? null : handleRegister,
            style: ElevatedButton.styleFrom(
              backgroundColor: Config.primaryColor,
              minimumSize: const Size(double.infinity, 50),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            child: isLoading
                ? const SizedBox(
                    width: 22,
                    height: 22,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Colors.white,
                    ),
                  )
                : const Text(
                    'Sign Up',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}
