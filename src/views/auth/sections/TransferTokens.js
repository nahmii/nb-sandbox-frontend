import React, { useEffect, useState } from 'react';
import { Card, Box, CardContent, Stack, Typography, TextField, InputProps, OutlinedInput, InputAdornment, FormControl, FilledInput, FormHelperText } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '../../../components/elements/Button'
import Image from '../../../components/elements/Image'
import WalletFace from '../../../assets/images/Wallet-Face.png'
import { transferTokens } from '../../../hooks/useContract';
import { getProvider } from '../../../utils/provider';
import { parseUnits } from 'ethers/lib/utils';
import { limitDecimalPlaces } from '../../../utils/format';
import { useGlobalState } from '../../../hooks/useGlobalState';

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
}

const TransferTokens = () => {
    const [textInput, setTextInput] = useState('0.0000');
    const [address, setAddress] = useState('0x281b323a10d4664b37e85917b62c6e0CC017c1F2');

    const [state, dispatch] = useGlobalState()
    const handleClick = () =>{
        // TODO: Get a selected address
        transferTokens(address, parseUnits(textInput, 4));
    }

    const handleChange = (event) => {
        setTextInput(event.target.value);
    }

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }

    const handleInput = (event) => {
        limitDecimalPlaces(event, 4);
    }

    return (
        <Card sx={cardStyle}>
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
                                {state.account ? state.account : "Connect wallet"}<span style={{position: "absolute"}}></span>
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
                        onChange={handleAddressChange}
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
                        value={textInput}
                        onChange={handleChange}
                        onInput={handleInput}
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

                <Button className="button button-primary button-wide-mobile" wide onClick={handleClick}>TRANSFER TOKENS</Button>
            </CardContent>
        </Card>
    )
}

export default TransferTokens