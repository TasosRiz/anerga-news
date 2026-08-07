import 'package:flutter/material.dart';

// Περιέχει:
// - τα βασικά χρώματα του ServiceKit
// - τα μεγέθη της οθόνης
// - κοινά spacings
// - κοινά borders για τα input fields
//
// Χρησιμοποιείται σε όλη την εφαρμογή ώστε το design
// να παραμένει ενιαίο και να αλλάζει εύκολα από ένα σημείο.

class Config {
  // Στοιχεία μεγέθους της οθόνης.
  static MediaQueryData? mediaQueryData;
  static double? screenWidth;
  static double? screenHeight;

  // Brand colors
  static const Color cityNavy = Color(0xFF0F3A5A);
  static const Color cityBlue = Color(0xFF526D82);
  static const Color cityOrange = Color(0xFFE86F2F);
  static const Color cityGreen = Color(0xFF3F8F5F);

  // Backgrounds
  static const Color cityBg = Color(0xFFF7FAFC);
  static const Color cityCard = Colors.white;
  static const Color citySoft = Color(0xFFF1F5F9);

  // Text colors
  static const Color cityText = Color(0xFF0F172A);
  static const Color cityMuted = Color(0xFF64748B);

  // Borders
  static const Color cityBorder = Color(0xFFE2E8F0);

  // Status colors
  static const Color success = Color(0xFF16A34A);
  static const Color successBg = Color(0xFFDCFCE7);

  static const Color danger = Color(0xFFDC2626);
  static const Color dangerBg = Color(0xFFFEE2E2);

  static const Color warning = Color(0xFFE86F2F);
  static const Color warningBg = Color(0xFFFFF1E8);

  // Βασικά aliases για χρήση στο app.
  static const Color primaryColor = cityNavy;
  static const Color secondaryColor = cityOrange;
  static const Color backgroundColor = cityBg;
  static const Color cardColor = cityCard;

  // Αρχικοποιεί τα μεγέθη της οθόνης.
  void init(BuildContext context) {
    mediaQueryData = MediaQuery.of(context);
    screenWidth = mediaQueryData!.size.width;
    screenHeight = mediaQueryData!.size.height;
  }

  // Επιστρέφει το πλάτος της οθόνης.
  static double? get widthSize {
    return screenWidth;
  }

  // Επιστρέφει το ύψος της οθόνης.
  static double? get heightSize {
    return screenHeight;
  }

  //define spacing height
  // Κοινά κάθετα spacings.
  static const spaceSmall = SizedBox(height: 25);

  static SizedBox get spaceMedium {
    return SizedBox(height: (screenHeight ?? 800) * 0.05);
  }

  static SizedBox get spaceBig {
    return SizedBox(height: (screenHeight ?? 800) * 0.08);
  }

  //textform field border
  // Κανονικό border των input fields.
  static const outlinedBorder = OutlineInputBorder(
    borderRadius: BorderRadius.all(Radius.circular(12)),
    borderSide: BorderSide(color: cityBorder),
  );

  // Border όταν το input είναι ενεργό.
  static const focusBorder = OutlineInputBorder(
    borderRadius: BorderRadius.all(Radius.circular(12)),
    borderSide: BorderSide(color: cityNavy, width: 1.4),
  );

  // Border όταν υπάρχει validation error.
  static const errorBorder = OutlineInputBorder(
    borderRadius: BorderRadius.all(Radius.circular(12)),
    borderSide: BorderSide(color: danger),
  );
}
