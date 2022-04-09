import React from 'react';
import { Box, CardContent, Grid, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import Button from '../../../components/elements/Button';

const phrases = ["Tomato", "Beef", "Cricket"]

const MnemonicVerifiication = () => {
    return (
        <CardContent>
            <Typography id="modal-modal-title" variant="p" sx={{fontWeight: "bold", fontSize: "14px"}}>
              MNEMONIC PHARSE VERIFICATION</Typography><br/>
              <Typography variant="p" sx={{fontWeight: "bold", fontSize: "12px"}}>
              Please select the correct based on their numbers:</Typography>
                <Box sx={{mt: 2, mb: 2}}>
                    <Grid container spacing={2}>
                        <Grid item xs={1} md={1} sm={1}>
                            <Typography sx={{mt: 1}} variant="p">2.</Typography>
                        </Grid>
                        <Grid item xs={11} md={11} sm={11}>
                            <Grid container spacing={1}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    { phrases.map((phrase, index) => (
                                        
                                        // <Grid key={index} item xs={4} sm={4} md={4}>
                                            <FormControlLabel value={phrase} size="small" control={<Radio />} label={phrase} />
                                        // </Grid>
                                    )) }
                                </RadioGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={1} md={1} sm={1}>
                            <Typography sx={{mt: 1}} variant="p">4.</Typography>
                        </Grid>
                        <Grid item xs={11} md={11} sm={11}>
                            <Grid container spacing={1}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    { phrases.map((phrase, index) => (
                                        
                                        // <Grid key={index} item xs={4} sm={4} md={4}>
                                            <FormControlLabel value={phrase} size="small" control={<Radio />} label={phrase} />
                                        // </Grid>
                                    )) }
                                </RadioGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={1} md={1} sm={1}>
                            <Typography sx={{mt: 1}} variant="p">8.</Typography>
                        </Grid>
                        <Grid item xs={11} md={11} sm={11}>
                            <Grid container spacing={1}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    { phrases.map((phrase, index) => (
                                        
                                        // <Grid key={index} item xs={4} sm={4} md={4}>
                                            <FormControlLabel value={phrase} size="small" control={<Radio />} label={phrase} />
                                        // </Grid>
                                    )) }
                                </RadioGroup>
                            </Grid>
                        </Grid>
                    </Grid>
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