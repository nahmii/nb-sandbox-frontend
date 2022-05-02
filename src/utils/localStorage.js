/**
 * Function that retrieves a given item from LocalStorage.
 * @param {String} key LocalStorage lookup key.
 * @returns Parsed object value associated with the given key or null.
 */
export const retrieveItem = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

/**
 * Function that stores a given object by key in LocalStorage.
 * @param {String} key LocalStorage lookup key.
 * @param {Object} object The object to store in LocalStorage.
 */
export const storeItem = (key, object) => {
    localStorage.setItem(key, JSON.stringify(object))
}

/**
 * Function for modifying a given item for a given key in LocalStorage.
 * @param {String} key LocalStorage lookup key.
 * @param {String} address The address for an item to modify.
 * @param {Function} callback Function to call if a given item is found.
 */
export const modifyItemByAddress = (key, address, callback) => {
    const items = retrieveItem(key)

    items.forEach(item => {
        if (item.address.toLowerCase() === address.toLowerCase()) {
            callback(item)
        }
    })
    storeItem(key, items)
}

/**
 * Function for appending or modifying an existing item in LocalStorage.
 * @param {String} key LocalStorage lookup key.
 * @param {String} address The address for an item to check for.
 * @param {Object} object The object to append in LocalStorage.
 */
export const appendItemByAddress = (key, address, object) => {
    let items = retrieveItem(key)

    if (!items) {
        items = []
    }

    const index = items.findIndex(item => item.address.toLowerCase() === address)

    if (index < 0) {
        items.push(object)
    } else {
        items[index] = object
    }
    storeItem(key, items)
}

/**
 * Function for deleting an existing item in LocalStorage.
 * @param {String} key LocalStorage lookup key.
 * @param {String} address The address for an item to check for.
 */
export const deleteItemByAddress = (key, address) => {
    const items = retrieveItem(key)
    const newItems = items.filter(item => item.address.toLowerCase() !== address.toLowerCase())
    storeItem(key, newItems)
}