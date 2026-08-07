import 'package:flutter/material.dart';

//  Header της φόρμας εγγραφής.
class RegisterHeader extends StatelessWidget {
  const RegisterHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 14),

        Text(
          'Εγγραφή',
          style: TextStyle(
            color: Color(0xFF0F3A5A),
            fontSize: 28,
            fontWeight: FontWeight.w800,
          ),
        ),

        SizedBox(height: 6),

        Text(
          'Δημιουργήστε νέο λογαριασμό.',
          style: TextStyle(color: Color(0xFF526D82), fontSize: 15),
        ),

        SizedBox(height: 20),
      ],
    );
  }
}
