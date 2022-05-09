import React, { useState } from 'react'
import { Card, Box, CardContent, Typography, TextField, InputAdornment, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import Button from '../../../components/elements/Button'
import { hasRole, mintTokens } from '../../../hooks/useContract'
import { parseUnits } from 'ethers/lib/utils'
import { limitDecimalPlaces } from '../../../utils/format'
import { setGlobalState, updateBalance, updateTotalSupply, useGlobalState } from '../../../state'
import { MINTER_ROLE } from '../../../constants'

const cardStyle = {
    boxShadow: 0,
    borderRadius: 0,
}

const inputProps = {
    backgroundColor: '#F2F8FA',
    border: '0px',
    height: '50px',
    ariaLabel: 'weight',
}

const MintTokens = () => {
    //Snackbar alert parameter
    const [open, setOpen] = useState(false)

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const [account] = useGlobalState('account')
    const [provider] = useGlobalState('provider')
    const [signer] = useGlobalState('signer')
    const [amountToMint, setAmountToMint] = useState('0.0000')
    const [msg, setMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [, setError] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    const [mintBtnText, setMintBtnText] = useState('MINT TOKENS')

    const handleClick = async () => {
        try {
            setSuccess(false)
            setOpen(false)
            setError(false)
            if (signer == null) {
                setOpen(true)
                setError(true)
                setMsg('Please connect a wallet.')
                return
            }

            const isMinter = await hasRole(account, MINTER_ROLE, provider)
            if (!isMinter) {
                setOpen(true)
                setError(true)
                setMsg('Only wallets with the minter role can mint tokens.')
            } else if (amountToMint > 0) {
                setGlobalState('loading', true)
                setDisableBtn(true)
                setMintBtnText('MINTING TOKENS')

                const transactionResponse = await mintTokens(account, parseUnits(amountToMint, 4), signer)
                await transactionResponse.wait()

                setOpen(true)
                setSuccess(true)
                setMsg(`Mint ${amountToMint} tokens successfully!`)
                updateBalance(account, provider)
                updateTotalSupply(provider)
                setGlobalState('loading', false)
                setAmountToMint("0.0000")
                setDisableBtn(false)
                setMintBtnText('MINT TOKENS')
            } else {
                setOpen(true)
                setError(true)
                setMsg('Cannot mint 0 tokens.')
            }
        } catch (e) {
            console.error(e)
            setDisableBtn(false)
            setMintBtnText('MINT TOKENS')
            setGlobalState('loading', false)
        }
    }

    const handleChange = (event) => {
        setAmountToMint(event.target.value)
    }

    const handleInput = (event) => {
        limitDecimalPlaces(event, 4)
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
    })

    return (
        <Card sx={cardStyle}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={success ? 'success' : 'error'}
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
            <CardContent>
                <Typography variant='h6' color='text.secondary' sx={{ fontSize: 18, color: '#153443' }}>
                    MINT TOKENS
                </Typography>

                <Box
                    component='form'
                    sx={{
                        '& .MuiTextField-root': { width: '100%' },
                    }}
                    noValidate
                    autoComplete='off'
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                >
                    <TextField
                        label='Amount'
                        id='outlined-start-adornment'
                        sx={{ width: '100%' }}
                        value={amountToMint}
                        onChange={handleChange}
                        onInput={handleInput}
                        InputProps={{
                            type: 'number',
                            endAdornment: <InputAdornment position='end'>NOK</InputAdornment>,
                            style: inputProps
                        }}
                    />
                </Box>
                <Button disabled={disableBtn} style={{ color: 'white' }} className='button button-primary button-wide-mobile' wide onClick={handleClick}>{mintBtnText}</Button>
            </CardContent>
        </Card>
    )
}

export default MintTokens