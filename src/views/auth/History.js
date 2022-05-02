import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent, Snackbar, Menu, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import MuiAlert from '@mui/material/Alert'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ReplayIcon from '@mui/icons-material/Replay'
import LayoutDefault from '../../layouts/LayoutDefault'
import { connectionInfo, SUPPORTED_NETWORK, TOKEN_ADDRESS, TRANSFER_TOPIC } from '../../constants'
import { encode } from 'base-64'
import { useGlobalState } from '../../state'
import { BigNumber, ethers } from 'ethers'
import { timestampToDateTime } from '../../utils/format'
import { lookupAddressName, shortenAddress } from '../../utils/address'

const cardStyle = {
    boxShadow: 0,
    borderRadius: 0,
    p: 2
}

const History = () => {
    const [account] = useGlobalState('account')
    const [addressBook] = useGlobalState('addressBook')
    //Snackbar alert parameter
    const [openAlert, setOpenAlert] = useState(false)
    const [success, setSuccess] = useState(false)
    const [msg, setMsg] = useState('')
    const [transactions, setTransactions] = useState([])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseAlert = (_, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenAlert(false)
    }

    const handleAllTransactions = () => {
        return
    }

    const handleSelectWallet = () => {
        return
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
    })

    const transactionType = (from, to) => {
        if (from.toLowerCase() === ethers.constants.AddressZero) {
            return 'Mint'
        } else if (to.toLowerCase() === ethers.constants.AddressZero) {
            return 'Burn'
        } else {
            if (from.toLowerCase() === account.toLowerCase()) {
                return 'Transfer - OUT'
            } else if (to.toLowerCase() === account.toLowerCase()) {
                return 'Transfer - IN'
            } else {
                return 'Transfer'
            }
        }
    }

    const getTransactions = () => {
        const URL = `${SUPPORTED_NETWORK.blockExplorerUrl}api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${TOKEN_ADDRESS}&topic0=${TRANSFER_TOPIC}`
        fetch(URL, {
            headers: new Headers({
                'Authorization': 'Basic ' + encode(connectionInfo.user + ':' + connectionInfo.password),
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(({ result }) => {
                const formattedData = result.map(item => {
                    const fromAddress = `0x${item.topics[1].slice(-40)}`
                    const toAddress = `0x${item.topics[2].slice(-40)}`
                    return {
                        timestamp: timestampToDateTime(BigNumber.from(item.timeStamp).toNumber()),
                        amount: ethers.utils.formatUnits(BigNumber.from(item.data), 4),
                        type: transactionType(fromAddress, toAddress),
                        from: fromAddress,
                        to: toAddress,
                        currency: 'NOK',
                        transactionHash: item.transactionHash
                    }
                }).reverse()
                setTransactions([...formattedData])
            })
    }

    const refreshHistory = () => {
        getTransactions()
    }

    const columns = [
        { field: 'timestamp', headerName: 'Timestamp', width: 180, headerClassName: 'primary-color' },
        {
            field: 'from',
            headerName: 'From',
            width: 160,
            cellClassName: 'primary-color',
            renderCell: (params) => {
                return <a target='_blank' rel='noopener noreferrer' href={`${SUPPORTED_NETWORK.blockExplorerUrl}address/${params.row.from}`}>{lookupAddressName(params.row.from, addressBook)}</a>
            }
        },
        {
            field: 'to',
            headerName: 'To',
            width: 160,
            cellClassName: 'primary-color',
            renderCell: (params) => {
                return <a target='_blank' rel='noopener noreferrer' href={`${SUPPORTED_NETWORK.blockExplorerUrl}address/${params.row.to}`}>{lookupAddressName(params.row.to, addressBook)}</a>
            }
        },
        { field: 'type', headerName: 'Type', width: 100 },
        { field: 'amount', headerName: 'Amount', width: 160, cellClassName: 'primary-color' },
        {
            field: 'currency',
            headerName: 'Currency',
            width: 100,
            sortable: false
        },
        {
            field: 'transactionHash',
            headerName: ' ',
            cellClassName: 'primary-color',
            width: 150,
            sortable: false,
            renderCell: (params) => {
                return <a target='_blank' rel='noopener noreferrer' href={`${SUPPORTED_NETWORK.blockExplorerUrl}tx/${params.row.transactionHash}`}>VIEW MORE</a>
            }
        },
    ]

    useEffect(() => {
        getTransactions()
        const historyInterval = setInterval(() => {
            getTransactions()
        }, 15 * 60 * 1000)

        return () => {
            clearInterval(historyInterval)
        }
    }, [])

    return (
        <LayoutDefault>
            <Box className='container' sx={{ mt: 12, mb: 10 }}>
                <Card sx={cardStyle}>
                    <Snackbar
                        open={openAlert}
                        autoHideDuration={6000}
                        onClose={handleCloseAlert}
                    >
                        <Alert
                            onClose={handleCloseAlert}
                            severity={success ? 'success' : 'error'}
                            sx={{ width: '100%' }}
                        >
                            {msg}
                        </Alert>
                    </Snackbar>
                    <CardContent>
                        <Typography
                            id='modal-modal-title'
                            variant='p'
                            sx={{ fontWeight: 'bold', fontSize: '14px' }}
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            ALL TRANSACTIONS
                            <span style={{ position: 'absolute' }}>
                                <KeyboardArrowDownIcon />
                            </span>
                        </Typography>
                        <Typography id='modal-modal-title' variant='p' sx={{ fontWeight: 'bold', fontSize: '14px', color: '#0078A0', cursor: 'pointer' }} onClick={refreshHistory}>
                            <span style={{ float: 'right' }}><span style={{ position: 'absolute', marginLeft: '-30px' }}><ReplayIcon /></span>Update</span>
                        </Typography>
                        <Menu
                            id='basic-menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{ mt: 2 }}
                        >
                            <MenuItem onClick={handleAllTransactions} sx={{ fontSize: '14px', fontWeight: 'bold', color: '#153443' }}>ALL TRANSACTIONS</MenuItem>
                            <MenuItem onClick={handleSelectWallet} sx={{ fontSize: '14px', fontWeight: 'bold', color: '#153443' }}>SELECT WALLET
                                <span style={{ position: '' }}>
                                    <KeyboardArrowDownIcon />
                                </span>
                            </MenuItem>
                        </Menu>

                        <Box
                            component='form'
                            sx={{
                                '& .MuiTextField-root': { width: '100%' },
                            }}
                            noValidate
                            autoComplete='off'
                            style={{ marginTop: '20px', marginBottom: '20px' }}
                        >
                            <div className={'history-table'} style={{ height: 670, width: '100%' }}>
                                <DataGrid
                                    rows={transactions}
                                    getRowId={(row) => row.transactionHash}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                />
                            </div>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </LayoutDefault>
    )
}

export default History