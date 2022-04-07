import React, { useEffect, useState } from 'react';
import { Card, CardContent, Box, Typography, Stack, Divider, Grid } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from '../../../components/elements/Image';
import WalletFace from '../../../assets/images/Wallet-Face.png'
import SelectWalletModal from '../elements/SelectWalletModal'
import { getTokenBalance } from '../../../hooks/useContract';
import { commify, formatUnits } from 'ethers/lib/utils';

const cardStyle = {
    boxShadow: 0, 
    borderRadius: 0,
}

const Wallet = () => {
    // handle modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // handle user balance
    const [balance, setBalance] = useState('0')

    useEffect(() => {
        getTokenBalance()
            .then((userBalance) => {
                setBalance(commify(formatUnits(userBalance, 4)))
            })
    }, [])

    // const { onClick } = props
    return (
        <Card sx={cardStyle}>
            { open ? (
                <SelectWalletModal open={handleOpen} onClose={handleClose} />
            ) : null }
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
                                    <h6 className="wallet-address" style={{cursor: "pointer"}} onClick={handleOpen} variant="h6">
                                        0xE5aafC325cC5g67hf689gh89wiusdnjdns894w89eusndsubsncjd <span style={{position: "absolute", marginTop: "-30px",marginLeft: "10px"}}><KeyboardArrowDownIcon /></span>
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
                            {balance} NOK
                        </Typography>
                    </Grid>
                </Grid>            
            </CardContent>
        </Card>
    )
}

export default Wallet