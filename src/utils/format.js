/**
 * Groups 3 digits for whole number parts of a decimal number and separates them with a comma.
 * 
 * @param {string} x The string to commify.
 * @returns A commified and grouped string.
 */
export const commify = (x) => {
    return x.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Function that inserts a dot as decimal separator for a given string.
 * 
 * @param {string} string The string to place the decimal separator in.
 * @param {number} decimals The number of decimals.
 * @returns A string with a dot as separator.
 */
export const insertDecimalSeparator = (string, decimals) => {
    return string.slice(0, -decimals) + '.' + string.slice(-decimals);
}