import React, { useState } from 'react'
import { CardContent, CardActions, Typography, Grid, Box, InputLabel, FormHelperText, OutlinedInput, FormControl, TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '../../../components/elements/Button'

const inputProps = {
    backgroundColor: '#F2F8FA',
    border: '0px',
    height: '30px',
    ariaLabel: 'weight',
}

const EnterPassword = (props) => {
    const { onDecryptWallet, error, setError, onBack } = props

    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const [btnText, setBtnText] = useState("ACCESS WALLET")
    const [isLoading, setIsLoading] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const updatePassword = (event) => {
        setPassword(event.target.value)
        setError(false)
    }

    const passPassword = () => {
        if(password === "") {
            setError(true)
        }
        setIsLoading(true)
        setBtnText("ACCESSING WALLET...")
        onDecryptWallet(password)
        setIsLoading(false)
    }

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

                    <FormControl sx={{ width: '100%' }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={updatePassword}
                            placeholder="Enter keystore password"
                            size='small'
                            error={error}
                            inputProps={{ style: inputProps }}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        <FormHelperText id="component-error-text">{error ? 'Wrong password.' : ''}</FormHelperText>
                    </FormControl>
                </Box>
            </CardContent>
            <CardActions sx={{p: 2}}>
                <Grid container spacing={3}>
                    <Grid item xs={4} sm={4} md={4}>
                        <Button sx={{ width: '100%' }} className='keystore-button' wide onClick={onBack}>BACK</Button>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                        <Button sx={{ width: '100%' }} disabled={isLoading} className='button button-primary button-wide-mobile' wide onClick={passPassword}>
                          {btnText} {isLoading && <CircularProgress sx={{ color: 'white', padding: '5px', marginBottom: '5px' }} />}
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Box>
    )
}

export default EnterPassword