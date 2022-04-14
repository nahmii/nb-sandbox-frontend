import TOKEN_ABI from '../abis/cb-token.json'
import { TOKEN_ADDRESS } from '../constants'
import { useMemo } from 'react'
import { getContract } from '../utils/contract'
import { getProvider } from '../utils/provider'

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

export const getTokenBalance = async () => {
    let { provider, account } = getProvider()

    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, provider)
    const balance = await contract.balanceOf(account)
    return balance
}

export const transferTokens = async (address, amount) => {
    let { signer } = getProvider()

    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, signer)
    const transfer = await contract.transfer(address, amount)
    return transfer
}

export const mintTokens = async (amount) => {
    let { signer, account } = getProvider()

    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, signer)
    const minted = await contract.mint(account, amount)
    return minted
}

export const burnTokens = async (amount) => {
    let { signer, account } = getProvider()

    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, signer)
    const burned = await contract.burn(account, amount)
    return burned
}

export const getContractOwner = async () => {
    let { provider } = getProvider()

    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, provider)
    const owner = await contract.owner()
    return owner
}