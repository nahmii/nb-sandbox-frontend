import { getAddress } from "ethers/lib/utils";

/**
 * Returns a checksummed Ethereum address if valid, else returns false.
 * @param {string} address 
 * @returns Checksummed address or false if invalid.
 */
export function isAddress(address) {
    try {
        return getAddress(address);
    } catch {
        return false;
    }
}