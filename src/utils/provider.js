/**
 * Function that returns the signer on a provider based on a given account.
 * @param {Web3Provider} provider 
 * @param {string} account 
 * @returns JsonRpcSigner object
 */
export const getSigner = (provider, account) => {
    return provider.getSigner(account);
}

/**
 * Function that returns either a provider or a signer.
 * @param {Web3rovider} provider 
 * @param {string} [account] Optional account
 * @returns Web3Provider or JsonRpcSigner object
 */
export const getProviderOrSigner = (provider, account) => {
    return account ? getSigner(provider, account) : provider;
}