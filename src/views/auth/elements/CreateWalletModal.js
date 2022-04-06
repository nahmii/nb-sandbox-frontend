import React, { useState } from 'react';
import { Box, Typography, Modal, Step, Stepper, StepButton, Card, CardActions, Backdrop } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import WalletList from '../sections/WalletList';
import Button from '../../../components/elements/Button';

import CreateWalletForm from '../components/CreateWalletForm';
import DownloadKeyStoreFile from '../components/DownloadKeyStoreFile';
import CreateMnemonic from '../components/CreateMnemonic'
import MnemonicVerifiication from '../components/MnemonicVerification';

const style = {
  bgcolor: 'background.paper',
  p: 2
};

const steps = ['Create Account', 'Select Fund', 'Fill Paperwork', 'Submit Application'];

export default function CreateWalletModal(props) {

  const { onClose, open } = props
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div>
      <Box className="modal-box" sx={style}>
        <Typography id="modal-modal-title" variant="p" sx={{pl: 2}}>
          CREATE WALLET <span style={{float: "right"}}><HighlightOffIcon onClick={onClose}/></span>
        </Typography>
            <Box sx={{ width: '100%', mt: 3 }}>
                  <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                      {steps.map((label, index) => (
                      <Step key={label} completed={completed[index]}>
                          <StepButton color="#0078A0" onClick={handleStep(index)}>
                          {/* {label} */}
                          </StepButton>
                      </Step>
                      ))}
                  </Stepper>
                  <div>
                      {allStepsCompleted() ? (
                          <React.Fragment>
                              <Typography sx={{ mt: 2, mb: 1 }}>
                              All steps completed - you&apos;re finished
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                              <Box sx={{ flex: '1 1 auto' }} />
                                  <Button onClick={handleReset}>Reset</Button>
                              </Box>
                          </React.Fragment>
                          ) : (
                          <React.Fragment>
                              <Typography variant="p" color="text.secondary" sx={{ mt: 2, pl: 2, fontSize: "12px" }}>Step {activeStep + 1}</Typography>
                              <Box>
                                {/* <Card sx={{ minWidth: 275, p: 3, mb: 5 }}> */}

                                  {(() => {
                                    switch(activeStep) {
                                      case 0:
                                        return <CreateWalletForm/>
                                      case 1:
                                        return <DownloadKeyStoreFile/>
                                      case 2:
                                        return <CreateMnemonic/>
                                      case 3:
                                        return <MnemonicVerifiication/>
                                    }
                                  })()}

                                  
                                {/* </Card> */}
                              </Box>
                              
                          </React.Fragment>
                      )}
                  </div>
              </Box>
      </Box>
    </div>
  );
}
