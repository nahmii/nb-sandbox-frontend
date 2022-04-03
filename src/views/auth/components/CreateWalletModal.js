import React, { useState } from 'react';
import { Box, Card, CardActions, Typography, Modal, Step, Stepper, StepButton, Backdrop } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WalletList from '../sections/WalletList';
import Button from '../../../components/elements/Button';

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
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
          <Box className="modal-box" sx={style}>
            <Typography id="modal-modal-title" variant="p" sx={{pl: 2}}>
              CREATE WALLET <span style={{float: "right"}}><HighlightOffIcon onClick={onClose}/></span>
            </Typography>
                <Box sx={{ width: '100%' }}>
                      <Stepper nonLinear activeStep={activeStep} sx={{mt: 2}} alternativeLabel>
                          {steps.map((label, index) => (
                          <Step key={label} completed={completed[index]}>
                              <StepButton color="inherit" onClick={handleStep(index)}>
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
                                  <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                                  
                                  <Box sx={{mt: 3}}>
                                    <Card sx={{ minWidth: 275, p: 3, mb: 5 }}>
                                      <CardActions>
                                        <Button variant="contained" size="small">Next</Button>
                                      </CardActions>
                                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button className="button button-sm"
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                            <Button className="button button-primary button-sm" onClick={handleNext} sx={{ mr: 1 }}>
                                                Next Step
                                            </Button>
                                            {activeStep !== steps.length &&
                                                (completed[activeStep] ? (
                                                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                    Step {activeStep + 1} already completed
                                                </Typography>
                                                ) : ( <div></div>
                                                // <Button style={{marginLeft: "10px"}} className="button button-sm" onClick={handleComplete}>
                                                //     {completedSteps() === totalSteps() - 1
                                                //     ? 'Finish'
                                                //     : 'Complete Step'}
                                                // </Button>
                                            ))}
                                      </Box>
                                    </Card>
                                  </Box>
                                  
                              </React.Fragment>
                          )}
                      </div>
                  </Box>
            <WalletList/>
          </Box>
      </Modal>
    </div>
  );
}
