import 'dart:ui';

import 'package:service_management_mobile/components/Auth/api/gate/auth_gate.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// Auth
import 'package:service_management_mobile/components/Auth/model/auth_model.dart';
import 'package:service_management_mobile/components/Auth/provider/auth_msg_provider.dart';

// Providers
import 'package:service_management_mobile/components/Posts/provider/posts_provider.dart';
import 'package:service_management_mobile/components/Reports/provider/reports_provider.dart';

// Screens
import 'package:service_management_mobile/components/screens/announcements_page.dart';
import 'package:service_management_mobile/components/screens/auth_page.dart';
import 'package:service_management_mobile/components/screens/profile_page.dart';
import 'package:service_management_mobile/components/screens/reports_page.dart';

// Layout
import 'package:service_management_mobile/main_layout.dart';

// Configuration
import 'package:service_management_mobile/utils/config.dart';

//  Entry point της εφαρμογής ServiceKit.
//
//  Αναλαμβάνει:
//  - αρχικοποίηση της εφαρμογής
//  - παροχή των global providers
//  - ρύθμιση του theme
//  - δήλωση των routes
//  - υποστήριξη scroll σε mobile, web και desktop

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // Επιτρέπει navigation χωρίς άμεση χρήση BuildContext.
  static final navigatorKey = GlobalKey<NavigatorState>();

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        // Διαχείριση authentication και στοιχείων χρήστη.
        ChangeNotifierProvider(create: (_) => AuthModel()),

        // Διαχείριση μηνυμάτων authentication.
        ChangeNotifierProvider(create: (_) => AuthMsgProvider()),

        // Διαχείριση αιτημάτων.
        ChangeNotifierProvider(create: (_) => ReportsProvider()),

        // Διαχείριση ανακοινώσεων / posts.
        ChangeNotifierProvider(create: (_) => PostsProvider()),
      ],
      child: MaterialApp(
        title: 'ServiceKit',
        debugShowCheckedModeBanner: false,

        navigatorKey: navigatorKey,

        // Επιτρέπει drag scrolling με touch, mouse και trackpad.
        scrollBehavior: const MyCustomScrollBehavior(),

        theme: ThemeData(
          scaffoldBackgroundColor: Colors.white,

          inputDecorationTheme: const InputDecorationTheme(
            focusColor: Config.primaryColor,
            border: Config.outlinedBorder,
            focusedBorder: Config.focusBorder,
            errorBorder: Config.errorBorder,
            enabledBorder: Config.outlinedBorder,
            floatingLabelStyle: TextStyle(color: Config.primaryColor),
            prefixIconColor: Colors.black38,
          ),

          bottomNavigationBarTheme: BottomNavigationBarThemeData(
            backgroundColor: Config.primaryColor,
            selectedItemColor: Colors.white,
            unselectedItemColor: Colors.grey.shade300,
            showSelectedLabels: true,
            showUnselectedLabels: false,
            elevation: 10,
            type: BottomNavigationBarType.fixed,
          ),
        ),

        initialRoute: '/check-auth',

        routes: {
          '/check-auth': (context) => const AuthGate(),
          '/': (context) => const AuthPage(),
          '/main': (context) => const MainLayout(),
          '/reports': (context) => const ReportsPage(),
          '/posts': (context) => const AnnouncementsPage(),
          '/profile': (context) => const ProfilePage(),
        },
      ),
    );
  }
}

class MyCustomScrollBehavior extends MaterialScrollBehavior {
  const MyCustomScrollBehavior();

  @override
  Set<PointerDeviceKind> get dragDevices => {
    PointerDeviceKind.touch,
    PointerDeviceKind.mouse,
    PointerDeviceKind.trackpad,
  };
}
