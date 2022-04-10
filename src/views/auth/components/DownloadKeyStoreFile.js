import React from 'react'
import { Box, CardContent, Grid, Typography } from '@mui/material'
import Button from '../../../components/elements/Button'


const DownloadKeyStoreFile = () => {
    return (
        <CardContent>
            <Typography id='modal-modal-title' variant='p' sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                DOWNLOAD KEYSTORE FILE</Typography><br />
            <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>
                Things to know before downloading your keystore file:</Typography>
            <Box>
                <ul>
                    <li>Don't lose it</li>
                </ul>
                <p style={{ marginTop: '-30px', fontSize: '12px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <ul>
                    <li>Don't share it</li>
                </ul>
                <p style={{ marginTop: '-30px', fontSize: '12px' }}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
                <ul>
                    <li>Make a backup</li>
                </ul>
                <p style={{ marginTop: '-30px', fontSize: '12px' }}>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur</p>
            </Box>
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={5} sm={5} md={5}>
                        <Button sx={{ width: '100%' }} className='button-wallet' wide>BACK</Button>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7}>
                        <Button sx={{ width: '100%' }} className='button button-primary button-wide-mobile' wide>DOWNLOAD</Button>
                    </Grid>
                </Grid>
            </Box>
        </CardContent>
    )
}

export default DownloadKeyStoreFile