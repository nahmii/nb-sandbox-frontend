import React from 'react';
import { Card, Box, CardContent, Typography, TextField, InputProps, InputAdornment } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '../../../components/elements/Button'

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
    return (
        <Card sx={cardStyle}>
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
                        value="0.0"
                        sx={{ width: '100%' }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">NOK</InputAdornment>,
                            style: inputProps
                        }}
                    />
                </Box>
                <Button className="button button-primary button-wide-mobile" wide>MINT TOKENS</Button>
            </CardContent>
        </Card>
    )
}

export default MintTokens