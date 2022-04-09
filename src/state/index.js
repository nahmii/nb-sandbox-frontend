import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
    account: '',
    balance: '0.0000',
    totalSupply: '0.0000',
});

export { setGlobalState, useGlobalState };