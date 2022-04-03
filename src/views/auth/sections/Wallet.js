import React, { useState } from 'react';
import { Card, CardContent, Box, Typography, Stack, Divider, Grid } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from '../../../components/elements/Image';
import WalletFace from '../../../assets/images/Wallet-Face.png'
import SelectWalletModal from '../components/SelectWalletModal'

const cardStyle = {
    boxShadow: 0, 
    borderRadius: 0,
}

const Wallet = (props) => {
   
    const { onClick } = props
    return (
        <Card sx={cardStyle}>
            <CardContent>
                <Grid container spacing={2} sx={{mb: -1}}>
                    <Grid item xs={12} sm={7} md={7}>
                        <Stack direction="row" spacing={2}>
                            <Image className="wallet-image" src={WalletFace} style={{marginTop: "10px"}} width="50" />
                            <Box>
                                <Typography variant="p" color="text.secondary" sx={{ fontSize: 10 }}>
                                    WALLET
                                </Typography>
                                <div className='text'>
                                    <h6 className="wallet-address" style={{cursor: "pointer"}} onClick={onClick} variant="h6">
                                        0xE5aafC325cC5g67hf689gh89wiusdnjdns894w89eusndsubsncjd <span style={{position: "absolute"}}><KeyboardArrowDownIcon /></span>
                                    </h6>
                                </div>

                                
                            </Box>
                        </Stack>   
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                        <Divider orientation="vertical" variant="middle" flexItem color="#000" /> 
                        <Typography variant="p" color="text.secondary" sx={{ fontSize: 10 }}>
                            BALANCE
                        </Typography>
                        <Typography className="card-text" variant="h6">
                            1,000,000,000.00 NOK
                        </Typography>
                    </Grid>
                </Grid>            
            </CardContent>
        </Card>
    )
}

export default Wallet