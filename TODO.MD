#  TODO

## React

- [x] Χρήση του common `ConfirmDialog` στα Reports.
- [ ] Χρήση του `ConfirmDialog` στις υπόλοιπες διαγραφές όπου υπάρχει `window.confirm()`.
- [x] Έλεγχος notification navigation για reports.
- [x] Έλεγχος notification navigation για posts.

## Notifications

- [x] Δημιουργία notifications table.
- [x] Δημιουργία `notification_user` pivot table.
- [x] User notifications API.
- [x] Unread notifications count.
- [x] Mark notification as read.
- [x] Mark all notifications as read.
- [x] Notification bell στο Navbar.
- [x] Common `NotificationsList`.
- [x] Notifications στο Front Dashboard.
- [x] Automatic notification όταν αλλάζει status αναφοράς.
- [x] Automatic notification όταν δημιουργείται active post.
- [x] Προσθήκη `notify_users` στο PostForm.
- [x] Υποστήριξη `notify_users` στο Laravel API.
- [x] Notification όταν inactive post γίνεται active.
- [x] Έλεγχος navigation από report notification.
- [x] Έλεγχος navigation από post notification.
- [x] Delete notification από admin.
- [x] `useNotificationsPanel` hook.
- [x] `useUserNotifications` hook.
- [x] Ενημέρωση admin notification table με recipients/read count.
- [x] Ενημέρωση `NotificationForm` ώστε οι recipients να ορίζονται μόνο στο create.
- [ ] Τελικό styling / responsive των notifications.
- [ ] Τελικός έλεγχος bell / dropdown / dashboard σε mobile και desktop.

## Reports

- [x] Προσθήκη delete action στο `AdminReportsTable`.
- [x] Σύνδεση delete report με common `ConfirmDialog`.
- [ ] Έλεγχος permissions για delete report.

## Flutter

- [x] Notifications model.
- [x] Notifications API.
- [x] Notifications provider/state.
- [x] Notification bell / unread badge.
- [x] Notifications list.
- [x] Mark notification as read.
- [x] Mark all notifications as read.
- [x] Έλεγχος navigation από report notification.
- [x] Έλεγχος navigation από post notification.
- [ ] Τελικό styling / responsive των notifications.
- [ ] Τελικό test unread badge / mark as read / mark all as read.
- [ ] Τελικό test navigation προς Reports / Posts.
- [ ] Έλεγχος empty / loading / error states.


## Documentation
- [x] Ενημέρωση README με Notifications.
- [x] Ενημέρωση API endpoints.
- [x] Ενημέρωση ProjectReview με τα νέα common components/hooks.
- [ ] Ενημέρωση ProjectReview για Flutter Notifications.
- [ ] Τελικός έλεγχος δομής project / screenshots / περιγραφών.

## Photographs
- [ ] Ενημέρωση Photo->Photos.

## Testing
- [ ] Τελικός έλεγχος React ως admin.
- [ ] Τελικός έλεγχος React ως user.
- [ ] Τελικός έλεγχος Flutter ως user.
- [ ] Έλεγχος δημιουργίας report → αλλαγή status → notification.
- [ ] Έλεγχος active post + `notify_users`.
- [ ] Έλεγχος inactive → active post + `notify_users`.
- [ ] Έλεγχος delete notification.
- [ ] Έλεγχος logout / login και refresh δεδομένων.

## Deployment
- [ ] Deploy React frontend.
- [ ] Deploy Laravel API.
- [ ] Deploy database.
- [ ] Αλλαγή API URLs από local σε production.
- [ ] Τελικός έλεγχος React ↔ Laravel production.
- [ ] Τελικός έλεγχος Flutter ↔ Laravel production.

## Πιθανές Προσθήκες

##      Notifications
- [ ] Προσθήκη `event_type` / notification category.
- [ ] Κατηγοριοποίηση notifications π.χ.:
  - `report_status_changed`
  - `new_announcement`
  - `system_message`
  - `maintenance`
  - `account`
- [ ] Προαιρετικό φίλτρο notifications ανά category/type.
- [ ] Προαιρετικό admin management για notification categories.
- [ ] Άνοιγμα συγκεκριμένου report από notification μέσω `source_id`.
- [ ] Push notifications σε mobile στο μέλλον.