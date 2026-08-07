import 'package:flutter/material.dart';

// Forms
import 'package:service_management_mobile/components/Auth/login_form.dart';
import 'package:service_management_mobile/components/Auth/register_form.dart';

// Headers
import 'package:service_management_mobile/components/Auth/login_widgets.dart';

import 'package:service_management_mobile/components/Auth/register_widgets.dart';

// Utils
import 'package:service_management_mobile/utils/text.dart';

//  Σελίδα αυθεντικοποίησης.
//
//  Αναλαμβάνει:
//  - εναλλαγή μεταξύ login και register
//  - εμφάνιση του brand header
//  - responsive διάταξη της φόρμας
//  - κλείσιμο του keyboard όταν ο χρήστης πατήσει εκτός input

class AuthPage extends StatefulWidget {
  const AuthPage({super.key});

  @override
  State<AuthPage> createState() => _AuthPageState();
}

class _AuthPageState extends State<AuthPage> {
  // Καθορίζει αν εμφανίζεται login ή register form.
  bool isSignIn = true;

  // Χρώματα της σελίδας authentication.
  static const Color cityNavy = Color(0xFF0F3A5A);
  static const Color cityBlue = Color(0xFF526D82);
  static const Color cityOrange = Color(0xFFE86F2F);
  static const Color cityBg = Color(0xFFF7FAFC);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: cityBg,
      resizeToAvoidBottomInset: true,

      // Κλείνει το πληκτρολόγιο όταν ο χρήστης
      // πατήσει έξω από κάποιο input.
      body: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: SafeArea(
          child: LayoutBuilder(
            builder: (context, constraints) {
              return SingleChildScrollView(
                keyboardDismissBehavior:
                    ScrollViewKeyboardDismissBehavior.onDrag,

                // Κρατά το περιεχόμενο τουλάχιστον
                // στο ύψος της οθόνης.
                child: ConstrainedBox(
                  constraints: BoxConstraints(minHeight: constraints.maxHeight),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 22),
                    child: Column(
                      children: <Widget>[
                        const SizedBox(height: 42),

                        // Logo και όνομα εφαρμογής.
                        _brandHeader(),
                        const SizedBox(height: 34),

                        // Login ή register form.
                        _authCard(),
                        const SizedBox(height: 16),

                        // Αλλαγή μεταξύ sign in και sign up.
                        _signSwitch(),
                        const SizedBox(height: 24),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  // Εμφανίζει το logo και το όνομα της εφαρμογής.
  Widget _brandHeader() {
    return Column(
      children: [
        Container(
          width: 66,
          height: 66,
          decoration: BoxDecoration(
            color: cityNavy,
            borderRadius: BorderRadius.circular(22),
            boxShadow: [
              BoxShadow(
                color: cityNavy.withOpacity(0.22),
                blurRadius: 18,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: const Icon(
            Icons.location_city_rounded,
            color: Colors.white,
            size: 34,
          ),
        ),

        const SizedBox(height: 16),

        const Text(
          'ServiceKit',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.w900,
            color: cityNavy,
            letterSpacing: -0.5,
          ),
        ),

        const SizedBox(height: 4),

        Text(
          'Your Organization',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w700,
            color: cityBlue.withOpacity(0.9),
          ),
        ),
      ],
    );
  }

  // Εμφανίζει login ή register form,
  // ανάλογα με την τιμή του isSignIn.
  Widget _authCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(20, 24, 20, 18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(26),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.06),
            blurRadius: 28,
            offset: const Offset(0, 16),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            isSignIn
                ? 'Συνδεθείτε για να συνεχίσετε'
                : 'Δημιουργήστε νέο λογαριασμό',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w600,
              color: Colors.grey.shade600,
            ),
          ),
          isSignIn ? const LoginHeader() : const RegisterHeader(),

          isSignIn ? const LoginForm() : const RegisterForm(),
        ],
      ),
    );
  }

  // Αλλάζει μεταξύ login και register mode.
  Widget _signSwitch() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text(
          isSignIn
              ? AppText.enText['signUp_text'] ?? "Don't have an account?"
              : AppText.enText['registered_text'] ?? "Already registered?",
          style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w500,
            color: Colors.grey.shade600,
          ),
        ),
        TextButton(
          onPressed: () {
            setState(() {
              isSignIn = !isSignIn;
            });
          },
          child: Text(
            isSignIn ? 'Sign Up' : 'Sign In',
            style: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w800,
              color: cityOrange,
            ),
          ),
        ),
      ],
    );
  }
}
