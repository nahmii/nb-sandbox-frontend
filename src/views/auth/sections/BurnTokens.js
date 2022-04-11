import React, { useState } from 'react'
import { Card, Box, CardContent, Typography, TextField, InputAdornment, CircularProgress, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import Button from '../../../components/elements/Button'
import { burnTokens, getContractOwner } from '../../../hooks/useContract'
import { parseUnits } from 'ethers/lib/utils'
import { limitDecimalPlaces } from '../../../utils/format'
import { updateBalance, updateTotalSupply, useGlobalState } from '../../../state'

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

const BurnTokens = () => {
    //Snackbar alert parameter
    const [open, setOpen] = useState(false)

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    const [account] = useGlobalState('account')
    const [amountToBurn, setAmountToBurn] = useState('0.0000')
    const [msg, setMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    const [burnBtnText, setBurnBtnText] = useState('BURN TOKENS')

    const handleClick = async () => {
        try {
            const owner = await getContractOwner()
            if (amountToBurn < 1) {
                setOpen(true)
                setError(true)
                setMsg('Cannot burn 0 tokens.')
            } else if (owner.toLowerCase() !== account.toLowerCase()) {
                setOpen(true)
                setError(true)
                setMsg('Only the contract owner can burn tokens.')
            } else {
                setLoading(true)
                setDisableBtn(true)
                setBurnBtnText('BURNING TOKENS')

                const transactionResponse = await burnTokens(parseUnits(amountToBurn, 4))
                await transactionResponse.wait()

                setOpen(true)
                setSuccess(true)
                setMsg(`Burned ${amountToBurn} tokens successfully!`)
                updateBalance()
                updateTotalSupply()
                setLoading(false)
                setAmountToBurn("0.0000")
                setDisableBtn(false)
                setBurnBtnText('BURN TOKENS')
            }
        } catch (e) {
            console.error(e)
            setDisableBtn(false)
            setBurnBtnText('BURN TOKENS')
            setLoading(false)
        }
    }

    const handleChange = (event) => {
        setAmountToBurn(event.target.value)
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
                    BURN TOKENS
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
                        value={amountToBurn}
                        onChange={handleChange}
                        onInput={handleInput}
                        InputProps={{
                            type: 'number',
                            endAdornment: <InputAdornment position='end'>NOK</InputAdornment>,
                            style: inputProps
                        }}
                    />
                </Box>
                <Button disabled={disableBtn} style={{ color: 'white' }} className='button button-primary button-wide-mobile' wide onClick={handleClick}>{burnBtnText} {loading && <CircularProgress sx={{ color: 'white', padding: '5px', marginBottom: '5px' }} />}</Button>
            </CardContent>
        </Card>
    )
}

export default BurnTokens