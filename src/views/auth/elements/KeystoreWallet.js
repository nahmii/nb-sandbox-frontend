import React, { useState } from 'react';
import { Stepper, Card, Box, Typography, Step, StepButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SelectFile from '../components/SelectFile';
import EnterPassword from '../components/EnterPassword';

const steps = [1, 2]

const KeystoreWallet = (props) => {
    const { onClose, } = props
    const [activeStep, setActiveStep] = useState(0)
    const [completed, setCompleted] = useState({})

    const totalSteps = () => {
        return steps.length
    }

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps()
    }

    const completedSteps = () => {
        return Object.keys(completed).length
    }

    const handleStep = (step) => () => {
        setActiveStep(step)
    }

    return (
        <Card className=''>
                <Box sx={{ mt: 2, p: 2, borderBottom: "1px solid #CBE5EE"}}>
                    <Typography id='modal-modal-title' variant='p' sx={{ pl: 2, fomtSize: "12px" }}>
                        ACCESS WALLET WITH KEYSTORE FILE <span style={{ float: 'right' }}><HighlightOffIcon onClick={onClose} /></span>
                    </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color='#0078A0' onClick={handleStep(index)}>
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
                                                return <SelectFile />
                                            case 1:
                                                return <EnterPassword />
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