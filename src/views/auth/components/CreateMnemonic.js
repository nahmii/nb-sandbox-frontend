import React from 'react'
import { Box, CardContent, Grid, Typography, TextField } from '@mui/material'
import Button from '../../../components/elements/Button'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ReplayIcon from '@mui/icons-material/Replay'

const inputProps = {
    backgroundColor: '#F2F8FA',
    border: '0px',
    height: '30px',
    ariaLabel: 'weight',
}

const phrases = ['Tomato', 'Beef', 'Cricket', 'Lavish', 'Sense', 'Booze', 'Delight', 'Commit', 'Push', 'Border', 'Height', 'George']

const CreateMnemonic = () => {
    return (
        <CardContent>
            <Typography id='modal-modal-title' variant='p' sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                CREATE MNEMONICS PHARSE</Typography><br />
            <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>
                Write down these words:</Typography>
            <Box>
                <Typography id='modal-modal-title' variant='p' sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                    12 words<span style={{ position: 'absolute' }}><KeyboardArrowDownIcon /></span>
                    <span style={{ float: 'right' }}><span style={{ position: 'absolute', marginLeft: '-30px' }}><ReplayIcon /></span>Update</span></Typography>
            </Box>
            <Box>
                <Grid spacing={1} container>
                    {phrases.map((phrase, index) => (
                        <Grid item xs={6} md={3} sm={3}>
                            <Box key={index} className='chip'>
                                <Typography sx={{ fontSize: '14px' }} variant='p'>{`${index + 1}. ${phrase}`}</Typography>
                            </Box>
                        </Grid>

                    ))}

                </Grid>
            </Box>
            <Box>
                <Box
                    component='form'
                    sx={{
                        '& .MuiTextField-root': { width: '100%', mb: 2 },
                    }}
                    noValidate
                    autoComplete='off'
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                >
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>Add extra word (Optional)</Typography>
                    <TextField
                        required
                        id='outlined-size-small'
                        label='Extra word'
                        variant='outlined'
                        size='small'
                        inputProps={{ style: inputProps }}
                        InputLabelProps={{ style: { fontSize: '14px' } }}
                    />
                </Box>
            </Box>
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={5} sm={5} md={5}>
                        <Button sx={{ width: '100%' }} className='button-wallet' wide>BACK</Button>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7}>
                        <Button sx={{ width: '100%' }} className='button button-primary button-wide-mobile' wide>DONE</Button>
                    </Grid>
                </Grid>
            </Box>
        </CardContent>
    )
}

export default CreateMnemonic