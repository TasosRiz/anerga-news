# Template Guide

## What this starter is

This repository is a reusable **Full-Stack Service Management Starter Kit**. It is intended for products where a user creates a request/case, staff manage it through a workflow, and the user can follow progress and receive updates.

## Reusable core

The following should normally remain part of every generated project:

- Auth / registration / login
- Users and roles
- Organization profile
- Notifications
- Media uploads/library
- Common React UI and admin CRUD infrastructure
- API client/configuration
- Profile/settings

## Feature modules

These can be enabled, renamed, or removed depending on the product:

- Service Requests (`Report` internally)
- Categories
- Announcements / Posts
- Maps and geolocation
- Dashboard statistics
- Public marketing/content pages

## Project-specific layer

Replace these for each product:

- App name and logo
- Organization name and contact details
- Colors
- Homepage copy
- Categories and seed data
- Domain-specific terminology
- Mobile bundle/package IDs
- API/environment URLs

## Why `Report` remains internally

The original application used `Report` as the main domain entity. Renaming the model, routes, database tables, providers, and clients in one pass would create an unnecessary compatibility migration.

For this starter version:

- **UI/product wording:** Service Request / Request
- **Internal model/API:** Report / reports

This keeps the starter stable while allowing each derived application to decide whether an internal rename is worth doing.

## Suggested derived editions

- Helpdesk / Support Ticket Portal
- Property Maintenance Requests
- Field Service Management
- Internal Employee Requests
- Campus / Facility Requests
- Citizen Service Requests

## Recommended next refactor

If you want a fully domain-neutral codebase, the next major version should migrate:

`Report -> ServiceRequest`

across the Laravel model/table/routes, React module, Flutter module, notification source type, and API endpoints. That should be done as a dedicated migration rather than a text-only rename.
