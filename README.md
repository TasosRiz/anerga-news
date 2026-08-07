# Full-Stack Service Management Starter Kit

A reusable full-stack starter for service requests, cases, tickets, complaints, maintenance requests, and other organization workflows.

The project contains one integrated backend, web application/admin panel, and mobile client so a new product can start from working authentication, users, service requests, categories, notifications, media, content, and maps instead of rebuilding the foundation.

## Stack

- **Backend:** Laravel 12 REST API + Sanctum
- **Web:** React 19 + Vite
- **Mobile:** Flutter
- **Database:** MySQL-compatible relational database

## Project structure

```text
service-management-starter/
├── backend/       # Laravel API
├── web/           # React public site + admin panel
├── mobile/        # Flutter mobile application
├── docs/          # Template/architecture documentation
└── tests-notes/   # Existing testing notes
```

## Core modules

- Authentication and API tokens
- Users and roles
- Organization profile and branding
- Service requests/cases (internally retained as `Report` for backward compatibility)
- Categories
- Status workflow
- Notifications
- Announcements/posts
- Media library and uploads
- Dashboard and statistics
- Maps, coordinates, and address lookup
- Admin CRUD components, tables, filters, dialogs, and forms

## Template terminology

The starter uses **Service Request** as the default product-facing concept. The existing backend/API model is still named `Report` so this first template conversion remains migration-safe.

For a new product you can present the same entity as:

- Service Request
- Case
- Ticket
- Issue
- Maintenance Request
- Submission

See [`docs/TEMPLATE_GUIDE.md`](docs/TEMPLATE_GUIDE.md) for the recommended customization path.

## Backend setup

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
```

Configure your database in `.env`, then run:

```bash
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

## Web setup

```bash
cd web
npm install
npm run dev
```

Configure the API URL using the existing web environment/config mechanism before deployment.

## Mobile setup

```bash
cd mobile
flutter pub get
flutter run
```

Update the mobile API base URL and platform identifiers for the target project.

## First customization checklist

1. Set the organization name, app name, contact information, colors, and logo.
2. Replace sample homepage/announcement content and seed data.
3. Define service-request categories and statuses.
4. Decide whether maps/geolocation are needed.
5. Configure API URLs for web and mobile.
6. Change Android/iOS bundle identifiers before publishing.
7. Replace template images/assets with project-specific assets.

## Naming

**Template:** Full-Stack Service Management Starter Kit  
**Default demo brand:** ServiceKit
