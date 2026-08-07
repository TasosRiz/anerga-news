# Architecture

```text
Flutter Mobile ─────┐
                    ├──> Laravel REST API ───> Database / Storage
React Web + Admin ──┘
```

## Backend

Laravel owns authentication, authorization, service-request data, categories, notifications, posts, media, organization settings, and API responses.

## Web

React provides both the public-facing web experience and the administration interface. Shared components implement common tables, forms, dialogs, filters, navigation, authentication guards, and media selection.

## Mobile

Flutter provides the end-user request workflow, account/authentication experience, notifications, announcements, map/location support, and request tracking.

## Organization settings

The original municipality-specific module has been generalized to `OrganizationInfo` with the endpoint:

`/api/organization-info`

It contains application name, organization name, city/location label, contact details, colors, and logo.
