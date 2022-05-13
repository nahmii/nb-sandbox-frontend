import { ethers } from 'ethers'
import { createGlobalState } from 'react-hooks-global-state'
import { getTokenBalance, getTokenSupply } from '../hooks/useContract'
import { displayAsCurrency } from '../utils/format'
import { connectionInfo } from '../constants'

const { setGlobalState, useGlobalState } = createGlobalState({
    account: '',
    addressBook: [],
    balance: displayAsCurrency('0'),
    loading: false,
    locale: 'en',
    totalSupply: displayAsCurrency('0'),
    wallets: [],
    provider: new ethers.providers.JsonRpcProvider(connectionInfo),
    signer: null
})

const updateBalance = (account, provider) => {
    getTokenBalance(account, provider)
        .then((userBalance) => {
            if (userBalance.toString() === '0') {
                setGlobalState('balance', displayAsCurrency('0'))
            } else {
                setGlobalState('balance', displayAsCurrency(userBalance.toString(), 4))
            }
        })
}

const updateTotalSupply = (provider) => {
    getTokenSupply(provider).then(s => {
        setGlobalState('totalSupply', displayAsCurrency(s.toString(), 4))
    })
}

export { setGlobalState, useGlobalState, updateBalance, updateTotalSupply }