# Changelog

## Changes made
- Removed the pre-rendered protected gallery images from the initial HTML so secret content is not present before authentication.
- Replaced the insecure client-side bypass logic with a stricter credential check that only renders gallery markup after a valid login.
- Added targeted Node tests covering valid login, invalid login, and bypass prevention.
- Added a README describing the app and the test command.

## Pre-existing Repository Issues
- The repository had no README, `package.json`, or existing automated tests at baseline.
- Baseline suite status was blocked because no test runner was configured before this change.
