import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

// Screens
import 'package:service_management_mobile/components/screens/announcements_page.dart';
import 'package:service_management_mobile/components/screens/home_dashboard.dart';
import 'package:service_management_mobile/components/screens/profile_page.dart';
import 'package:service_management_mobile/components/screens/reports_page.dart';

//  Κύριο layout της εφαρμογής μετά το login.
//
//  Αναλαμβάνει:
//  - εμφάνιση των βασικών pages
//  - πλοήγηση με BottomNavigationBar
//  - συγχρονισμό του ενεργού page με το PageView

class MainLayout extends StatefulWidget {
  const MainLayout({super.key});

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  // Τρέχον ενεργό page του BottomNavigationBar.
  int currentPage = 0;

  // Ελέγχει την πλοήγηση του PageView.
  final PageController _pageController = PageController();

  // Βασικές σελίδες της εφαρμογής.
  final List<Widget> _pages = [
    HomeDashboard(),
    const ReportsPage(),
    const AnnouncementsPage(),
    const ProfilePage(),
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  // Μετακινεί το PageView στο επιλεγμένο page.
  void handleNavigation(int pageIndex) {
    _pageController.jumpToPage(pageIndex);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: _pageController,
        children: _pages,
        onPageChanged: (pageIndex) {
          setState(() {
            currentPage = pageIndex;
          });
        },
      ),

      bottomNavigationBar: BottomNavigationBar(
        currentIndex: currentPage,
        onTap: handleNavigation,
        items: const [
          BottomNavigationBarItem(
            icon: FaIcon(FontAwesomeIcons.house),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: FaIcon(FontAwesomeIcons.triangleExclamation),
            label: 'Reports',
          ),
          BottomNavigationBarItem(
            icon: FaIcon(FontAwesomeIcons.newspaper),
            label: 'Posts',
          ),
          BottomNavigationBarItem(
            icon: FaIcon(FontAwesomeIcons.user),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
