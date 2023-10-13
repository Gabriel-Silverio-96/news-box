/**
 * Checks if the given error indicates a request error.
 *
 * @param {error} error - The error object to check.
 * @returns {boolean} True if it's a request error, false otherwise.
 */
export const isErrorRequest = (error) => {
    if (!error) return true

    const isError = error.response === undefined || error.response.data === null;

    return isError
}