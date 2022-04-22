/**
 * Groups 3 digits for whole number parts of a decimal number and separates them with a comma.
 * 
 * @param {string} x The string to commify.
 * @returns A commified and grouped string.
 */
export const commify = (x) => {
    return x.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Function that inserts a dot as decimal separator for a given string.
 * 
 * @param {string} string The string to place the decimal separator in.
 * @param {number} decimals The number of decimals.
 * @returns A string with a dot as separator.
 */
export const insertDecimalSeparator = (string, decimals) => {
    return string.slice(0, -decimals) + '.' + string.slice(-decimals)
}

/**
 * Function that limits the number of decimal places in an input field.
 * 
 * @param {object} event DOM event object containing a value field. 
 * @param {number} decimals The number of decimals to check against.
 * @returns Either nothing or a fixed length amount of decimals.
 */
export const limitDecimalPlaces = (event, decimals) => {
    if (event.target.value <= 0) {
        event.target.value = Math.abs(event.target.value)
    }

    if (event.target.value.indexOf('.') === -1) { return }

    if ((event.target.value.length - event.target.value.indexOf('.')) > decimals) {
        event.target.value = parseFloat(event.target.value).toFixed(decimals)
    }
}

/**
 * Function that formats currencies for display.
 * 
 * @param {string} string The string to format.
 * @param {number} [decimals=4] decimals Decimals to split the number on. (Default: 4)
 * @returns A formatted string with a decimal separator and comma separation per thousands.
 */
export const displayAsCurrency = (string, decimals = 4) => {
    return commify(insertDecimalSeparator(string, decimals))
}

/**
 * Formats a timestamp into a locale based datetime.
 * 
 * @param {number} seconds The number of seconds from unix time since the timestamp has been generated.
 * @returns A string containing the formatted timestamp.
 */
 export const timestampToDateTime = (seconds) => {
    let date = new Date(0);
    date.setSeconds(seconds, 0);
    return new Intl.DateTimeFormat('default', { dateStyle: "short", timeStyle: "short" }).format(date);
}