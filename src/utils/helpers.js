
export function formatWalletAddress(address) {
    const initial = address.substring(0, 20)
    const lastChar = address.length
    const last = address.substring(lastChar - 4, lastChar)

    const result = initial.concat('...', last)
    return result
}