# Dashboard

## Σειρά ελέγχου

1. `home_dashboard.dart`

   Κεντρική σελίδα του dashboard.

   Περιλαμβάνει:
   - αρχικό fetch των reports
   - αρχικό fetch των posts
   - φόρτωση report counts
   - φόρτωση post counts
   - εμφάνιση όλων των dashboard sections

2. `dashboard_header.dart`

   Header του dashboard.

   Περιλαμβάνει:
   - όνομα χρήστη
   - avatar
   - μήνυμα καλωσορίσματος
   - εικονίδιο ειδοποιήσεων
   - ανάγνωση username από `AuthStorage`

3. `quick_actions.dart`

   Γρήγορες ενέργειες του dashboard.

   Περιλαμβάνει:
   - νέα αίτημα
   - αιτήματα χρήστη
   - ανακοινώσεις
   - επικοινωνία
   - navigation προς τις αντίστοιχες σελίδες

4. `section_title.dart`

   Κοινός τίτλος για τα sections του dashboard.

   Χρησιμοποιείται σε:
   - Quick Actions
   - Dashboard Summary
   - Recent Reports
   - Latest Announcements

5. `action_card.dart`

   Κοινό card για τις γρήγορες ενέργειες.

   Περιλαμβάνει:
   - τίτλο
   - εικονίδιο
   - χρώμα
   - `onTap`
   - ripple effect

6. `dashboard_summary.dart`

   Σύνοψη των βασικών counts.

   Παίρνει δεδομένα από:
   - `ReportsProvider`
   - `PostsProvider`

   Διαχειρίζεται:
   - loading
   - errors
   - null counts
   - εμφάνιση των `SummaryCard`

7. `summary_card.dart`

   Κοινό card για στατιστικά.

   Περιλαμβάνει:
   - count
   - τίτλο
   - background color
   - text color
   - προαιρετικό `onTap`

8. `recent_reports.dart`

   Εμφανίζει τις 3 πιο πρόσφατες αιτήματα.

   Περιλαμβάνει:
   - loading
   - error state
   - empty state
   - ταξινόμηση με ημερομηνία
   - `ReportCard`
   - navigation στο `ViewReport`

9. `latest_announcements.dart`

   Εμφανίζει τις τελευταίες ανακοινώσεις.

   Περιλαμβάνει:
   - loading
   - error state
   - empty state
   - περιορισμό με `limit`
   - `PostCard`
   - navigation στο `ViewPost`

10. `app_card.dart`

    Κοινό card για empty states και errors.

    Περιλαμβάνει:
    - `child`
    - padding
    - margin
    - προαιρετικό `onTap`
    - κοινό border και shadow

11. `reports_provider.dart`

    Δίνει τα reports και τα report counts στο dashboard.

    Χρησιμοποιούνται:
    - `fetchUserReports()`
    - `loadUserReportCounts()`
    - `reports`
    - `counts`
    - `loading`
    - `countsLoading`
    - `errorMessage`
    - `countsErrorMessage`

12. `posts_provider.dart`

    Δίνει τα posts και τα post counts στο dashboard.

    Χρησιμοποιούνται:
    - `fetchPublicPosts()`
    - `loadPostsCounts()`
    - `latestPosts()`
    - `posts`
    - `counts`
    - `loading`
    - `countsLoading`
    - `errorMessage`
    - `countsErrorMessage`

---
