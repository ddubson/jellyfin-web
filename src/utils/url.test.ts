import { describe, test, expect } from 'vitest';
import { getLocationSearch, getParameterByName } from './url';

describe('getLocationSearch', () => {
    test('returns location search value if present', () => {
        Object.defineProperty(window, 'location', {
            // eslint-disable-next-line compat/compat
            value: new URL('https://jellyfin.org?search=true&filter=off')
        });
        expect(getLocationSearch()).toEqual('?search=true&filter=off');
    });

    test('returns query params if found', () => {
        Object.defineProperty(window, 'location', {
            value: {
                href: 'https://jellyfin.org?search=true&filter=off'
            }
        });
        expect(getLocationSearch()).toEqual('?search=true&filter=off');
    });

    test('returns empty string if window location does not contain query params', () => {
        Object.defineProperty(window, 'location', {
            // eslint-disable-next-line compat/compat
            value: new URL('https://jellyfin.org')
        });
        expect(getLocationSearch()).toEqual('');
    });
});

describe('getParameterByName', () => {
    test('returns param value if found in provided URL', () => {
        expect(getParameterByName('filter', '?filter=true&search=off')).toEqual('true');
    });

    test('returns param value resolved from window location URL', () => {
        Object.defineProperty(window, 'location', {
            // eslint-disable-next-line compat/compat
            value: new URL('https://jellyfin.org?search=true&filter=off')
        });
        expect(getParameterByName('search')).toEqual('true');
    });

    test('returns empty string if param is not found', () => {
        expect(getParameterByName('search', '?filter=off')).toEqual('');
    });
});
