import React from 'react'
import { Card, CardContent, CardActions, Typography, Grid, Box, TextField } from '@mui/material'
import Button from '../../../components/elements/Button'

const inputProps = {
    backgroundColor: '#F2F8FA',
    border: '0px',
    height: '30px',
    ariaLabel: 'weight',
}

const EnterPassword = () => {
    return (
        <Box>
            <CardContent sx={{}}>
                <Typography id='modal-modal-title' variant='p' sx={{ fontWeight: 'bold', fontSize: '15px', color: "#153443" }}>
                    ENTER PASSWORD</Typography><br />
                <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '13px', color: "#153443" }}>
                    Enter password to unlock your wallet</Typography>
                    <Box
                    component='form'
                    sx={{
                        '& .MuiTextField-root': { width: '100%'},
                    }}
                    noValidate
                    autoComplete='off'
                    style={{ marginTop: '20px' }}
                >
                    <TextField
                        required
                        id='outlined-size-small'
                        placeholder="Enter keystore password"
                        variant='outlined'
                        size='small'
                        inputProps={{ style: inputProps }}
                        InputLabelProps={{ style: { fontSize: '14px' } }}
                    />
                </Box>
            </CardContent>
            <CardActions sx={{p: 2}}>
                <Grid container spacing={3}>
                    <Grid item xs={4} sm={4} md={4}>
                        <Button sx={{ width: '100%' }} className='keystore-button' wide>BACK</Button>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                        <Button sx={{ width: '100%' }} className='button button-primary button-wide-mobile' wide>ACCESS WALLET</Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Box>
    )
}

export default EnterPassword