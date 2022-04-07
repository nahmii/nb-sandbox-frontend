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