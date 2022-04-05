import TOKEN_ABI from "../abis/cb-token.json";
import { TOKEN_ADDRESS } from "../constants";
import { useEffect, useState } from "react";
import { Contract } from 'ethers';

export const getContract = async (address, ABI, provider) => {
    return new Contract(address, ABI, provider);
}

export const getTokenSupply = async (provider) => {
    const contract = await getContract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const supply = await contract.totalSupply();
    return supply;
}