# Protected Auth Gallery

This repository contains a small static HTML/CSS/JavaScript demo that protects a gallery behind a simple client-side login flow.

## Demo credentials
- Username: `admin`
- Password: `12345`

## Run locally
Open `index.html` in a browser.

## Run tests
```bash
node --test tests/app.test.js
```

## Notes
The gallery markup is rendered only after a successful login, which prevents the protected images from appearing in the initial DOM.
