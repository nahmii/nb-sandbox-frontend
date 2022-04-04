import React from 'react'
import { Box, CardContent, Grid, Typography, Stack, Chip, TextField } from '@mui/material'
import Button from '../../../components/elements/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ReplayIcon from '@mui/icons-material/Replay';

const inputProps = {
    backgroundColor: "#F2F8FA", 
    border: "0px", 
    height: "30px",
    ariaLabel: 'weight',
}

const CreateMnemonic = () => {
    return (
        <CardContent>
            <Typography id="modal-modal-title" variant="p" sx={{fontWeight: "bold", fontSize: "14px"}}>
              CREATE MNEMONICS PHARSE</Typography><br/>
              <Typography variant="p" sx={{fontWeight: "bold", fontSize: "12px"}}>
              Write down these words:</Typography>
                <Box>
                    <Typography id="modal-modal-title" variant="p" sx={{fontWeight: "bold", fontSize: "14px"}}>
                        12 words<span style={{position: "absolute"}}><KeyboardArrowDownIcon /></span> 
                        <span style={{float: "right"}}><span style={{position: "absolute", marginLeft: "-30px"}}><ReplayIcon/></span>Update</span></Typography>
              </Box>
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
                <Box
                        component="form"
                        sx={{
                        '& .MuiTextField-root': { width: '100%', mb: 2 },
                        }}
                        noValidate
                        autoComplete="off"
                        style={{marginTop: "20px", marginBottom: "20px"}}
                    >
                        <Typography variant="p" sx={{fontWeight: "bold", fontSize: "12px"}}>Add extra word</Typography>
                        <TextField
                        required
                        id="outlined-size-small"
                        label="Extra word"
                        variant="outlined"
                        size="small"
                        inputProps={{ style: inputProps }}
                        InputLabelProps={{ style: { fontSize: "14px" } }}
                    />
                </Box>
              </Box>
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={5} sm={5} md={5}>
                            <Button sx={{width: "100%"}} className="button-wallet" wide>BACK</Button>
                        </Grid>
                        <Grid item xs={7} sm={7} md={7}>
                            <Button sx={{width: "100%"}} className="button button-primary button-wide-mobile" wide>DONE</Button>
                        </Grid>
                    </Grid>
                </Box>
        </CardContent>
    )
}

export default CreateMnemonic