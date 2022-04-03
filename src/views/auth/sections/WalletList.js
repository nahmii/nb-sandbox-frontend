import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Grid, Box } from '@mui/material';
import Button from '../../../components/elements/Button';
import WalletFace from '../../../assets/images/Wallet-Face.png'
import Scrollbar from '../elements/Scrollbar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


import WalletDetails from './WalletDetails';

const cardStyle = {
    boxShadow: 0
}

const data = [
    { address: "tyuik678999999ewsks...", image: WalletFace },
    { address: "tyuik678999999ewsks...", image: WalletFace },
    { address: "tyuik678999999ewsks...", image: WalletFace },
    { address: "tyuik678999999ewsks...", image: WalletFace },
    { address: "tyuik678999999ewsks...", image: WalletFace },
    { address: "tyuik678999999ewsks...", image: WalletFace },
    { address: "tyuik678999999ewsks...", image: WalletFace },
    { address: "tyuik678999999ewsks...", image: WalletFace },
    { address: "tyuik678999999ewsks...", image: WalletFace },
    { address: "tyuik678999999ewsks...", image: WalletFace },
]

const WalletList = (props) => {

    const { onClick } = props

    return (
        <Card sx={cardStyle}>
            <Typography id="modal-modal-title" variant="p" sx={{pl: 2}}>
              WALLETS <span style={{float: "right"}}><HighlightOffIcon onClick={onClick}/></span>
            </Typography>
            <CardContent>
                <Box>
                    <Scrollbar style={{height: 300}}>
                        {data.map((d, index) => (
                            <WalletDetails key={index} address={d.address} image={d.image} />
                        ))}
                    </Scrollbar> 
                </Box>
            </CardContent>
            <CardActions>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Button sx={{width: "100%"}} onClick={onClick} className="button button-primary button-wide-mobile" wide>CREATE WALLET</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Button sx={{width: "100%"}} className="button button-primary button-wide-mobile" wide>IMPORT WALLET</Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default WalletList