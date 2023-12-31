export const DEFAULT_DATE_LOCALE = "en-US"
export const ERROR_MESSAGE_DATE_IS_REQUIRED = "date is required"
export const ERROR_MESSAGE_FORMAT_DATE_IS_NOT_VALID = "this is not a valid date string"

/**
 * Format date string.
 *
 * @param {string} date - The date string to be formatted.
 * @param {Intl.DateTimeFormatOptions} [options] - An object containing formatting options.
 * @returns {string} The formatted date string.
 * 
 * @link {Intl.DateTimeFormatOptions} options - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString 
 *
 * @throws {Error} Throws an error if `date` is undefined.
 * @throws {Error} If the provided 'date' is not a valid date.
 * 
 * @example
 * // Basic usage
 * const formattedDate = formatDate(new Date());
 *
 * // With formatting options
 * const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
 * const formattedDate = formatDate(new Date(), options);
 */
export const formatDate = (date, options) => {
    if (date === undefined) throw new Error(ERROR_MESSAGE_DATE_IS_REQUIRED)

    const event = new Date(date);

    if (isNaN(event)) throw new Error(ERROR_MESSAGE_FORMAT_DATE_IS_NOT_VALID)

    const result = event.toLocaleDateString(DEFAULT_DATE_LOCALE, options)

    return result
}