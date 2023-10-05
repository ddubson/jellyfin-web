/**
 * Gets the value of a string as boolean.
 * @param {string} value The value as a string.
 * @param {boolean} defaultValue The default value if the string is invalid.
 * @returns {boolean} The value.
 */
export function toBoolean(value: string | undefined | null, defaultValue = false): boolean {
    if (value !== 'true' && value !== 'false') {
        return defaultValue;
    } else {
        return value !== 'false';
    }
}

/**
 * Gets the value of a string as float number.
 * @param {string} value The value as a string.
 * @param {number} defaultValue The default value if the string is invalid.
 * @returns {number} The value.
 */
export function toFloat(value: string | null | undefined, defaultValue = 0): number {
    if (!value || isNaN(value as never)) {
        return defaultValue;
    } else {
        return parseFloat(value);
    }
}
