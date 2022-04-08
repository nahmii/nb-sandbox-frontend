import React, { createContext, useReducer, useEffect, useState } from 'react';

import { getTokenSupply, getTokenBalance } from '../hooks/useContract'
import { getProvider } from '../utils/provider';
import { commify, insertDecimalSeparator } from '../utils/format'

const defaultGlobalState = {
    totalSupply: 0.0,
    balance: 0.0,
    account: "",
}

export const GlobalStateContext = createContext(defaultGlobalState)
export const DispatchStateContext = createContext(undefined)

// const GlobalState = React.createContext([{}, () => {}])

const GlobalStateProvider = ({ children }) => {
    // const [account, setAccount] = useState('0x');
    // // handle user balance
    // const [balance, setBalance] = useState('0.0000')

    const [state, setState] = useReducer(
        (state, newValue) => ({ ...state, ...newValue }),
        defaultGlobalState
    );

    useEffect(() => {
        const { provider, signer, account_ } = getProvider();
        provider.listAccounts().then(accounts => {
            setState({account: accounts[0]})
        })
        
        getTokenBalance()
            .then((userBalance) => {
                if (userBalance.toString() == "0") {
                    setState({balance: "0.0000"});
                } else {
                    setState({balance: commify(insertDecimalSeparator(userBalance.toString(), 4))})
                }
            })

        getTokenSupply()
            .then((supply) => {
                setState({totalSupply: commify(insertDecimalSeparator(supply.toString(), 4))})
            })

            console.log(state)
    }, [])


    return (
        <GlobalStateContext.Provider value={state}>
            <DispatchStateContext.Provider>
                {children}
            </DispatchStateContext.Provider>
        </GlobalStateContext.Provider>
    )
}

export default GlobalStateProvider