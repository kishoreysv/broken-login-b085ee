const test = require('node:test');
const assert = require('node:assert/strict');
const { attemptLogin, validateCredentials } = require('../app.js');

function createClassList() {
    const values = new Set();

    return {
        add(name) {
            values.add(name);
        },
        remove(name) {
            values.delete(name);
        },
        contains(name) {
            return values.has(name);
        },
    };
}

function createDocumentDouble() {
    const elements = {
        'error-msg': { textContent: '' },
        'login-container': { classList: createClassList() },
        'gallery-container': { classList: createClassList() },
        'gallery-grid': { innerHTML: '' },
    };

    elements['gallery-container'].classList.add('hidden');

    return {
        getElementById(id) {
            return elements[id];
        },
        elements,
    };
}

test('validateCredentials accepts only the expected demo credentials', () => {
    assert.equal(validateCredentials('admin', '12345'), true);
    assert.equal(validateCredentials('admin', 'wrong-password'), false);
    assert.equal(validateCredentials('bypass', ''), false);
});

test('attemptLogin reveals and renders the gallery for valid credentials', () => {
    const documentDouble = createDocumentDouble();

    const result = attemptLogin(documentDouble, 'admin', '12345');

    assert.equal(result.success, true);
    assert.equal(documentDouble.elements['error-msg'].textContent, '');
    assert.equal(documentDouble.elements['login-container'].classList.contains('hidden'), true);
    assert.equal(documentDouble.elements['gallery-container'].classList.contains('hidden'), false);
    assert.match(documentDouble.elements['gallery-grid'].innerHTML, /picsum\.photos/);
    assert.match(documentDouble.elements['gallery-grid'].innerHTML, /Landscape/);
});

test('attemptLogin keeps the gallery hidden and shows a generic error for invalid credentials', () => {
    const documentDouble = createDocumentDouble();

    const result = attemptLogin(documentDouble, 'bypass', '');

    assert.equal(result.success, false);
    assert.equal(result.message, 'Invalid username or password.');
    assert.equal(documentDouble.elements['login-container'].classList.contains('hidden'), false);
    assert.equal(documentDouble.elements['gallery-container'].classList.contains('hidden'), true);
    assert.equal(documentDouble.elements['gallery-grid'].innerHTML, '');
});
