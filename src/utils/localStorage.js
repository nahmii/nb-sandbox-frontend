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

export const appendItemByAddress = (key, address, object) => {
    const items = retrieveItem(key)
    const index = items.findIndex(item => item.address.toLowerCase() === address)

    if (index < 0) {
        items.push(object)
    } else {
        items[index] = object
    }
    storeItem(key, items)
}

export const deleteItemByAddress = (key, address) => {
    const items = retrieveItem(key)
    const newItems = items.filter(item => item.address.toLowerCase() !== address.toLowerCase())
    storeItem(key, newItems)
}