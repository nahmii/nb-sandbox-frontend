import React, { useState } from 'react'
import { Card, CardContent, Box, Typography, Stack, Grid } from '@mui/material'
import Image from '../../../components/elements/Image'
import SelectWalletModal from '../elements/SelectWalletModal'
import { useGlobalState } from '../../../state'
import { shortenAddress } from '../../../utils/address'
import { ContentCopyOutlined } from '@mui/icons-material'

const cardStyle = {
    boxShadow: 0, 
    borderRadius: 0,
}

const Wallet = () => {
    // handle modal
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    
    const [account] = useGlobalState('account')
    const [balance] = useGlobalState('balance')

    {/* TODO: Give UI feedback when account is copied */}
    const copyAddress = () => {
        navigator.clipboard.writeText(account)
    }

    return (
        <Card sx={cardStyle}>
            { open ? (
                <SelectWalletModal open={open} onClose={handleClose} />
            ) : null }
            <CardContent>
                <Grid container spacing={2} sx={{mb: -1}}>
                    <Grid item xs={12} sm={7} md={7}>
                        <Stack direction='row' spacing={2}>
                            <Image className='wallet-image' src={`https://avatars.dicebear.com/api/jdenticon/${account}.svg?r=50`} style={{marginTop: '10px'}} />
                            <Box>
                                <Typography variant='p' color='text.secondary' sx={{ fontSize: 12 }}>
                                    WALLET
                                </Typography>
                                <Stack direction='row' spacing={1}>
                                    <Typography sx={{cursor: "pointer"}} className='card-text' variant='h6' onClick={handleOpen}>
                                        {account === '' ? 'Connect wallet' : `${shortenAddress(account)}` }
                                    </Typography>
                                    {account === '' ? '' : <ContentCopyOutlined sx={{cursor: "pointer"}} onClick={copyAddress}></ContentCopyOutlined>}
                                </Stack>
                            </Box>
                        </Stack>   
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                        <Typography variant='p' color='text.secondary' sx={{ fontSize: 12 }}>
                            BALANCE
                        </Typography>
                        <Typography className='card-text' variant='h6'>
                            {balance} NOK
                        </Typography>
                    </Grid>
                </Grid>            
            </CardContent>
        </Card>
    )
}

export default Wallet