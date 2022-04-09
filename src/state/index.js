import { createGlobalState } from 'react-hooks-global-state';
import { getTokenBalance, getTokenSupply } from '../hooks/useContract';
import { commify, insertDecimalSeparator } from '../utils/format';

const { setGlobalState, useGlobalState } = createGlobalState({
    account: '',
    balance: '0.0000',
    totalSupply: '0.0000',
});

const updateBalance = () => {
    getTokenBalance()
      .then((userBalance) => {
        if (userBalance.toString() === "0") {
          setGlobalState('balance', '0.0000');
        } else {
          setGlobalState('balance', commify(insertDecimalSeparator(userBalance.toString(), 4)));
        }
    })
}

const updateTotalSupply = () => {
    getTokenSupply().then(s => {
        setGlobalState('totalSupply', commify(insertDecimalSeparator(s.toString(), 4)));
    });
}

export { setGlobalState, useGlobalState, updateBalance, updateTotalSupply };