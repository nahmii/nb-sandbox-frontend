export const retrieveItem = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const storeItem = (key, object) => {
    localStorage.setItem(key, JSON.stringify(object))
}

export const modifyItemByAddress = (key, address, callback) => {
    const items = retrieveItem(key)

    items.forEach(item => {
        if (item.address.toLowerCase() === address.toLowerCase()) {
            callback(item)
        }
    })
    storeItem(key, items)
}

export const appendItemByAddress = (key, itemKey, itemValue, object) => {
    const items = retrieveItem(key)
    const index = items.findIndex(item => item[itemKey] === itemValue)

    if (index < 0) {
        items.push(object)
    } else {
        items[index] = object
    }
}