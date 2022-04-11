import React, { useState } from 'react';
import { Card, Box, CardContent, Typography, TextField, CircularProgress, InputAdornment, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import Button from '../../../components/elements/Button'
import { mintTokens } from '../../../hooks/useContract';
import { parseUnits } from 'ethers/lib/utils';
import { limitDecimalPlaces } from '../../../utils/format';
import { updateBalance, updateTotalSupply } from '../../../state';

const cardStyle = {
    boxShadow: 0, 
    borderRadius: 0,
}

const inputProps = {
    backgroundColor: "#F2F8FA", 
    border: "0px", 
    height: "50px",
    ariaLabel: 'weight',
}

const MintTokens = () => {
    //Snackbar alert parameter
    const [open, setOpen] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const [textInput, setTextInput] = useState('0.0000');
    const [msg, setMsg] = useState("")
    const [success, setSuccess] = useState(false)
    const [, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    const [mintBtnText, setMintBtnText] = useState("MINT TOKENS")

    const handleClick = () => {
        try {
            if (textInput < 1) {
                setOpen(true)
                setError(true)
                setMsg("Cannot mint 0 token")
            } else {
                setLoading(true)
                setDisableBtn(true)
                setMintBtnText("MINTING TOKENS")
                mintTokens(parseUnits(textInput, 4)).then(transactionResponse => {
                    // waiting time
                    return transactionResponse.wait()
                }).then(transactionReceipt => {
                    // Inform user that the transaction has been processed
                    // Update user balance and total supply
                    console.log(transactionReceipt)
                    setOpen(true)
                    setSuccess(true)
                    setMsg(`Mint ${textInput} tokens successfully!`)
                    updateBalance();
                    updateTotalSupply();
                    setLoading(false);
                    setTextInput("0.0000")
                    setDisableBtn(false);
                    setMintBtnText("MINT TOKENS")
                });
            }
        } catch (e) {
            console.error(e)
            setDisableBtn(false)
            setMintBtnText("MINT TOKENS")
            setLoading(false)
        }
    }

    const handleChange = (event) => {
        setTextInput(event.target.value);
    }

    const handleInput = (event) => {
        limitDecimalPlaces(event, 4);
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
                    MINT TOKENS
                </Typography>

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
                        label="Amount"
                        id="outlined-start-adornment"
                        sx={{ width: '100%' }}
                        value={textInput}
                        onChange={handleChange}
                        onInput={handleInput}
                        InputProps={{
                            type: 'number',
                            endAdornment: <InputAdornment position="end">NOK</InputAdornment>,
                            style: inputProps
                        }}
                    />
                </Box>
                <Button disabled={disableBtn} style={{color: "white"}} className="button button-primary button-wide-mobile" wide onClick={handleClick}>{mintBtnText} {loading && <CircularProgress sx={{color: "white", padding: "5px", marginBottom: "5px"}}/>}</Button>
            </CardContent>
        </Card>
    )
}

export default MintTokens