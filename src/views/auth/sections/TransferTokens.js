import React, { useEffect, useState } from 'react';
import { Card, Box, CardContent, Stack, Typography, TextField, InputAdornment, CircularProgress, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import Button from '../../../components/elements/Button'
import Image from '../../../components/elements/Image'
import WalletFace from '../../../assets/images/Wallet-Face.png'
import { transferTokens } from '../../../hooks/useContract';
import { isAddress, parseUnits } from 'ethers/lib/utils';
import { limitDecimalPlaces } from '../../../utils/format';

import { formatWalletAddress } from '../../../utils/helpers'
import { updateBalance } from '../../../state';
import { useGlobalState } from '../../../state';

const cardStyle = {
    boxShadow: 0, 
    borderRadius: 0,
}


const inputProps = {
    backgroundColor: "#F2F8FA", 
    border: "none", 
    height: "50px",
    outline: "none",
    ariaLabel: 'weight',
    fontSize: '95%',
}

const TransferTokens = () => {
    //Snackbar alert parameter
    const [open, setOpen] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    const [amountToTransfer, setAmountToTransfer] = useState('0.0000');
    const [address, setAddress] = useState('0x281b323a10d4664b37e85917b62c6e0CC017c1F2');
    const [isMalformedAddress, setIsMalformedAddress] = useState(false);
    const [addressHelperText, setAddressHelperText] = useState("");

    const [msg, setMsg] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    const [transferBtnText, setTransferBtnText] = useState("TRANSFER TOKENS")

    const [account] = useGlobalState('account');

    const handleClick = () => {

        try {
            if (isAddress(address)) {
                if (amountToTransfer < 1) {
                    setOpen(true)
                    setError(true)
                    setMsg("Cannot transfer 0 token")
                } else {
                    setLoading(true)
                    setDisableBtn(true)
                    setTransferBtnText("TRANSFERRING TOKENS")
                    transferTokens(address, parseUnits(amountToTransfer, 4)).then(transactionResponse => {
                        // waiting time
                        return transactionResponse.wait()
                    }).then(transactionReceipt => {
                        // Inform user that the transaction has been processed
                        // Update user balance and total supply
                        console.log(transactionReceipt)
                        setOpen(true)
                        setSuccess(true)
                        setMsg(`Transferred ${amountToTransfer} tokens successfully!`)
                        updateBalance();
                        setLoading(false);
                        setDisableBtn(false);
                        setTransferBtnText("TRANSFER TOKENS")
                    })
                }
            } else {
                setOpen(true)
                setError(true)
                setMsg("Malformed address. Please check again.")
                setIsMalformedAddress(true);
            }
        } catch (e) {
            console.error(e)
        }   
    }

    const handleTransferAmountChange = (event) => {
        setAmountToTransfer(event.target.value);
    }

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }

    const handleTransferAmountInput = (event) => {
        limitDecimalPlaces(event, 4);
    }

    const handleAddressInput = () => {
        setAddressHelperText("")
        setIsMalformedAddress(false);
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    })

    return (
        <Card sx={cardStyle}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={success ? 'success' : 'error'}
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
            <CardContent>
                <Typography variant="h6" color="text.secondary" sx={{ fontSize: 18, color: "#153443" }}>
                    TRANSFER TOKENS
                </Typography>

                <Box sx={{mt: 3}}>
                    <Stack direction="row" spacing={2}>
                        <Image className="wallet-image" src={WalletFace} width="50" />
                        <Box className="neg-mt">
                            <Typography variant="p" color="text.secondary" sx={{ fontSize: 12 }}>
                                SEND FROM
                            </Typography>
                            <Typography className="card-text" variant="h6">
                                {account ? formatWalletAddress(account) : "Connect wallet"}<span style={{position: "absolute"}}></span>
                            </Typography>
                            {/* <KeyboardArrowDownIcon sx={{mt: 1}} /> */}
                        </Box>
                    </Stack> 
                </Box>
                <Box sx={{mt: 3}}>
                    <Stack direction="row" spacing={2}>
                        <Box className="neg-mt">
                            <Typography variant="p" color="text.secondary" sx={{ fontSize: 12 }}>
                                SEND TO
                            </Typography>
                        </Box>
                    </Stack> 
                    <TextField
                        className='no-border'
                        label="Address"
                        id="outlined-start-adornment"
                        value={address}
                        onInput={handleAddressInput}
                        onChange={handleAddressChange}
                        error={isMalformedAddress}
                        helperText={addressHelperText}
                        sx={{ width: '100%' }}
                        InputProps={{
                            style: inputProps
                        }}
                    />
                </Box>
                <Box sx={{mt: 3}}>
                    <Typography variant="p" color="text.secondary" sx={{ fontSize: 10 }}>
                        TOKEN TYPE
                    </Typography>
                    <Typography className="card-text" variant="h6">
                        NOK <span style={{position: "absolute"}}></span>
                    </Typography>
                </Box>

                <Box
                    component="form"
                    sx={{
                    '& .MuiTextField-root': { width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                    style={{marginTop: "20px", marginBottom: "20px"}}
                >
                    <TextField
                        className='no-border'
                        label="Amount"
                        id="outlined-start-adornment"
                        value={amountToTransfer}
                        onChange={handleTransferAmountChange}
                        onInput={handleTransferAmountInput}
                        sx={{ width: '100%' }}
                        InputProps={{
                            type: 'number',
                            endAdornment: <InputAdornment position="end">NOK</InputAdornment>,
                            style: inputProps
                        }}
                    />
                </Box>

                <Box sx={{mt: 3, mb: 3}}>
                    <Typography variant="p" color="text.secondary" sx={{ fontSize: 10 }}>
                        FEE
                    </Typography>
                    <Typography className="card-text" variant="h6">
                        0.0000
                    </Typography>
                </Box>

                <Button disabled={disableBtn} style={{color: "white"}} className="button button-primary button-wide-mobile" wide onClick={handleClick}>{transferBtnText} {loading && <CircularProgress sx={{color: "white", padding: "5px", marginBottom: "5px"}}/>}</Button>
            </CardContent>
        </Card>
    )
}

export default TransferTokens