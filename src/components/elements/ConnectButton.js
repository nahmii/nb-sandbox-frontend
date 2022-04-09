import React, { useState, useEffect } from 'react'
import Button from '../elements/Button'

import { connectWallet, getCurrentWalletConnected } from '../../utils/interact'
import { setGlobalState, useGlobalState } from '../../state'


const ConnectButton = () => {
    const [account] = useGlobalState('account');
    const [status, setStatus] = useState('')

    useEffect(() => {      
        async function fetchWallet() {
          const {address, status} = await getCurrentWalletConnected();
          setGlobalState('account', address);
          setStatus(status); 
          addWalletListener();
        }
        fetchWallet();
      }, []);

      function addWalletListener() {
        if (window.ethereum) {
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              setGlobalState('account', accounts[0]);
              setStatus("👆🏽 Write a message in the text-field above.");
            } else {
              setGlobalState('account', '');
              setStatus("🦊 Connect to Metamask using the top right button.");
            }
          });
        } else {
          setStatus(
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          );
        }
      }

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setGlobalState('account', walletResponse.address);
    };

    return <>
        <h6 className="wallet-address" style={{cursor: "pointer"}} onClick={connectWalletPressed}>
            {account.length > 0 ? (
                "Connected: " + 
                String(account).substring(0,10) +
                "..." +
                String(account).substring(38)
            ) : (
                <span>Connect Wallet</span>
            )
        }
        </h6>
    </>
}

export default ConnectButton