import React, { useState } from 'react'
import { Box, Typography, Modal, CardActions, Backdrop, Card, CardContent, FormHelperText, OutlinedInput, FormControl, InputAdornment, IconButton, CircularProgress } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '../../../components/elements/Button'
import { setGlobalState, useGlobalState } from '../../../state'
import { ethers } from 'ethers'
import { retrieveItem } from '../../../utils/localStorage'

const inputProps = {
    backgroundColor: '#F2F8FA',
    border: '0px',
    height: '30px',
    ariaLabel: 'weight',
}

const PasswordPrompt = (props) => {
    const { address, name, onClose, open } = props

    const [provider] = useGlobalState('provider')

    const [error, setError] = useState(false)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [btnText, setBtnText] = useState('UNLOCK WALLET')
    const [isLoading, setIsLoading] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            await onDecryptWallet()
            event.preventDefault()
        }
    }

    const updatePassword = (event) => {
        setPassword(event.target.value)
        setError(false)
    }

    const onDecryptWallet = async () => {
        if (password === '') {
            setError(true)
        }
        setIsLoading(true)
        setBtnText('UNLOCKING WALLET...')
        const encryptedWallet = retrieveItem('wallets').find(w => w.address === address)
        try {
            let unlockedWallet = await ethers.Wallet.fromEncryptedJson(JSON.stringify(encryptedWallet), password)
            unlockedWallet = unlockedWallet.connect(provider)
            setGlobalState('account', await unlockedWallet.getAddress())
            setGlobalState('signer', unlockedWallet)
            onClose()
            setIsLoading(false)
        } catch (error) {
            setError(true)
            setIsLoading(false)
            setBtnText('UNLOCK WALLET')
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Box className='modal-box'>
                <Card>
                    <Box sx={{ mt: 2, p: 2, borderBottom: '1px solid #CBE5EE' }}>
                        <Typography id='modal-modal-title' variant='p' sx={{ pl: 2 }}>
                            UNLOCK WALLET<span style={{ float: 'right', cursor: 'pointer' }}><HighlightOffIcon onClick={onClose} /></span>
                        </Typography>
                    </Box>

                    <CardContent sx={{}}>
                        <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '13px', color: '#153443' }}>
                            Enter password to unlock your wallet</Typography>
                        <Box
                            component='form'
                            sx={{
                                '& .MuiTextField-root': { width: '100%' },
                            }}
                            noValidate
                            autoComplete='off'
                            style={{ marginTop: '20px', marginBottom: '20px' }}
                        >
                            <FormControl sx={{ width: '100%' }} variant='outlined'>
                                <OutlinedInput
                                    autoFocus
                                    id='outlined-adornment-password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={updatePassword}
                                    onKeyDown={handleKeyPress}
                                    placeholder='Enter keystore password'
                                    size='small'
                                    error={error}
                                    inputProps={{ style: inputProps }}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowPassword}
                                                edge='end'
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <FormHelperText id='component-error-text'>{error ? 'Wrong password.' : ''}</FormHelperText>
                            </FormControl>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2 }}>
                        <Button sx={{ width: '100%' }} onClick={onDecryptWallet} className='button button-primary button-wide-mobile' wide>
                            {btnText} {isLoading && <CircularProgress sx={{ color: 'white', padding: '5px', marginBottom: '5px' }} />}
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Modal>
    )
}

export default PasswordPrompt