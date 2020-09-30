import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MobileStepper
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const tutorialSteps = [
  '/tutorial1.jpg', '/tutorial2.jpg',
  '/tutorial3.jpg', '/tutorial4.jpg',
  '/tutorial5.jpg', '/tutorial6.jpg',
  '/tutorial7.jpg', '/tutorial8.jpg'
];

const useStyles = makeStyles((theme) => ({
  root: {
    width : '100%',
    maxWidth: '32vw',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    maxWidth: '32vw',
    display: 'block',
    width: '100%',
  },
}));

export default function Tutorial(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Dialog open={props.open} 
      onClose={props.handleClose} 
      aria-labelledby="form-dialog-title" 
      maxWidth='md'>
        <DialogTitle style={{textAlign:"center"}}>How To Use Timelog</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <img
              className={classes.img}
              alt="tutorialStep"
              src={tutorialSteps[activeStep]}
            />
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="dots"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}