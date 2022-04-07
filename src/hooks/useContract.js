import TOKEN_ABI from "../abis/cb-token.json";
import { TOKEN_ADDRESS } from "../constants";
import { useEffect, useMemo, useState } from "react";
import { getContract } from "../utils/contract";
import { ethers } from 'ethers';

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
    // TODO: Construct Web3 provider in a more generalized way
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const supply = contract.totalSupply();
    return supply;
}

export const getTokenBalance = async () => {
    // TODO: Construct Web3 provider in a more generalized way
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let address = signer.getAddress();

    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const balance = await contract.balanceOf(address);
    return balance;
}

export const transferTokens = async (_address, amount) => {
    // TODO: Construct Web3 provider in a more generalized way
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let address = signer.getAddress();

    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const transfer = await contract.transfer(address, amount);
    return transfer;
}

export const mintTokens = async (_address, amount) => {
    // TODO: Construct Web3 provider in a more generalized way
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let address = signer.getAddress();

    const contract = getContract(TOKEN_ADDRESS, TOKEN_ABI, signer);
    const minted = await contract.mintTokens(address, amount);
    return minted;
}

export const burnTokens = async (_address, amount) => {
    // TODO: Construct Web3 provider in a more generalized way
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let address = signer.getAddress();

    const contract = useContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const burned = await contract.burnTokens(address, amount);
    return burned;
}
