# Conversion Notes

This starter was generalized from the original CityCall codebase.

## Changes made

- Renamed the product/template identity to **Full-Stack Service Management Starter Kit**.
- Added the neutral demo brand **ServiceKit**.
- Reorganized the top-level stack folders to `backend/`, `web/`, and `mobile/`.
- Replaced the municipality-specific settings module with `OrganizationInfo`.
- Changed the API endpoint from `/municipality-info` to `/organization-info`.
- Replaced `municipality_name` with `organization_name` in the organization settings schema/API/UI.
- Replaced municipality-specific default organization/contact/location values with neutral placeholders.
- Generalized visible Greek request terminology from reports to requests where appropriate.
- Renamed React and Flutter package/project identifiers away from complaint/CityCall naming.
- Updated mobile platform application identifiers and executable/product names to generic starter values.
- Added template and architecture documentation.
- Kept the internal `Report` domain model/API intact for migration safety; it represents a Service Request in the template UI.

## Validation performed

- PHP syntax lint completed successfully across Laravel app/routes/migrations.
- Checked for remaining old branding identifiers (`CityCall`, municipality-specific module names, complaint portal package names, Larissa defaults).
- Checked the renamed `OrganizationInfo` route/model/context references for consistency.
- A full React dependency install/build could not be completed in the execution environment because its configured npm mirror returned a 404 for `zod-validation-error@4.0.2`. This is an environment/package-registry limitation rather than a compiler result.
- Flutter SDK was not available in the execution environment, so a Flutter build was not run.

## Compatibility note

This is a template conversion, not a database upgrade for an already deployed CityCall installation. If applying these changes to an existing production database, create a migration that renames `municipality_infos` to `organization_infos` and `municipality_name` to `organization_name` rather than replacing the original migration history.
