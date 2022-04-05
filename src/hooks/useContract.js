import TOKEN_ABI from "../abis/cb-token.json";
import { TOKEN_ADDRESS } from "../constants";
import { useEffect, useState } from "react";
import { Contract } from 'ethers';

export const getContract = async (address, ABI, provider) => {
    return new Contract(address, ABI, provider);
}
