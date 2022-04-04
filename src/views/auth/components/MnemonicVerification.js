import React from 'react';
import { Box, CardContent, Grid, Typography, Stack, Chip, TextField } from '@mui/material'
import Button from '../../../components/elements/Button';

const MnemonicVerifiication = () => {
    return (
        <CardContent>
            <Typography id="modal-modal-title" variant="p" sx={{fontWeight: "bold", fontSize: "14px"}}>
              MNEMONIC PHARSE VERIFICATION</Typography><br/>
              <Typography variant="p" sx={{fontWeight: "bold", fontSize: "12px"}}>
              Please select the correct based on their numbers:</Typography>
              <Box>
                    <Stack spacing={3} direction="row">
                        <Chip label="1. tomato"/>
                        <Chip label="2. tomato"/>
                        <Chip label="3. tomato"/>
                        <Chip label="4. tomato"/>
                    </Stack>
                    <Stack spacing={3} sx={{mt: 1}} direction="row">
                        <Chip label="5. tomato"/>
                        <Chip label="6. tomato"/>
                        <Chip label="7. tomato"/>
                        <Chip label="8. tomato"/>
                    </Stack>
                    <Stack spacing={3} sx={{mt: 1}} direction="row">
                        <Chip label="9. tomato"/>
                        <Chip label="10. tomato"/>
                        <Chip label="11. tomato"/>
                        <Chip label="12. tomato"/>
                    </Stack>
              </Box>
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={5} sm={5} md={5}>
                            <Button sx={{width: "100%"}} className="button-wallet" wide>BACK</Button>
                        </Grid>
                        <Grid item xs={7} sm={7} md={7}>
                            <Button sx={{width: "100%"}} className="button button-primary button-wide-mobile" wide>VERIFY</Button>
                        </Grid>
                    </Grid>
                </Box>
        </CardContent>
    )
}

export default MnemonicVerifiication