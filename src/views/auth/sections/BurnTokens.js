import React, { useState } from 'react';
import { Card, Box, CardContent, Typography, TextField, InputProps, InputAdornment, FormControl, FilledInput, FormHelperText } from '@mui/material'
import { Link } from 'react-router-dom'
import Button from '../../../components/elements/Button'
import { burnTokens } from '../../../hooks/useContract';

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

const BurnTokens = () => {
    const [textInput, setTextInput] = useState('0.0000');

    const handleClick = () =>{
        // TODO: Handle decimals
        burnTokens(textInput);
    }

    const handleChange = (event) => {
        setTextInput(event.target.value);
    }

    return (
        <Card sx={cardStyle}>
            <CardContent>
                <Typography variant="h6" color="text.secondary" sx={{ fontSize: 18, color: "#153443" }}>
                    BURN TOKENS
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
                        InputProps={{
                            endAdornment: <InputAdornment position="end">NOK</InputAdornment>,
                            style: inputProps
                        }}
                    />
                </Box>
                <Button className="button button-primary button-wide-mobile" wide onClick={handleClick}>BURN TOKENS</Button>
            </CardContent>
        </Card>
    )
}

export default BurnTokens