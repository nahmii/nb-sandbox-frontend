import React, { useContext } from 'react';
import { GlobalStateContext, DispatchStateContext } from '../context/GlobalState';

export const useGlobalState = () => [
    useContext(GlobalStateContext),
    // useContext(DispatchStateContext)
]