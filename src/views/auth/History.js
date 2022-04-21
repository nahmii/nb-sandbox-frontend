import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent, Snackbar, Menu, MenuItem, Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper } from '@mui/material';
import MuiAlert from '@mui/material/Alert'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ReplayIcon from '@mui/icons-material/Replay'
import LayoutDefault from '../../layouts/LayoutDefault'
import { connectionInfo, SUPPORTED_NETWORK, TOKEN_ADDRESS } from '../../constants'
import { encode } from 'base-64'
import { useGlobalState } from '../../state';

const cardStyle = {
    boxShadow: 0,
    borderRadius: 0,
    p: 2
}

function createTableData(timestamp, from, to, type, amount, currency, more) {
    return { timestamp, from, to, type, amount, currency, more };
}
  
const rows = [
    createTableData('1 min ago', '0xE6aB…6503', '0xE8aB…7456', 'Transfer-IN', '34,543,543.6446', 'NOK', <a target="_blank" rel="noopener noreferrer" href="https://">VIEW MORE</a>),
    createTableData('20 min ago', '0xE6aB…6503', '0xE8aB…7456', 'Mint', '34,543,543.6446', 'NOK', <a target="_blank" rel="noopener noreferrer" href="https://">VIEW MORE</a>),
    createTableData('1 hr ago', '0xE6aB…6503', '0xE8aB…7456', 'Burn', '34,543,543.6446', 'NOK', <a target="_blank" rel="noopener noreferrer" href="https://">VIEW MORE</a>),
    createTableData('4 hrs ago', '0xE6aB…6503', '0xE8aB…7456', 'Transfer-OUT', '34,543,543.6446', 'NOK', <a target="_blank" rel="noopener noreferrer" href="https://">VIEW MORE</a>),
    createTableData('10 hrs ago', '0xE6aB…6503', '0xE8aB…7456', 'Transfer-IN', '34,543,543.6446', 'NOK', <a target="_blank" rel="noopener noreferrer" href="https://">VIEW MORE</a>),
];


const History = () => {
    const [account] = useGlobalState('account')
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

    const getTransactions = (page = 0, offset = 10) => {
        const URL = `${SUPPORTED_NETWORK.blockExplorerUrl}api?module=account&action=txlist&address=${TOKEN_ADDRESS}&page=${page}&offset=${offset}&filterby="to"`
        fetch(URL, {
            headers: new Headers({
                'Authorization': 'Basic ' + encode(connectionInfo.user + ':' + connectionInfo.password),
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(({ result }) => {
                setTransactions(result)
                console.log(result)
            })
    }

    useEffect(() => {
        getTransactions()
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
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}    
                        >
                            ALL TRANSACTIONS
                            <span style={{ position: 'absolute' }}>
                                <KeyboardArrowDownIcon />
                            </span>
                        </Typography>
                        <Typography id='modal-modal-title' variant='p' sx={{ fontWeight: 'bold', fontSize: '14px', color: "#0078A0" }}>
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
                            sx={{mt: 2}}
                        >
                            <MenuItem onClick={handleAllTransactions} sx={{fontSize: "14px", fontWeight: "bold", color: "#153443"}}>ALL TRANSACTIONS</MenuItem>
                            <MenuItem onClick={handleSelectWallet} sx={{fontSize: "14px", fontWeight: "bold" , color: "#153443"}}>SELECT WALLET 
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
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell sx={{color: "#0078A0"}}>
                                            Timestamp <span style={{ position: 'absolute' }}>
                                                        <KeyboardArrowDownIcon />
                                                    </span>
                                        </TableCell>
                                        <TableCell align="left">From</TableCell>
                                        <TableCell align="left">To</TableCell>
                                        <TableCell align="left">Type</TableCell>
                                        <TableCell align="left">Amount</TableCell>
                                        <TableCell align="left">Currency</TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.timestamp}
                                            </TableCell>
                                            <TableCell align="left" sx={{color: "#0078A0"}}>{row.from}</TableCell>
                                            <TableCell align="left" sx={{color: "#0078A0"}}>{row.to}</TableCell>
                                            <TableCell align="left">{row.type}</TableCell>
                                            <TableCell align="left" sx={{color: "#0078A0"}}>{row.amount}</TableCell>
                                            <TableCell align="left">{row.currency}</TableCell>
                                            <TableCell align="left" sx={{fontSize: "14px"}}>{row.more}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                                {account === '' ? '' : <a style={{ color: '#000' }} href={`https://blockscout.bergen.nahmii.io/address/${account}`}>Click here to view the history of the connected wallet.</a>}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </LayoutDefault>
    )
}

export default History