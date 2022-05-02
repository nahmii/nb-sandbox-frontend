import React, { useState } from 'react'
import { Stepper, Card, Box, Typography, Step, StepButton } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SelectFile from '../components/SelectFile'
import EnterPassword from '../components/EnterPassword'
import { ethers } from 'ethers'
import { setGlobalState, useGlobalState } from '../../../state'
import { appendItemByAddress, retrieveItem } from '../../../utils/localStorage'
import { isAddress } from '../../../utils/address'

const steps = [1, 2]

const KeystoreWallet = (props) => {
    const { onClose, open, onBack } = props
    const [provider] = useGlobalState('provider')
    const [activeStep, setActiveStep] = useState(0)
    const [completed, setCompleted] = useState({})
    const [isFileError, setFileError] = useState(false)
    const [isPasswordWrong, setIsPasswordWrong] = useState(false)
    const [encryptedWallet, setEncryptedWallet] = useState(null)

    const totalSteps = () => {
        return steps.length
    }

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps()
    }

    const completedSteps = () => {
        return Object.keys(completed).length
    }

    const onReceiveFile = (text) => {
        try {
            const _parsedFile = JSON.parse(text)
            if (!_parsedFile.address) {
                throw new Error('Address field missing')
            }

            const _address = isAddress(_parsedFile.address)
            if (!_address) {
                throw new Error('Invalid address')
            }  else {
                _parsedFile.address = _address
                setEncryptedWallet(text)
                setActiveStep(1)
                appendItemByAddress('wallets', _address, _parsedFile)
                setGlobalState('wallets', retrieveItem('wallets'))
            }
        } catch (error) {
            if (error.message.includes('Unexpected token')) {
                // It's reasonable to assume it isn't a properly formatted JSON file or a JSON file.
                setFileError(true)
            } else if (error.message.includes('Address field missing')) {
                setFileError(true)
            }
        }
    }

    const onDecryptWallet = async (password) => {
        try {
            let unlockedWallet = await ethers.Wallet.fromEncryptedJson(encryptedWallet, password)
            unlockedWallet = unlockedWallet.connect(provider)
            setGlobalState('account', await unlockedWallet.getAddress())
            setGlobalState('signer', unlockedWallet)
            onClose()
        } catch (error) {
            setIsPasswordWrong(true)
        }
    }

    return (
        <Card className=''>
            <Box sx={{ mt: 2, p: 2, borderBottom: '1px solid #CBE5EE' }}>
                <Typography id='modal-modal-title' variant='p' sx={{ pl: 2, fomtSize: '12px' }}>
                    ACCESS WALLET WITH KEYSTORE FILE <span style={{ float: 'right' }}><HighlightOffIcon onClick={onClose} /></span>
                </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color='#0078A0'>
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{}}>
                    {allStepsCompleted() ? (
                        <React.Fragment>
                            <p>All finished</p>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Typography variant='p' color='text.secondary' sx={{ mt: 2, pl: 3, fontSize: '12px' }}>Step {activeStep + 1}</Typography>
                            <Box>
                                {(() => {
                                    switch (activeStep) {
                                        case 0:
                                            return <SelectFile onReceiveFile={onReceiveFile} onBack={onBack} error={isFileError} setError={setFileError} />
                                        case 1:
                                            return <EnterPassword onDecryptWallet={onDecryptWallet} error={isPasswordWrong} setError={setIsPasswordWrong} onBack={onBack} />
                                        default:
                                            return null
                                    }
                                })()}
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </Box>
        </Card>
    )
}

export default KeystoreWallet