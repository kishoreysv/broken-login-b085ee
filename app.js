const DEMO_CREDENTIALS = {
    username: 'admin',
    password: '12345',
};

const GALLERY_IMAGES = [
    {
        src: 'https://picsum.photos/id/1015/300/200',
        alt: 'Landscape',
    },
    {
        src: 'https://picsum.photos/id/1016/300/200',
        alt: 'Mountains',
    },
];

/**
 * Check whether the supplied credentials match the demo account.
 *
 * Args:
 *   username: Submitted username value.
 *   password: Submitted password value.
 *
 * Returns:
 *   True when both credential fields match the expected demo account.
 */
function validateCredentials(username, password) {
    return username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password;
}

/**
 * Render the protected gallery images into the target container.
 *
 * Args:
 *   galleryGrid: DOM element that receives the protected image cards.
 *
 * Returns:
 *   None.
 */
function renderGallery(galleryGrid) {
    galleryGrid.innerHTML = GALLERY_IMAGES.map((image) => `
        <figure class="gallery-card">
            <img src="${image.src}" alt="${image.alt}">
            <figcaption>${image.alt}</figcaption>
        </figure>
    `).join('');
}

/**
 * Update the interface after a login attempt.
 *
 * Args:
 *   documentRef: Document-like object exposing the required DOM nodes.
 *   username: Submitted username value.
 *   password: Submitted password value.
 *
 * Returns:
 *   An object describing whether authentication succeeded and the message shown.
 */
function attemptLogin(documentRef, username, password) {
    const errorMsg = documentRef.getElementById('error-msg');
    const loginContainer = documentRef.getElementById('login-container');
    const galleryContainer = documentRef.getElementById('gallery-container');
    const galleryGrid = documentRef.getElementById('gallery-grid');

    if (validateCredentials(username, password)) {
        renderGallery(galleryGrid);
        loginContainer.classList.add('hidden');
        galleryContainer.classList.remove('hidden');
        errorMsg.textContent = '';

        return {
            success: true,
            message: '',
        };
    }

    galleryGrid.innerHTML = '';
    galleryContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    errorMsg.textContent = 'Invalid username or password.';

    return {
        success: false,
        message: errorMsg.textContent,
    };
}

/**
 * Wire the login form submit handler when the page is ready.
 *
 * Returns:
 *   None.
 */
function initializeApp() {
    if (typeof document === 'undefined') {
        return;
    }

    const form = document.getElementById('login-form');

    if (!form) {
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        attemptLogin(document, username, password);
    });
}

if (typeof window !== 'undefined') {
    initializeApp();
}

if (typeof module !== 'undefined') {
    module.exports = {
        DEMO_CREDENTIALS,
        GALLERY_IMAGES,
        validateCredentials,
        renderGallery,
        attemptLogin,
    };
}