import 'package:flutter/material.dart';

//  Widgets της φόρμας σύνδεσης.
//
//  Περιλαμβάνει:
//  - header σύνδεσης
//  - πεδία email και password

class LoginHeader extends StatelessWidget {
  const LoginHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 14),

        Text(
          'Σύνδεση',
          style: TextStyle(
            color: Color(0xFF0F3A5A),
            fontSize: 28,
            fontWeight: FontWeight.w800,
          ),
        ),

        SizedBox(height: 6),

        Text(
          'Καλώς ήρθατε ξανά.',
          style: TextStyle(color: Color(0xFF526D82), fontSize: 15),
        ),

        SizedBox(height: 20),
      ],
    );
  }
}

class LoginFormCard extends StatelessWidget {
  final TextEditingController emailController;
  final TextEditingController passwordController;
  final bool obscurePassword;
  final VoidCallback? onTogglePassword;

  const LoginFormCard({
    super.key,
    required this.emailController,
    required this.passwordController,
    this.obscurePassword = true,
    this.onTogglePassword,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          controller: emailController,
          keyboardType: TextInputType.emailAddress,
          textInputAction: TextInputAction.next,
          autofillHints: const [AutofillHints.email],
          decoration: const InputDecoration(
            labelText: 'Email',
            prefixIcon: Icon(Icons.email_outlined),
          ),
        ),

        const SizedBox(height: 16),

        TextField(
          controller: passwordController,
          obscureText: obscurePassword,
          textInputAction: TextInputAction.done,
          autofillHints: const [AutofillHints.password],
          decoration: InputDecoration(
            labelText: 'Κωδικός',
            prefixIcon: const Icon(Icons.lock_outline),
            suffixIcon: onTogglePassword == null
                ? null
                : IconButton(
                    onPressed: onTogglePassword,
                    icon: Icon(
                      obscurePassword
                          ? Icons.visibility_outlined
                          : Icons.visibility_off_outlined,
                    ),
                  ),
          ),
        ),
      ],
    );
  }
}
