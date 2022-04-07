import TOKEN_ABI from "../abis/cb-token.json";
import { TOKEN_ADDRESS } from "../constants";
import { useEffect, useMemo, useState } from "react";
import { getContract } from "../utils/contract";
import { getProvider } from "../utils/provider";

export const useContract = (address, ABI) => {
    // TODO: Retrieve provider, account and chainId from hook
    const { provider, account, chainId } = null;

    return useMemo(() => {
        if (!address || !ABI || !provider || !chainId) return null;

        try {
            return getContract(address, ABI, provider);
        } catch (error) {
            console.error("Contract retrieval error: ", error);
            return null;
        }
    }, [address, ABI, provider, chainId, account]);
}

export const getTokenSupply = () => {
    let { provider, signer, account } = getProvider();

    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const supply = contract.totalSupply();
    return supply;
}

export const getTokenBalance = async () => {
    let { provider, signer, account } = getProvider();

    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const balance = await contract.balanceOf(account);
    return balance;
}

export const transferTokens = async (address, amount) => {
    let { provider, signer, account } = getProvider();

    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const transfer = await contract.transfer(address, amount);
    return transfer;
}

export const mintTokens = async (amount) => {
    let { provider, signer, account } = getProvider();

    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, signer);
    const minted = await contract.mintTokens(account, amount);
    return minted;
}

export const burnTokens = async (amount) => {
    let { provider, signer, account } = getProvider();

    const contract = useContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const burned = await contract.burnTokens(account, amount);
    return burned;
}
