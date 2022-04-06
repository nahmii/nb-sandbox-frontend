import TOKEN_ABI from "../abis/cb-token.json";
import { TOKEN_ADDRESS } from "../constants";
import { useEffect, useMemo, useState } from "react";
import { getContract } from "../utils/contract";

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

export const getTokenSupply = async (provider) => {
    const contract = useContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const supply = await contract.totalSupply();
    return supply;
}

export const getTokenBalance = async (address, provider) => {
    const contract = useContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const balance = await contract.balanceOf(address);
    return balance;
}

export const transferTokens = async (address, amount, provider) => {
    const contract = useContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const transfer = await contract.transfer(address, amount);
    return transfer;
}

export const mintTokens = async (address, amount, provider) => {
    const contract = useContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const minted = await contract.mintTokens(address, amount);
    return minted;
}

export const burnTokens = async (address, amount, provider) => {
    const contract = useContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const burned = await contract.burnTokens(address, amount);
    return burned;
}
