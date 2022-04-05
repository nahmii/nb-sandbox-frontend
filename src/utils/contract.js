import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import { isAddress } from "./address";

/**
 * Function that instantiates a smart contract connection.
 * @param {string} address The smart contract address.
 * @param {string} ABI The smart contract application binary interface.
 * @param {Web3Provider} provider The provider to connect to the smart contract with.
 * @returns Contract object
 */
export const getContract = async (address, ABI, provider) => {
    if (address == AddressZero || !isAddress(address)) {
        throw Error(`Invalid address: ${address}`)
    }

    return new Contract(address, ABI, provider);
}