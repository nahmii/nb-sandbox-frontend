import { getAddress } from 'ethers/lib/utils'

/**
 * Returns a checksummed Ethereum address if valid, else returns false.
 * @param {string} address Addres to test the validity of.
 * @returns Checksummed address or false if invalid.
 */
export const isAddress = (address) => {
    try {
        return getAddress(address)
    } catch {
        return false
    }
}

/**
 * Shortens a given hash or string.
 * @param {string} address - The value to shorten.
 * @param {number} [start=4] - The first n characters to take from the string.
 * @param {number} [end=4] - The last n characters to take from the string.
 * @returns 
 */
export const shortenAddress = (address, start = 4, end = 4) => {
    const parsed = isAddress(address)

    if (!parsed) {
        throw Error(`Invalid address: ${address}`)
    }

    return `${parsed.slice(0, start + 2)}...${parsed.slice(-Math.abs(end))}`
}

/**
 * Does a lookup for a name corresponding to a given address in a given address book.
 * @param {string} address The address to perform a lookup for.
 * @param {array} addressBook An array of objects, with address and addressName as string object fields.
 * @returns Either a string address or the address in shortened form.
 */
export const lookupAddressName = (address, addressBook) => {
    const addressEntry = addressBook.find((ab) => {
        return ab.address.toLowerCase() === address.toLowerCase()
    })

    if (addressEntry && addressEntry?.addressName) {
        return addressEntry.addressName
    } else {
        return shortenAddress(address)
    }    
}