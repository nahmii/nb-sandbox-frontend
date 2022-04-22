import TOKEN_ABI from '../abis/cb-token.json'
import { TOKEN_ADDRESS } from '../constants'
import { useMemo } from 'react'
import { getContract } from '../utils/contract'
import { isAddress } from '../utils/address'
import { updateBalance, updateTotalSupply } from '../state'

export const useContract = (address, ABI) => {
    // TODO: Retrieve provider, account and chainId from hook
    const { provider, account, chainId } = null

    return useMemo(() => {
        if (!address || !ABI || !provider || !chainId) return null

        try {
            return getContract(address, ABI, provider)
        } catch (error) {
            console.error('Contract retrieval error: ', error)
            return null
        }
    }, [address, ABI, provider, chainId, account])
}

export const getTokenSupply = (provider) => {
    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, provider)
    const supply = contract.totalSupply()
    return supply
}

export const getTokenBalance = async (account, provider) => {
    if (!isAddress(account)) {
        return 0
    }
    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, provider)
    const balance = await contract.balanceOf(account)
    return balance
}

export const transferTokens = async (address, amount, signer) => {
    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, signer)
    const transfer = await contract.transfer(address, amount)
    return transfer
}

export const mintTokens = async (address, amount, signer) => {
    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, signer)
    const minted = await contract.mint(address, amount)
    return minted
}

export const burnTokens = async (address, amount, signer) => {
    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, signer)
    const burned = await contract.burn(address, amount)
    return burned
}

export const getContractOwner = async (provider) => {
    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, provider)
    const owner = await contract.owner()
    return owner
}

export const getTokenContract = (provider) => {
    return getContract(TOKEN_ADDRESS, TOKEN_ABI, provider)
}

export const listenToContract = (account, provider) => {
    getTokenContract(provider)
        .on("Transfer", () => {
            updateTotalSupply(provider)
            if (account !== '') {
                updateBalance(account, provider)
            }
        })
}