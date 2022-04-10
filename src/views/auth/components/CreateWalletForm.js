import React from 'react'
import { CardContent, Box, Typography, TextField, Grid } from '@mui/material'
import Button from '../../../components/elements/Button'

const inputProps = {
    backgroundColor: '#F2F8FA',
    border: '0px',
    height: '30px',
    ariaLabel: 'weight',
}

const CreateWalletForm = () => {
    return (
        <CardContent>
            <Typography id='modal-modal-title' variant='p' sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                CREATE WALLET WITH KEYSTORE FILE</Typography><br />
            <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>
                Create Password</Typography>
            <Box
                component='form'
                sx={{
                    '& .MuiTextField-root': { width: '100%', mb: 2 },
                }}
                noValidate
                autoComplete='off'
                style={{ marginTop: '20px', marginBottom: '20px' }}
            >
                <TextField
                    required
                    id='outlined-size-small'
                    label='Username'
                    variant='outlined'
                    size='small'
                    inputProps={{ style: inputProps }}
                    InputLabelProps={{ style: { fontSize: '14px' } }}
                />

                <TextField
                    required
                    id='outlined-size-small'
                    label='Password'
                    variant='outlined'
                    size='small'
                    inputProps={{ style: inputProps }}
                    InputLabelProps={{ style: { fontSize: '14px' } }}
                />
            </Box>
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={5} sm={5} md={5}>
                        <Button sx={{ width: '100%' }} className='button-wallet' wide>CANCEL</Button>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7}>
                        <Button sx={{ width: '100%' }} className='button button-primary button-wide-mobile' wide>CREATE WALLET</Button>
                    </Grid>
                </Grid>
            </Box>
        </CardContent>
    )
}

export default CreateWalletForm