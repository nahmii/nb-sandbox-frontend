export const SUPPORTED_NETWORK = {
    chainId: '0x6C1',
    chainName: 'Bergen',
    blockExplorerUrl: 'https://blockscout.bergen.nahmii.io/',
    rpcUrl: 'https://rpc.bergen.nahmii.io'
}

export const connectionInfo = {
    url: SUPPORTED_NETWORK.rpcUrl,
    user: process.env.REACT_APP_RPC_AUTH_USERNAME,
    password: process.env.REACT_APP_RPC_AUTH_PASSWORD
}

export const TOKEN_ADDRESS = '0x025729a63396A63eDDd50ffB6c5A36681eBe4fdB'